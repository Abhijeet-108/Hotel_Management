import React, { useState, useContext } from "react";
import PhoneSection from "./Login/PhoneSection";
import OtpSection from "./Login/OtpSection";
import EmailSection from "./Login/EmailSection";
import GoogleSection from "./Login/GoogleSection";
import UserDetailsSection from "./Login/UserDetailsSection";
import { UserDataContext } from "../context/userContext";
import { useOtpData } from "../context/OtpContext";

function Login() {
  const [loginMethod, setLoginMethod] = useState("phone");
  const [previousMethod, setPreviousMethod] = useState("");
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [userDetails, setUserDetails] = useState({ name: "", email: "",  password: "" });
  const { user, setUser } = useContext(UserDataContext);
  const {
    sendOtp,
    verifyOtp,
    registerPhoneUser,
    registerEmailUser,
    registerGoogleUser,
    otpSent,
    verified,
    error,
    resetOtpData,
  } = useOtpData();

  const methodNames = {
    phone: "Phone",
    google: "Google",
    email: "Email",
  };
  
  // STEP 1: PHONE
  const handlePhoneSubmit = async () => {
    const phoneNumber = String(user.phone?.phoneNumber || "").trim();
    if (!phoneNumber) {
      alert("Please enter a phone number");
      return;
    }

    try {
      await sendOtp(user.phone);
      alert("OTP request sent successfully!");
      setStep(2);
    } catch (error) {
      alert(error?.response?.data?.message || "Error sending OTP. Try again.");
    }
  };

  
  // STEP 2: VERIFY OTP
  const handleOtpAction = async (e) => {
    e.preventDefault();
    if (!otp.trim()) {
      alert("Please enter an OTP.");
      return;
    }
    try {
      await verifyOtp(user.phone, otp);
      alert("OTP Verified");
      setStep(3);
    } catch (error) {
      alert(error?.response?.data?.message || "Invalid OTP. Try again.");
    }
  };
  
  // STEP 1 for Email method
  const handleEmailSubmit = async () => {
    if (!user.email.trim() || !user.password.trim()) {
      alert("Email and password are required");
      return;
    }
    alert("Email confirmed. Proceeding to user details.");
    setStep(3);
  };
  
  // STEP 1 for Google method
  const handleAlternativeLogin = (method) => {
    console.log(`Logging in with ${method}`);
    setStep(3);
  };
  
  const switchLoginMethod = (method) => {
    setPreviousMethod(loginMethod);
    setLoginMethod(method);
    setStep(1);
    setOtp("");
    resetOtpData();
    setUserDetails({ name: "", email: "" });
  };
  
  const handleBack = () => {
    setStep(1);
  };
  
  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-gray-100">
      {step === 1 && (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <div className="flex justify-center items-center mb-6 pb-4 border-b-2">
            <h1 className="text-lg font-semibold">Log in or sign up</h1>
          </div>
          
          <h2 className="text-lg font-semibold mb-4">Welcome to StayFinder</h2>
          
          {loginMethod === "phone" && (
            <PhoneSection
              phone={user.phone}
              setPhone={(updatedPhone) =>
                setUser({ ...user, phone: updatedPhone })
              }
              handlePhoneSubmit={handlePhoneSubmit}
            />
          )}
          
          {loginMethod === "email" && (
            <EmailSection
              email={user.email}
              setEmail={(email) => setUser({ ...user, email })}
              password={user.password}
              setPassword={(password) => setUser({ ...user, password })}
              handleEmailSubmit={handleEmailSubmit}
            />
          )}
          
          {loginMethod === "google" && (
            <GoogleSection handleAlternativeLogin={handleAlternativeLogin} />
          )}
          
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-gray-500">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>
          
          {["google", "email", "phone"].map((method) =>
            method !== loginMethod ? (
              <button
                key={method}
                onClick={() => switchLoginMethod(method)}
                className="flex items-center w-full p-3 border rounded mb-2 hover:bg-gray-100"
              >
                <span className="mr-2 rounded-sm">
                  {method === "google" ? "G" : method === "email" ? "✉️" : "📞"}
                </span>
                Continue with {methodNames[method]}
              </button>
            ) : null
          )}
        </div>
      )}
      
      {step === 2 && loginMethod === "phone" && (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <OtpSection
            otp={otp}
            setOtp={setOtp}
            handleOtpSubmit={handleOtpAction}
            phoneNumber={user.phone.phoneNumber}
            handleBack={handleBack}
          />
        </div>
      )}
      
      {step === 3 && (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <UserDetailsSection handleBack={handleBack} />
        </div>
      )}
    </div>
  );
}

export default Login;

