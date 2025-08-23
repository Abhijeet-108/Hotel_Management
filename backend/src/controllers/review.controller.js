import { incrementPropertyRating, updatePropertyRating, deletePropertyRating } from "../services/review.service.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Review from "../Models/review.model.js";

// create review
export const createReview = asyncHandler(async(req, res) => {
    const { propertyId, rating, comment } = req.body;
    const userId = req.user.id;

    const review = await Review.create({
        userId,
        propertyId,
        rating,
        comment
    });

    await incrementPropertyRating(propertyId, rating);

    return ApiResponse.success(res, review);
})

// update review
export const updateReview = asyncHandler(async(req, res) => {
    const {id, rating, comment } = req.body;  
    const review = await Review.findByPk(id);

    if(!review) throw new ApiError(404, "Review not found");
    if(review.userId !== req.user.id) throw new ApiError(403, "not Allowed");

    const oldRating = review.rating;
    review.set({ rating, comment });
    await review.save();

    if (oldRating !== rating) {
        await updatePropertyRating(review.propertyId, oldRating, rating);
    }

    return res.status(200).json(new ApiResponse(200, review, "Review updated successfully"));
})

// delete review
export const deleteReview = async (req, res) => {
  const { id } = req.params;
  const review = await Review.findByPk(id);

  if (!review) throw new ApiError(404, "Review not found");
  if (review.userId !== req.user.id) throw new ApiError(403, "Not allowed");

  await review.destroy();
  await deletePropertyRating(review.propertyId, review.rating);

  return res.status(200).json(new ApiResponse(200, null, "Review deleted successfully"));
};