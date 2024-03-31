import { useState, useEffect, createContext } from "react";
import React from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [isLogedIn, setIsLogedIN] = useState(false);

  const checkUser = async (email, password) => {
    
    try {console.log("checkUser");
      const response = await fetch("http://127.0.0.1:8000/api/user/users/", {
        method: "POST",
        headers: {
          //"Content-Type": "application/json",
        },
        body: {
          "user_name": email,
          "password": password,
        },
      });
      console.log('Response status:', response.status);
      const user = await response.json();
      console.log(user);
      if (response) {
        setUser(JSON.parse(user));
        setIsLogedIN(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const contextData = {
    checkUser: checkUser,
  };
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};


export default AuthContext;

