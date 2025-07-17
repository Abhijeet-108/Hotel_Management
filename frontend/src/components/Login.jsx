import React, { useState, useContext } from "react";
import PhoneSection from "./Login/PhoneSection";
import OtpSection from "./Login/OtpSection";
import EmailSection from "./Login/EmailSection";
import GoogleSection from "./Login/GoogleSection";
import UserDetailsSection from "./Login/UserDetailsSection";
import { UserDataContext } from "../context/userContext";
import { useOtpData } from "../context/OtpContext";
import { useNavigate } from 'react-router-dom';

function Login() {
  const {
    sendOtp,
    verifyOtp,
    registerPhoneUser,
    registerEmailUser,
    registerGoogleUser,
    checkUserExists,
    getUserByPhone,
    otpSent,
    verified,
    error,
    resetOtpData,
    login,
    setOtpData,
  } = useOtpData();

  const [loginMethod, setLoginMethod] = useState("phone");
  const [previousMethod, setPreviousMethod] = useState("");
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [userDetails, setUserDetails] = useState({ name: "", email: "",  password: "" });
  const { userData, setUserData } = useContext(UserDataContext);
  

  const navigate = useNavigate();

  const methodNames = {
    phone: "Phone",
    google: "Google",
    email: "Email",
  };
  
  // STEP 1: PHONE
  const handlePhoneSubmit = async () => {
    const phoneNumber = String(userData.phone?.phoneNumber || "").trim();
    if (!phoneNumber) {
      alert("Please enter a phone number");
      return;
    }

    try{
      const exists = await checkUserExists(userData.phone);

      if(exists){
        await sendOtp(userData.phone);
        alert("OTP sent! Please enter your Otp.")
        setStep(2);
      }else{
        await sendOtp(userData.phone);
        alert("OTP request sent successfully!");
        setStep(2);
      }
    }catch(error){
      alert(error?.response?.data?.message || "Error. Try again.")
    }
  };

  
  // STEP 2: VERIFY OTP
  const handleOtpAction = async (e) => {
    e.preventDefault();
    if (!otp.trim()) {
      alert("Please enter an OTP.");
      return;
    }

    const phone = userData.phone;
    
    console.log("formattedPhone: ", phone)
    try {
      const exist = await checkUserExists(phone);
      console.log("exist: => ",exist)
      if(exist){
        await verifyOtp(phone, otp);
        const fetchedUser  = await getUserByPhone(phone)
        setOtpData((prev) => ({
          ...prev,
          userData: fetchedUser.data ,
          isPhoneVerified: true,
        }));
        login(fetchedUser);
        alert("Otp verified and user loaded");
        navigate('/')
      }
      else{
        const res = await verifyOtp(phone, otp);
        console.log("verifyOtp response:", res);
        if(res?.data){
          setOtpData((prev) => ({
            ...prev,
            userData: res.data,
            isPhoneVerified: true,
          }));
          login(res.data);
          console.log(res.data);
          alert("OTP Verified");
          setStep(3);
        }
      }
    } catch (error) {
      alert(error?.response?.data?.message || "Invalid OTP. Try again.");
    }
  };
  
  // STEP 1 for Email method
  const handleEmailSubmit = async () => {
    if (!userData.email.trim() || !userData.password.trim()) {
      alert("Email and password are required");
      return;
    }
    alert("Email confirmed. Proceeding to user details.");
    setStep(3);
  };
  
  // STEP 1 for Google method
  const handleAlternativeLogin = async (method, token = null) => {
  console.log(`Logging in with ${method}`);

  if (method === "google" && token) {
    try {
      const data = await registerGoogleUser({ token });

      login(data.data);
      alert("Google login successful!");
      navigate('/');
    } catch (err) {
      alert("Google login failed: " + err.message);
    }
  }
  
  };

  
  const switchLoginMethod = (method) => {
    setPreviousMethod(loginMethod);
    setLoginMethod(method);
    setStep(1);
    setOtp("");
    resetOtpData();
    setUserData({ phone: { countryCode: "+91", phoneNumber: "" }, email: "", password: "" });
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
              phone={userData.phone}
              setPhone={(updatedPhone) =>
                setUserData({ ...userData, phone: updatedPhone })
              }
              handlePhoneSubmit={handlePhoneSubmit}
            />
          )}
          
          {loginMethod === "email" && (
            <EmailSection
              email={userData.email}
              setEmail={(email) => setUserData({ ...userData, email })}
              password={userData.password}
              setPassword={(password) => setUserData({ ...userData, password })}
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
            phoneNumber={userData.phone}
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

