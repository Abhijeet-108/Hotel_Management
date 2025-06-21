import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true, unique: true },
  otp: { type: String, required: true },
  userData: { type: Object, required: true },
  expiresAt: { type: Date, required: true },
});
 
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); 

export const Otp = mongoose.model("Otp", otpSchema);
