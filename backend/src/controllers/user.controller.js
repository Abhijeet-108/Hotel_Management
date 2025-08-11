import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../Models/user.model.sql.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { saveOtp, getOtpData, deleteOtp } from "../utils/otp.utils.js";
import { sendOtpToPhone } from "../utils/sms.utils.js";
import { sendMessageToSocket } from "../../socket.js";
import { OAuth2Client } from "google-auth-library";

const formatPhoneNumber = (phone) => {
  return phone?.countryCode && phone?.phoneNumber
    ? phone.countryCode.trim() + phone.phoneNumber.trim()
    : null;
};

const handleSendOtp = async (req, res) => {
  const phoneNumber = formatPhoneNumber(req.body.phone);
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
    event: "otp-sent",
    data: { phoneNumber },
  });

  

  return res.json(new ApiResponse(200, null, "OTP SENT. Please Verify"));
};

const handleVerifyOtp = async (req, res) => {
  console.log("req body", req.body);
  const phoneNumber = formatPhoneNumber(req.body.phone);
  const { otp } = req.body;

  if (!phoneNumber || !otp) {
    throw new ApiError(400, "Phone number and OTP required");
  }

  const record = await getOtpData(phoneNumber);
  if (!record || record.otp !== otp) {
    throw new ApiError(400, "Invalid or expired OTP");
  }

  sendMessageToSocket(phoneNumber, {
    event: "otp-verified",
    data: { phoneNumber },
  });

  return res.json(new ApiResponse(200, record.userData, "OTP Verified"));
};

const handleRegisterPhoneUser = async (req, res) => {
  console.log("req body", req.body);
  const { fullName, email, password, phone } = req.body;
  const countryCode = phone?.countryCode;
  const phoneNumber = phone?.phoneNumber;

  if (!fullName?.trim() || !email?.trim() || !password?.trim() || !countryCode || !phoneNumber) {
    throw new ApiError(400, "Missing required user details");
  }

  const existedUser = await User.findOne({ where: {countryCode, phoneNumber, } });
  if (existedUser) {
    throw new ApiError(409, "User is already registered");
  }

  // const hashedPassword = await bcrypt.hash(password, 6);
  const user = await User.create({
    fullName: fullName,
    email,
    password,
    countryCode,
    phoneNumber,
  });
  const formattedPhone = countryCode + phoneNumber;
  await deleteOtp(formattedPhone);

  const createdUser = await User.findByPk(user.id, {
    attributes: { exclude: ["password"] },
  });

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  const accessToken  = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  res.cookie("token", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });


  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
};

const handleRegisterEmailUser = async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName?.trim() || !email?.trim() || !password?.trim()) {
    throw new ApiError(400, "Missing required user details");
  }

  const existedUser = await User.findOne({ where: { email } });
  if (existedUser) {
    throw new ApiError(409, "User is already registered");
  }

  // const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    fullname: fullName,
    email,
    password,
  });

  const createdUser = await User.findByPk(user.id, {
    attributes: { exclude: ["password"] },
  });
  const accessToken  = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  res.cookie("token", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
};

const handleRegisterGoogleUser = async (req, res) => {
  // console.log(req.body)
  const { token } = req.body;

  if (!token) {
    throw new ApiError(400, "Google token is required");
  }

  const client = new OAuth2Client(process.env.CLIENT_ID);

  let payload;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });
    payload = ticket.getPayload();
  } catch (error) {
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

  let user = await User.findOne({ where: { email } });
  if (user) {
    if (user.googleId) {
      return res
        .status(200)
        .json(new ApiResponse(200, user, "User logged in successfully"));
    } else {
      throw new ApiError(409, "Email is already registered with a different method");
    }
  }

  const newUser = await User.create({
    fullName: fullName,
    email,
    googleId,
    profilePicture,
  });

  const createdUser = await User.findByPk(newUser.id, {
    attributes: { exclude: ["password"] },
  });

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
};

const handleCheckUserExistence = async (req, res) => {
  const { phone } = req.body;
  if (!phone) {
    throw new ApiError(400, "Phone number is required");
}

  const { countryCode, phoneNumber } = req.body.phone;
  const existedUser = await User.findOne({ where: { countryCode, phoneNumber } });
  return res
    .status(200)
    .json(new ApiResponse(200, { exists: !!existedUser }, "User existence checked"));
};

const handleGetUserByPhone = async (req, res) => {
  const { phone } = req.body;
  const { countryCode, phoneNumber } = phone || {};
  
  if (!countryCode || !phoneNumber) {
    throw new ApiError(400, "Phone number is required");
  }

  const user = await User.findOne({
    where: { countryCode, phoneNumber },
    attributes: { exclude: ["password"] },
  });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const accessToken  = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  res.cookie("token", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
  
  return res
    .status(200)
    .json(new ApiResponse(200, user, "User Login successfully"));
};

const registerUser = asyncHandler(async (req, res) => {
  const { action } = req.body;

  if (!action) {
    throw new ApiError(400, "Action is required");
  }

  const actions = {
    send_otp: handleSendOtp,
    verify_otp: handleVerifyOtp,
    register_phone_user: handleRegisterPhoneUser,
    register_email_user: handleRegisterEmailUser,
    register_google_user: handleRegisterGoogleUser,
    check_user_existence: handleCheckUserExistence,
    get_user_by_phone: handleGetUserByPhone,
  };

  const handler = actions[action];
  if (!handler) {
    throw new ApiError(400, "Invalid Action");
  }

  await handler(req, res);
});

export { registerUser };
