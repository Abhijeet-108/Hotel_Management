import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { SocketContext } from "./SocketContext"; 

export const OtpContext = createContext();

// Exported hook
export const useOtpData = () => {
  return useContext(OtpContext);
};

const OtpContextProvider = ({ children }) => {
  const { socket } = useContext(SocketContext);

  const [otpData, setOtpData] = useState({
    phoneNumber: "",
    otp: "",
    userData: {},
    isPhoneVerified: false,
    expiresAt: null,
  });
  const [error, setError] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);

  // AUTH LOGIC STARTS
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Check for user in local storage (or JWT token) when component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const login = async (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    setIsLoggedIn(true);
  };
  const logout = async () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsLoggedIn(false);
  };
  // AUTH LOGIC ENDS

  // Reset method
  const resetOtpData = () =>
    setOtpData({
      phoneNumber: "",
      otp: "",
      userData: {},
      isPhoneVerified: false,
      expiresAt: null,
    });
  
  // REST method: Send OTP
  const sendOtp = async (phone) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/login`, {
        action: "send_otp",
        phone,
      });
      return res.data;
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");
      throw err;
    }
  };
  
  // REST method: Verify OTP
  const verifyOtp = async (phone, otp) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/login`, {
        action: "verify_otp",
        phone,
        otp,
      });
      return res.data;
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");
      throw err;
    }
  };
  
  // REST method: Register phone user
  const registerPhoneUser = async (userData) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/login`, {
        action: "register_phone_user",
        ...userData,
      });
      return res.data;
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");
      throw err;
    }
  };

  const checkUserExists = async(phone) => {
    try{
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/login`,{
        action: "check_user_existence",
        phone,
      });
      console.log("checkUserExists response:", res.data);
      return res.data.data.exists;
    }catch(err){
      setError(err?.response?.data?.message || "Something went wrong")
      throw err;
    }
  }

  const getUserByPhone = async(phone) => {
    try{
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/login`,{
        action: "get_user_by_phone",
        phone,
      });
      await login(res.data.data);
      return res.data.data;
    }catch(err){
      setError(err?.response?.data?.message || "Something went wrong")
      throw err;
    }
  }

  // REST method: Register email user
  const registerEmailUser = async (userData) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/login`, {
        action: "register_email_user",
        ...userData,
      });
      return res.data;
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");
      throw err;
    }
  };
  
  // REST method: Register google user
  const registerGoogleUser = async (userData) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/login`, {
        action: "register_google_user",
        ...userData,
      });
      return res.data;
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");
      throw err;
    }
  };
  
  // Listen for socket events
  useEffect(() => {
    if (!socket) return;

    socket.on("otp_sent", (data) => {
      setOtpSent(true);
      setOtpData((prev) => ({ ...prev, phoneNumber: data.phoneNumber }));
      console.log("OTP Sent for:", data.phoneNumber);
    });

    socket.on("otp_verified", (data) => {
      setVerified(true);
      setOtpData((prev) => ({ ...prev, isPhoneVerified: true }));
      console.log("OTP Verified for:", data.phoneNumber);
    });

    return () => {
      socket.off("otp_sent");
      socket.off("otp_verified");
    };
  }, [socket]);

  return (
    <OtpContext.Provider
      value={{
        otpData,
        setOtpData,
        resetOtpData,
        sendOtp,
        verifyOtp,
        registerPhoneUser,
        registerEmailUser,
        registerGoogleUser,
        checkUserExists,
        getUserByPhone,
        error,
        otpSent,
        verified,
        // AUTH CONTEXT VALUES
        isLoggedIn,
        user,
        login,
        logout,
      }}
    >
      {children}
    </OtpContext.Provider>
  );
};

export default OtpContextProvider;
