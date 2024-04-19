import axios from "axios";
import { useState, useEffect, createContext } from "react";
import { StyleSheet } from "react-native";
import React from "react";
import { BaseURL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { decode } from "base-64";
global.atob = decode;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setUser] = useState({});
  const [authToken, setAuthToken] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn,setIsLoggedIn]= useState(false);
  const checkStorageToken = async () => {
    try {
      const access = await AsyncStorage.getItem("access");
      const refresh = await AsyncStorage.getItem("refresh");
      if (access && refresh) {
        setIsLoggedIn(true);
        return(access)
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Error checking storage tokens:", error);
    }
  };

  useEffect(() => {
    checkStorageToken();
  }, []);


  const login = (user, password) => {
    setIsLoading(true);
    axios
      .post(`${BaseURL}/api/user/login/`, {
        user_name: user,
        password: password,
      })
      .then(async (response) => {
        const data = JSON.stringify(response.data.access);
        const user = jwtDecode(data);
        setUser(user);
        setAuthToken(response.data);
        const setToken = [
          ['refresh', response.data.refresh],
          ['access', response.data.access],
        ];
        await AsyncStorage.multiSet(setToken);
        checkStorageToken();
        setIsLoading(false);
      })
      .catch((error) => {
        alert(`LoginError: ${error}`);
        console.log(`loginError: ${error}`);
        setIsLoading(false);
      });
  };
  

  const logout = async () => {
    try {
      axios.post(`${BaseURL}/api/user/logout/`, {
        refresh: authToken.refresh,
      });
      await AsyncStorage.multiRemove(['refresh', 'access']);
      setUser({});
      setAuthToken({});
      checkStorageToken();
    } catch (error) {
      alert(`LogoutError: ${error}`);
    }
  };
  data ={
    login,
    logout,
    setIsLoading,
    setIsLoggedIn,
    checkStorageToken,
    isLoading,
    isLoggedIn,
    authToken,
    authUser
  }

  return (
    <AuthContext.Provider
      value={data}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
