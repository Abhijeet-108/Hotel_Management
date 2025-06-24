// userContext.jsx
import React, { createContext, useState, useContext } from "react";

export const UserDataContext = createContext();

// Exported hook
export const useUserData = () => {
  return useContext(UserDataContext);
};

const UserContext = ({ children }) => {
  const [user, setUser] = useState({
    phone: {
      countryCode: "+91",
      phoneNumber: "" // IMPORTANT: Initialize as an empty string
    },
    fullname: "",
    email: "",
    password: "",
  });

  return (
    <UserDataContext.Provider value={{ user, setUser }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContext;
