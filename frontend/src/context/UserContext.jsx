import React, { createContext, useState, useContext } from "react";

export const UserDataContext = createContext();

const UserContext = ({ children }) => {
  const [userData, setUserData] = useState({
    phone: {
      countryCode: "+91",
      phoneNumber: "" 
    },
    fullName: "",
    email: "",
    password: "",
  });

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContext;
