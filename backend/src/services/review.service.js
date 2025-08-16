import sequelize from "../db/db.sql";
import Property from "../Models/property.model.js";

// new review
async function incrementPropertyRating(propertyId, newRating) {
    const property = await Property.findByPk(propertyId);
    if (!property) return;

    property.avgRating = ((property.avgRating * property.reviewCount) + newRating) / (property.reviewCount + 1);
    property.reviewCount += 1;
    await property.save();
}

// update review
async function updatePropertyRating(propertyId, oldRating, newRating) {
    const property = await Property.findByPk(propertyId);
    if (!property) return;

    property.avgRating = ((property.avgRating * property.reviewCount) - oldRating + newRating) / property.reviewCount;
    await property.save();
}

// delete review
async function deletePropertyRating(propertyId, oldRating) {
    const property = await Property.findByPk(propertyId);
    if (!property) return;

    if(property.reviewCount <= 1){
        property.avgRating = 0;
        property.reviewCount = 0;
    }else{
        property.avgRating = ((property.avgRating * property.reviewCount) - oldRating) / (property.reviewCount - 1);
        property.reviewCount -= 1;
    }
    await property.save();
}

