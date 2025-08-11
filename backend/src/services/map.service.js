import axios from 'axios';
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getAddressCordinate = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);

        if (response.data.status === 'OK' && response.data.results.length > 0) {
            const result = response.data.results[0];
            const location = result.geometry.location;

            return {
                lat: location.lat,
                lng: location.lng,
                address: result.formatted_address
            };
        } else {
            throw new ApiError(400, `Error fetching coordinates: ${response.data.status}`);
        }
    } catch (error) {
        throw new ApiError(401, error.message || "Unknown error", "Error occurred in getAddressCordinate");
    }
};

export const getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new ApiError(400, "Input is required");
    }

    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);

        if (response.data.status === 'OK') {
            return response.data.predictions;
        } else {
            throw new ApiError(400, `Error fetching prediction: ${response.data.status}`);
        }
    } catch (error) {
        console.error('Error occurred while fetching suggestions:', error.message || error);
        throw new ApiError(500, error.message || "Internal error", "getAutoCompleteSuggestions failed");
    }
};
