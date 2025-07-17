import { Otp } from "../Models/otp.model.js";

export async function saveOtp(phoneNumber, otp, userData) {
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); 
  await Otp.findOneAndUpdate(
    { phoneNumber },
    { otp, userData, expiresAt },
    { upsert: true, new: true }
  );
}

export async function getOtpData(phoneNumber) {
  const record = await Otp.findOne({ phoneNumber });
  if (!record) return null;

  if (record.expiresAt < new Date()) {
    await deleteOtp(phoneNumber);
    return null;
  }
  return record;
}

export async function deleteOtp(phoneNumber) {
  await Otp.deleteOne({ phoneNumber });
}
