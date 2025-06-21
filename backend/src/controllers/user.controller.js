import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../Models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { saveOtp, getOtpData, deleteOtp } from "../utils/otp.utils.js";
import { sendOtpToPhone } from "../utils/sms.utils.js";


const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password, phone, otp  } = req.body;

  // Validate basic fields
  if (!fullName?.trim() || !email?.trim() || !password?.trim()) {
    throw new ApiError(400, "Full name, email, and password are required");
  }

  // Validate phone (if it's an object with countryCode and phoneNumber)
  if (
    !phone ||
    !phone.countryCode?.trim() ||
    !phone.phoneNumber?.trim()
  ) {
    throw new ApiError(400, "Valid phone number is required");
  }

  const phoneNumber = phone.countryCode + phone.phoneNumber;

  // Check if user already exists
  const existedUser = await User.findOne({ email }); // ✅ Correct method
  if (existedUser) {
    throw new ApiError(409, "User is already registered");
  }

  if(!otp){
    const generatedOtp = Math.floor(100000 + Math.random()*900000).toString();
    await saveOtp(phoneNumber, generatedOtp, {fullName, email, password, phone});
    await sendOtpToPhone(phone, generatedOtp);
    return res.json(new ApiResponse(200, null, "OTP SENT. Please Verify"));
  }

  const record = await getOtpData(phoneNumber);
  if(!record || record.otp !== otp){
    throw new ApiError(400, "Invalid or expired otp");
  }

  // Create user
  const user = await User.create(record.userData);
  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  await deleteOtp(phoneNumber);

  // Respond
  return res.status(201).json(new ApiResponse(200, createdUser, "User registered successfully"));
});

export { registerUser };
