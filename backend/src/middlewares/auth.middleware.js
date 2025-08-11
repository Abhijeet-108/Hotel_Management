import jwt from "jsonwebtoken";
import User from "../Models/user.model.sql.js";
import { ApiError } from "../utils/ApiError.js";
import {asyncHandler} from "../utils/asyncHandler.js";

export const authenticate = asyncHandler(async (req, res, next) => {
    console.log("Cookies:", req.cookies);
  const token = req.cookies.token;;

  if (!token) throw new ApiError(401, "No access token found in cookies");

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findByPk(decoded.id);
    if (!user) throw new ApiError(401, "User not found");

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, "Invalid or expired token");
  }
});
