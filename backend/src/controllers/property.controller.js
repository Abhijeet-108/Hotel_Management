import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Property from "../Models/property.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Op } from "sequelize";
import User from "../Models/user.model.sql.js"

// add property
export const addProperty = asyncHandler(async (req, res) => {
    const userData = req.user;
    // console.log(userData);
    const {title, description, location, price, bedrooms, bathrooms, type, rating} = req.body;
    const uploadImageLocalStorage =  req.files?.image[0]?.path;
    if(!uploadImageLocalStorage){
        throw new ApiError(400, "Image Require")
    }
    const uploadImage = await uploadOnCloudinary(uploadImageLocalStorage);
    const property = await Property.create({ 
        owner:userData.id,
        title, 
        description, 
        location, 
        price, 
        bedrooms, 
        bathrooms, 
        type, 
        image: uploadImage?.secure_url,  
        rating,
    });
    return res.status(201).json(new ApiResponse(201, property, "Property added successfully"));
})

// update property
export const updateProperty = asyncHandler(async (req, res) => {
    const {id,title, description, location, price, bedrooms, bathrooms, type, rating } = req.body;
    const property = await Property.findByPk(id);if (!property) {
        throw new ApiError(404, "Property not found");
    }
    const reuploadImageLocalStorage =  req.files?.image[0]?.path;
    if(!reuploadImageLocalStorage){
        throw new ApiError(400, "Image Require")
    }
    const reuploadImage = await uploadOnCloudinary(reuploadImageLocalStorage);
    
    if(property.owner.toString() === req.body.owner?.toString() ) {
        property.set({
            title,
            description,
            location,
            price,
            bedrooms,
            bathrooms,
            type,
            image: reuploadImage?.secure_url,
            rating,
        })
        await property.save();
        return res.status(200).json(new ApiResponse(200, property, "Property updated successfully"));
    }
    throw new ApiError(403, "You are not authorized to update this property");
})

// Return user specific properties
export const userProperties = asyncHandler(async (req, res) => {
    const userid = req.user?.id;
    const properties = await Property.findAll({ where: { owner: userid } });
    return res.status(200).json(new ApiResponse(200, properties, "Properties fetched successfully"));
})

// Return all properties
export const getProperties = asyncHandler(async (req, res) => {
    try {
        const properties = await Property.findAll();
        return res.status(200).json(new ApiResponse(200, properties, "Properties fetched successfully"));
    } catch (error) {
        throw new ApiError(500, "Something went wrong while fetching properties");
    }
})

// Return property by id
export const propertyById = asyncHandler(async (req, res) => {
    const { id } = req.params;


    const property = await Property.findByPk(id, {
        include: [
            {
                model: User,
                as: 'Host', 
                attributes: ['id', 'fullName', 'email'] 
            }
        ]
    });
    // if (!property) {
    //     throw new ApiError(404, "Property not found");
    // }
    return res.status(200).json(new ApiResponse(200, property, "Property fetched successfully"));
})

// Return property by location
export const propertyByLocation = asyncHandler(async (req, res) => {
    const { location } = req.params;
    const properties = await Property.findAll({ where: { location } });
    if (!properties) {
        throw new ApiError(404, "No properties found in this location");
    }
    return res.status(200).json(new ApiResponse(200, properties, "Properties fetched successfully"));
})

// search property in db
export const searchProperty = asyncHandler(async (req, res) => {
    try {
        const searchword = req.params.key;
        if(searchword === ""){
            const allProperties = await Property.findAll();
            return res.status(200).json(new ApiResponse(200, allProperties, "All properties fetched successfully"));
        }
        const searchMatch = await Property.findAll({
            where: {
                location: { [Op.iLike]: `%${searchword}%` } 
            }
        });
        return res.status(200).json(new ApiResponse(200, searchMatch, "Properties fetched successfully"));
    } catch (error) {
        throw new ApiError(500, "Something went wrong while searching properties");
    }    
})
