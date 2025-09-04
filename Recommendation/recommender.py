from sqlalchemy import text
from flask import Flask, request, jsonify
import pandas as pd
import os
os.environ["TRANSFORMERS_NO_TF"] = "1"
from sqlalchemy import create_engine
from sentence_transformers import SentenceTransformer, util
from sklearn.metrics.pairwise import cosine_similarity
from datetime import datetime

import requests
import torch


import time
import numpy as np
from functools import lru_cache

app = Flask(__name__)


DB_TYPE = "mysql+pymysql"
DB_USER = os.environ.get("USER")
DB_PASS = os.environ.get("PASSWORD")
DB_HOST = os.environ.get("HOST")
DB_PORT = "3306"
DB_NAME = os.environ.get("DATABASE")

# print(f"DB_USER: {DB_USER}, DB_PASS: {DB_PASS}, DB_HOST: {DB_HOST}, DB_NAME: {DB_NAME}")

engine = create_engine(f"{DB_TYPE}://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}")


GOOGLE_MAPS_API_KEY = os.environ.get("GOOGLE_MAPS_API_KEY")

# Load model 
model = SentenceTransformer('paraphrase-MiniLM-L6-v2')
df_cache = None
last_reload_time = 0
cache_timeout = 60

@lru_cache(maxsize=100)
async def geocode_destination(destination:str):
    destination = destination.strip().lower()
    # print(f"[GEOCODE] Looking up: {destination}")
    # print(f"[API_KEY] {GOOGLE_MAPS_API_KEY is not None}")
    url = f"https://maps.googleapis.com/maps/api/geocode/json?address={destination}&key={GOOGLE_MAPS_API_KEY}"
    try:
        response = requests.get(url)
        if response.status_code != 200:
            return None
        data = response.json()
        if not data.get("results"):
            return None
        location = data["results"][0]["geometry"]["location"]
        return location["lat"], location["lng"]
    except Exception as e:
        print(f"[GEOCODE ERROR] {e}")
        return None


#  LOAD PROPERTIES 
def load_data():
    try:
        with engine.connect() as conn:
            df = pd.read_sql(text("SELECT * FROM properties"), conn)
            # print("Data from properties table:", df.head())
            df.fillna("", inplace=True)
            return df
    except Exception as e:
        print(f"[DB ERROR] {e}")
        return pd.DataFrame([])
    
def get_cached_data():
    global df_cache, last_reload_time
    current_time = time.time()
    if df_cache is None or (current_time - last_reload_time) > cache_timeout:
        df_cache = load_data()
        last_reload_time = current_time
    return df_cache

def make_json_safe(obj):
    if isinstance(obj, (pd.Timestamp, datetime)):
        return obj.isoformat()
    return obj

@app.route('/recommend', methods=['POST'])
async def recommend():
    try:
        # print(f"[REQUEST] destination={destination}, guests={guests}, checkin={checkin}, checkout={checkout}")
        data = request.get_json()
        print(f"[REQUEST] {data}")
        destination = data.get("destination", "").strip()
        guests = int(data.get("guests", 1))
        checkin = data.get("checkin", "")
        checkout = data.get("checkout", "")

        # Validate destination using Google Maps
        location_coords = await geocode_destination(destination)
        # print(f"[GEOLOCATION] {location_coords}")
        if not location_coords:
            return jsonify({"status": "error", "message": "Invalid destination"}), 400

        lat, lng = location_coords
        print(f"[GEOLOCATION] {lat}, {lng}")

        
        df = get_cached_data()
        
        R = 6371.0  

        lat1 = np.radians(lat)
        lng1 = np.radians(lng)
        lat2 = np.radians(df["lat"])
        lng2 = np.radians(df["lng"])

        dlat = lat2 - lat1
        dlng = lng2 - lng1

        a = np.sin(dlat / 2)**2 + np.cos(lat1) * np.cos(lat2) * np.sin(dlng / 2)**2
        c = 2 * np.arcsin(np.sqrt(a))

        df["distance_km"] = R * c
        df = df[df["distance_km"] <= 50]  

        print(df.head())

        if df.empty:
            return jsonify({"status": "Not Found", "message": "No property data available"}), 404

        df = df.sort_values("distance_km")

        # # Filter by check-in/check-out =>
        # if checkin and checkout:
        #     try:
        #         checkin_date = datetime.strptime(checkin, "%Y-%m-%d")
        #         checkout_date = datetime.strptime(checkout, "%Y-%m-%d")
        #         df = df[(df["available_from"] <= checkin) & (df["available_to"] >= checkout)]
        #     except ValueError:
        #         return jsonify({"status": "error", "message": "Invalid date format"}), 400

        # # Filter by guest count
        # if "max_guests" in df.columns:
        #     df = df[df["max_guests"] >= guests]

        # if df.empty:
        #     return jsonify({"status": "success", "data": []})
        
        # filter by Rating
        if "avgRating" in df.columns and not df["avgRating"].isnull().all():
            rating = df["avgRating"].astype(float).fillna(0)
            min_rating = rating.min()
            max_rating = rating.max()
            df["normalized_rating"] = (rating - min_rating) / (max_rating - min_rating + 1e-6)
        else:
            df["normalized_rating"] = 0.0

        # Combine text fields for recommendation
        df["combined_text"] = df["title"].astype(str) + " " + df["location"].astype(str) + " " + df["description"].astype(str)
        description = df["combined_text"].tolist()
        query_text = f"{destination} for {guests} guests"

        doc_embeddings = model.encode(description, convert_to_tensor=True)
        query_embedding = model.encode(query_text, convert_to_tensor=True)
        
        # similarities = util.pytorch_cos_sim(query_embedding, doc_embeddings)[0]
        similarities = cosine_similarity(query_embedding.cpu().detach().numpy().reshape(1, -1), doc_embeddings.cpu().detach().numpy())

        # similarities_score = similarities.cpu().numpy()
        similarities_score = similarities.flatten()
        final_score = (0.5 * similarities_score) + (0.5 * df["normalized_rating"].values)

        k = min(5, len(final_score))
        top_indices = torch.topk(torch.tensor(final_score), k=k).indices
        
        results = df.iloc[top_indices].to_dict(orient="records")
        
        # print("[RESPONSE DATA]", results)
        return jsonify({"status": "success", "data": results})

    except Exception as e:
        print(f"[ERROR] {e}")
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/reload', methods=['GET'])
def reload_data():
    global df_cache, last_reload_time
    df_cache = load_data()
    last_reload_time = time.time()
    return jsonify({"status": "success", "message": "Data reloaded"}), 200

@app.route('/ping')
def ping():
    return "Recommender is up", 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)