import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { User } from "../Models/user.model";
import { ApiResponse } from "../utils/ApiResponse";

const registerUser = asyncHandler( async(req, res) => {
    const {fullName, email, password, phone} = req.body

    if(
        [fullName, email, password, phone].some((field) => !feild || field.trim() === "")
    ){
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findone({
        $or: [{email}]
    })
    if(existedUser){
        throw new ApiError(409, "User is already existed")
    }

    const user = await User.create({
        fullName,
        email, 
        password,
        phone
    })
    const createdUser = await User.findById(user._id).select("-password -refreshToken")
    if(!createdUser){
        throw new ApiError(500, "Something wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User register sucessfully")
    )
})

export {registerUser}
