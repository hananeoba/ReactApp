import axios from "axios";
import { useState, useEffect, createContext } from "react";
import React from "react";
import { BaseURL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import {decode} from 'base-64';
global.atob = decode;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setUser] = useState({});
  const [authToken, setAuthToken] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const login = (user, password) => {
    setIsLoading(true);
    axios
      .post(`${BaseURL}/api/user/login/`, {
        user_name: user,
        password: password,
      })
      .then((response) => {
        data= JSON.stringify(response.data.access);
        user= (jwtDecode(data)) ;
        setUser(user);
        setAuthToken(response.data);
        AsyncStorage.setItem("authToken", JSON.stringify(authToken));
        setIsLoading(false);
      })
      .catch((error) => {
        alert("Invalid credentials");
        console.log(`RegisterError: ${error}`);
        setIsLoading(false);
      });
  };
  const logout = () => {
    axios.post(`${BaseURL}/api/user/logout/`,{refresh:authToken.refresh})
    .then((response) => {
      console.log(" response", response.status);
      AsyncStorage.removeItem("authToken");
      setUser({});
      setAuthToken(null);
    })
    .catch((error) => {
      alert("Logout failed", error);
      console.log(`LogoutError: ${error}`);
    });
    
  };


  return (
    <AuthContext.Provider value={{ login, logout, setIsLoading, isLoading, authToken, authUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
