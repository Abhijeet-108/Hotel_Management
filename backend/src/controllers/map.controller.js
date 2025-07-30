import { getAddressCordinate, getAutoCompleteSuggestions } from '../services/map.service.js';
import { validationResult } from 'express-validator';
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getCoordinates = asyncHandler(async(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new ApiError(400, errors.array());
    }
    const { address } = req.query;

    try{
        const coordinates = await getAddressCordinate(address);
        res.status(200).json(new ApiResponse(200, coordinates, 'Get Coordinates'));
    }catch(error){
        console.error('Error fetching coordinates:', error.message || error);
        res.status(404).json(new ApiError(400, 'coordinates not found. please check the address'));
    }
});

export const getAutoCompleteSuggestion = asyncHandler(async(req, res, next) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            throw new ApiError(400, {errors: errors.array()})
        }
        const { input } = req.query;

        const suggestion = await getAutoCompleteSuggestions(input);
        res.status(200).json(new ApiResponse(200, suggestion));
    }catch(error){
        console.error('Error fetching coordinates: ', error.message || errors);
        throw new ApiError(500, {message: 'Internal Error'});
    }
})