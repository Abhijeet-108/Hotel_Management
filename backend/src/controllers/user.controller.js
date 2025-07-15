import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../Models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { saveOtp, getOtpData, deleteOtp } from "../utils/otp.utils.js";
import { sendOtpToPhone } from "../utils/sms.utils.js";
import { sendMessageToSocket } from "../../socket.js";
import { OAuth2Client } from "google-auth-library"

const registerUser = asyncHandler(async (req, res) => {
  const { action } = req.body;

  if (!action) {
    throw new ApiError(400, "Action is required");
  }

  const phoneNumber = req.body.phone?.countryCode && req.body.phone?.phoneNumber
      ? req.body.phone.countryCode + req.body.phone.phoneNumber : null;

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

      // console.log("[verify_otp] record:", record);

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
        const existedUser = await User.findOne({ phone }); 
        console.log("phone: ", phone);
        if (existedUser) {
          throw new ApiError(409, "User is already registered");
        }

        const user = await User.create({ fullName, email, password, phone }); 
        const formattedPhoneNumber = phone.countryCode + phone.phoneNumber;
        await deleteOtp(formattedPhoneNumber);

        const createdUser = await User.findById(user._id).select("-password");

        if(!createdUser) {
          throw new ApiError(500, "Something wrong while registering the user")
        }

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
      const { token } = req.body;

      if(!token){
        throw new ApiError(400, "Google token is required");
      }

      const client = new OAuth2Client(process.env.CLIENT_ID);

      let payload;
      try{
        const ticket = await client.verifyIdToken({
          idToken: token,
          audience:process.env.CLIENT_ID
        })
        payload = ticket.getPayload();
      }catch(error){
        console.log("Google token verification failed:", error);
        throw new ApiError(401, "Invalid Google token");
      }

      const googleId = payload.sub;
      const email = payload.email;
      const fullName = payload.name;
      const profilePicture = payload.picture;

      if (!googleId || !email || !fullName) {
        throw new ApiError(400, "Missing required Google user details");
      }


      let user = await User.findOne({ email });
      if(user){
        if(user.googleId){
          return res
          .status(200)
          .json(new ApiResponse(200, user, "User Logged is successfully"))
        } else{
          throw new ApiError(409, "Email is already registered with a different method");
        }
      }

      const newuser = await User.create({ fullName, email, googleId, profilePicture }); 
      const createdUser = await User.findById(newuser._id).select("-password");
      return res
        .status(201)
        .json(new ApiResponse(200, createdUser, "User registered successfully"));
    }

    // check existence
    case "check_user_existence": {
      const { phone } = req.body;

      if(!phone){
        throw new ApiError(400, "Phone Number is required");
      }

      try{
        const existedUser = await User.findOne({ phone });

        return res
          .status(200)
          .json(new ApiResponse(200, {exits: !!existedUser}, "User existence checked")
        );
      }
      catch(error){
        console.error("Error in check_user_existence: ", error);
        throw new ApiError(500, error?.message || "Internal Server Error")
      }
    }

    case "get_user_by_phone": {
      const { phone } = req.body;

      if(!phone){
        throw new ApiError(400, "Phone number is required")
      }

      try{
        const user = await User.findOne({ phone }).select("-password");
        if(!user){
          throw new ApiError(404, "user not found")
        }
        return res.status(200).json(new ApiResponse(200, user, "User data fetched successfully"))
      }catch(error){
        console.error("Error in check_user_existence: ", error);
        throw new ApiError(500, error?.message || "Internal Server Error")
      }
    }

    default:
      throw new ApiError(400, "Invalid action");
  }
});



export { registerUser };
