import React, { createContext, useState, useContext, useEffect } from "react";
import jwtDecode from "jwt-decode"; // npm install jwt-decode

const AuthContext = createContext();

// Provider
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Check for stored JWT when app loads
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          setUser(decoded);
          setIsLoggedIn(true);
        } else {
          localStorage.removeItem("token");
        }
      } catch {
        localStorage.removeItem("token");
      }
    }
  }, []);

  const login = async (email, password) => {
    // Call your backend
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    },{
      withCredentials: true, 
    });
    if (!response.ok) {
      throw new Error("Invalid credentials");
    }
    const data = await response.json();
    const { token } = data;

    // Save token and set user
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);
    setUser(decoded);
    setIsLoggedIn(true);
  };
  
  const logout = async () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsLoggedIn(false);
  };
  
  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
