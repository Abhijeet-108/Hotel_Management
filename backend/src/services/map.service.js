import axios from 'axios';
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getAddressCordinate = asyncHandler(async(address) => {
    const apiKey = process.env.GOOGLE_MAPS_API
    const url = `https://maps.gomaps.pro/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    try{
        const response = await axios.get(url);
        if(response.data.status === 'OK' && response.data.results.length>0){
            const location = response.data.results[0].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng
            };
        }else{
            throw new ApiError(400, `Error fetching coordinates: ${response.data.status}`);
        }
    }catch(error){
        throw new ApiError(401, error,"Error occured in getAddressCordinate");
    }
})

export const getAutoCompleteSuggestions = asyncHandler(async(input) => {
    if (!input) {
        throw new Error('input are required');
    }
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    try{
        const response = await axios.get(url);

        if (response.data.status === 'OK') {
            const element = response.data.predictions;
            
            return element;
        } else {
            throw new Error(`Error fetching prediction: ${response.data.status}`);
        }
    }catch(error){
        console.error('Error occurred while fetching coordinates:', error.message || error);
        throw error;
    }
});