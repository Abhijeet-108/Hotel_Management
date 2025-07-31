from flask import Flask, request, jsonify
import pandas as pd
from sqlalchemy import create_engine
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from datetime import datetime
import os
import requests

app = Flask(__name__)


DB_TYPE = "mysql+pymysql"
DB_USER = os.environ.get("USER")
DB_PASS = os.environ.get("PASSWORD")
DB_HOST = os.environ.get("HOST")
DB_PORT = "3306"
DB_NAME = os.environ.get("DATABASE")

print(f"DB_USER: {DB_USER}, DB_PASS: {DB_PASS}, DB_HOST: {DB_HOST}, DB_NAME: {DB_NAME}")

engine = create_engine(f"{DB_TYPE}://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}")


GOOGLE_MAPS_API_KEY = os.environ.get("GOOGLE_MAPS_API_KEY")
print(f"[API KEY] {GOOGLE_MAPS_API_KEY}")
def geocode_destination(destination):
    url = f"https://maps.googleapis.com/maps/api/geocode/json?address={destination}&key={GOOGLE_MAPS_API_KEY}"
    response = requests.get(url)
    if response.status_code != 200:
        return None
    data = response.json()
    if not data.get("results"):
        return None
    location = data["results"][0]["geometry"]["location"]
    return location["lat"], location["lng"]

# === LOAD PROPERTIES ===
def load_data():
    try:
        df = pd.read_sql("SELECT * FROM properties", engine)
        df.fillna("", inplace=True)
        return df
    except Exception as e:
        print(f"[DB ERROR] {e}")
        return pd.DataFrame([])

@app.route('/recommend', methods=['POST'])
def recommend():
    try:
        data = request.get_json()
        print(f"[REQUEST] {data}")
        destination = data.get("destination", "").strip()
        guests = int(data.get("guests", 1))
        checkin = data.get("checkin", "")
        checkout = data.get("checkout", "")

        # Validate destination using Google Maps
        location_coords = geocode_destination(destination)
        print(f"[GEOLOCATION] {location_coords}")
        if not location_coords:
            return jsonify({"status": "error", "message": "Invalid destination"}), 400

        df = load_data()
        if df.empty:
            return jsonify({"status": "error", "message": "No property data available"}), 500

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

        if df.empty:
            return jsonify({"status": "success", "data": []})

        # Combine text fields for recommendation
        df["combined_text"] = df["title"].astype(str) + " " + df["location"].astype(str) + " " + df["description"].astype(str)
        query_text = f"{destination} for {guests} guests"

        vectorizer = TfidfVectorizer()
        tfidf_matrix = vectorizer.fit_transform(df["combined_text"])
        query_vector = vectorizer.transform([query_text])
        similarities = cosine_similarity(query_vector, tfidf_matrix).flatten()

        top_indices = similarities.argsort()[::-1][:5]
        results = df.iloc[top_indices].to_dict(orient="records")

        return jsonify({"status": "success", "data": results})

    except Exception as e:
        print(f"[ERROR] {e}")
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/reload', methods=['GET'])
def reload_data():
    global df_cache
    df_cache = load_data()
    return jsonify({"status": "success", "message": "Data reloaded"}), 200

@app.route('/ping')
def ping():
    return "Recommender is up", 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)