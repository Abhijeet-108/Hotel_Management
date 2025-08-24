import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  phoneNumber: { 
    type: String, 
    required: true,  
  },
  otp: { 
    type: String, 
    required: true 
  },
  userData: { 
    type: Object,
    required: true 
  },
  isPhoneVerified: {
    type: Boolean,
    default: false,
  },
  expiresAt: { 
    type: Date, 
    required: true 
  },
});
 
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); 

otpSchema.index(
  { phoneNumber: 1 },
  { unique: true , partialFilterExpression: { phoneNumber: { $exists: true, $ne: null } } }
)

export const Otp = mongoose.model("Otp", otpSchema);
