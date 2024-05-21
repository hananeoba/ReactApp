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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [lastNotificationId, setLastNotificationId] = useState(null);
  const [notificationOpen, setNotificationOpen] = useState(null);
  const [notification, setNotification] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      const updateToken = async () => {
        try {
          console.log("updating ...");
          setIsLoading(true);
          await AsyncStorage.getItem("refresh")
            .then(async (refresh) => {
              await axios
                .post(`${BaseURL}/api/user/token/refresh/`, {
                  refresh: refresh,
                })
                .then(async (response) => {
                  const data = JSON.stringify(response.data.access);
                  const user = jwtDecode(data);
                  setUser(user);
                  setAuthToken(response.data);
                  const setToken = [
                    ["refresh", response.data.refresh],
                    ["access", response.data.access],
                  ];
                  await AsyncStorage.multiSet(setToken);
                  setIsLoading(false);
                  console.log("Token updated successfully!");
                })
                .catch((err) => {
                  alert(`${err.message}while refreshing token from server`);
                  logout();
                  clearInterval();
                  setIsLoading(false);
                });
            })
            .catch((error) => {
              alert(`${error} while getting refresh token from asyncStorage`);
              logout();
              clearInterval();
              setIsLoading(false);
            });
        } catch (error) {
          alert(`Updating error: ${error}`);
          console.log(`Updating token error: ${error}`);
          logout();
          clearInterval();
          setIsLoading(false);
        }
      };

      const startTokenUpdateInterval = () => {
        updateToken();

        const interval = setInterval(async () => {
          await updateToken();
        }, 3 * 60 * 60 * 1000); // 3 hours * 60 minutes * 60 seconds * 1000 milliseconds

        return interval;
      };

      const tokenUpdateInterval = startTokenUpdateInterval();
    }
  }, [isLoggedIn]);

  const checkStorageToken = async () => {
    try {
      const access = await AsyncStorage.getItem("access");
      const refresh = await AsyncStorage.getItem("refresh");
      if (access && refresh) {
        setIsLoggedIn(true);
        return access;
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
  useEffect(() => {
    let threehours = 1000 * 60 * 60 * 3;

    let interval = setInterval(() => {}, threehours);
    return () => clearInterval(interval);
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
          ["refresh", response.data.refresh],
          ["access", response.data.access],
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
      await AsyncStorage.multiRemove(["refresh", "access"]).then(() => {
        setUser({});
        setAuthToken({});
        setIsLoggedIn(false);
        checkStorageToken();
      });
    } catch (error) {
      alert(`LogoutError: ${error}`);
    }
  };

  const checkNotification = async () => {
    await AsyncStorage.getItem("access")
      .then(async (access) => {
        await axios
          .get(`${BaseURL}/api/notifications/get_new_notification/`, {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          })
          .then(async (notification) => {
            const lastNotificationId = await AsyncStorage.getItem(
              "lastNotificationId"
            );
            const notificationId = notification.data.id.toString();
            console.log(notification.data.id, lastNotificationId);
            if (notificationId !== lastNotificationId) {
              AsyncStorage.setItem("lastNotificationId", notificationId);
              setIsModalVisible(true);
              setNotification(notification.data);
              console.log("New notification fetched:", notification.data);
            } else {
              console.log("No new notifications");
              setNotification(null);
            }
          })
          .catch((error) => {
            console.error("Error fetching notifications:", error);
          });
      })
      .catch((error) => {
        alert("Error getting access token:", error);
      });
  };
  useEffect(() => {
    //checkNotification();
    setInterval(checkNotification, 10000); // Fetch every 10 seconds
  }, []);

  data = {
    login,
    logout,
    setIsLoading,
    setIsLoggedIn,
    checkStorageToken,
    checkNotification,
    isLoading,
    isLoggedIn,
    authToken,
    authUser,
    lastNotificationId,
    notification,
    isModalVisible,
    setIsModalVisible,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthContext;
