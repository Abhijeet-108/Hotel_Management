import twilio from "twilio";

export async function sendOtpToPhone(phone, otp) {
  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
  const phoneNumber = phone.countryCode + phone.phoneNumber;

  try {
    await client.messages.create({
      body: `Your verification OTP is: ${otp}. It will expire in 5 minutes.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });
    console.log(`✅ OTP sent to ${phoneNumber}`);
  } catch (error) {
    console.error(`❌ Twilio error for ${phoneNumber}:`, error.message);
    throw new Error("Unable to send OTP via Twilio at this moment.");
  }
}
