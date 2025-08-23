import sequelize from "../db/db.sql";
import Property from "../Models/property.model.js";
import { ApiError } from "../utils/ApiError.js";

// new review
export const incrementPropertyRating = async (propertyId, newRating) => {
    const property = await Property.findByPk(propertyId);
    if (!property) throw new ApiError(404, "Property not found");

    const oldRating = property.avgRating;
    const oldCount = property.reviewCount;

    const newCount = oldCount + 1;

    const newRating = ((oldRating * oldCount) + newRating) / newCount;
    property.avgRating = newRating;
    property.reviewCount = newCount;
    await property.save();
}

// update review
export const updatePropertyRating = async (propertyId, oldRating, newRating) => {
    const property = await Property.findByPk(propertyId);
    if (!property) throw new ApiError(404, "Property not found");

    const oldCount = property.reviewCount;
    if (oldCount === 0) return;

    const oldTotal = (property.avgRating * oldCount);
    const newTotal = oldTotal - oldRating + newRating;


    property.avgRating = newTotal / oldCount;
    await property.save();
}

// delete review
export const deletePropertyRating = async (propertyId, oldRating) => {
    const property = await Property.findByPk(propertyId);
    if (!property) throw new ApiError(404, "Property not found");

    const oldCount = property.reviewCount;
    if (oldCount === 0) return;

    const oldRating = property.avgRating;
    const newCount = oldCount -1;
    if(newCount === 0) {
        property.avgRating = 0;
        property.reviewCount = 0;
    }else{
        const oldTotal = (property.avgRating * oldCount);
        const newTotal = oldTotal - oldRating;
        property.avgRating = newTotal / newCount;
        property.reviewCount = newCount;
    }

    await property.save();
}


