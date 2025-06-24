import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../Models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { saveOtp, getOtpData, deleteOtp } from "../utils/otp.utils.js";
import { sendOtpToPhone } from "../utils/sms.utils.js";
import { sendMessageToSocket } from "../../socket.js";

const registerUser = asyncHandler(async (req, res) => {
  const { action } = req.body;

  if (!action) {
    throw new ApiError(400, "Action is required");
  }

  // Common validations
  const phoneNumber =
    req.body.phone?.countryCode && req.body.phone?.phoneNumber
      ? req.body.phone.countryCode + req.body.phone.phoneNumber
      : null;

  switch (action) {
    case "send_otp": {
      if (!phoneNumber) {
        throw new ApiError(400, "Valid phone number is required");
      }

      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      await saveOtp(phoneNumber, generatedOtp, {
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
      });
      await sendOtpToPhone(req.body.phone, generatedOtp);

      sendMessageToSocket(phoneNumber, {
        event: "otp_sent",
        data: { phoneNumber },
      });
      return res.json(new ApiResponse(200, null, "OTP SENT. Please Verify"));
    }

    case "verify_otp": {
      const { otp } = req.body;

      if (!phoneNumber || !otp) {
        throw new ApiError(400, "Phone number and OTP required");
      }

      const record = await getOtpData(phoneNumber);
      if (!record || record.otp !== otp) {
        throw new ApiError(400, "Invalid or expired OTP");
      }

      console.log("[verify_otp] record:", record);

      sendMessageToSocket(phoneNumber, {
        event: "otp_verified",
        data: { phoneNumber },
      });
      return res.json(new ApiResponse(200, record.userData, "OTP Verified"));

    }

    case "register_phone_user": {
      const { fullName, email, password, phone } = req.body;

      if (!fullName?.trim() || !email?.trim() || !password?.trim() || !phone) {
        throw new ApiError(400, "Missing required user details");
      }

      try {
        const existedUser = await User.findOne({ email, phone: phone }); 
        if (existedUser) {
          throw new ApiError(409, "User is already registered");
        }

        const user = await User.create({ fullName, email, password, phone }); 
        const formattedPhoneNumber = phone.countryCode + phone.phoneNumber;
        await deleteOtp(formattedPhoneNumber);

        const createdUser = await User.findById(user._id).select("-password");

        return res
          .status(201)
          .json(new ApiResponse(200, createdUser, "User registered successfully"));
      } catch (error) {
        console.error("Error in register_phone_user:", error);
        throw new ApiError(500, error?.message || "Internal Server Error");
      }
    }

    case "register_email_user": {
      const { fullName, email, password } = req.body;

      if (!fullName?.trim() || !email?.trim() || !password?.trim()) {
        throw new ApiError(400, "Missing required user details");
      }

      const existedUser = await User.findOne({ email }); 
      if (existedUser) {
        throw new ApiError(409, "User is already registered");

      }

      const user = await User.create({ fullName, email, password });
      const createdUser = await User.findById(user._id).select("-password");
      return res
        .status(201)
        .json(new ApiResponse(200, createdUser, "User registered successfully"));
    }

    case "register_google_user": {
      const { fullName, email, googleId } = req.body;

      if (!fullName?.trim() || !email?.trim() || !googleId?.trim()) {
        throw new ApiError(400, "Missing required user details");
      }

      const existedUser = await User.findOne({ email,  }); 
      if (existedUser) {
        throw new ApiError(409, "User is already registered");
      }

      const user = await User.create({ fullName, email, googleId }); 
      const createdUser = await User.findById(user._id).select("-password");
      return res
        .status(201)
        .json(new ApiResponse(200, createdUser, "User registered successfully"));
    }

    default:
      throw new ApiError(400, "Invalid action");
  }
});

export { registerUser };
