import axios from "axios";
import { useState, useEffect, createContext } from "react";
import * as TaskManager from "expo-task-manager";
import React from "react";
import { BaseURL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { decode } from "base-64";
import { registerIndieID, unregisterIndieDevice } from "native-notify";
import * as BackgroundFetch from "expo-background-fetch";

global.atob = decode;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setUser] = useState({});
  const [authToken, setAuthToken] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [lastNotificationId, setLastNotificationId] = useState(null);
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
              axios
                .post(`${BaseURL}/api/user/token/refresh/`, {
                  refresh: refresh,
                })
                .then(async (response) => {
                  const data = JSON.stringify(response.data.access);
                  const user = jwtDecode(data);
                  setUser(user);
                  registerIndieID(user.name, 21135, "QG1T2O5TtmkEISR9ted9aG");
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
                  alert(`${err.message} while refreshing token from server`);
                  logout();
                  clearInterval();
                  setIsLoading(false);
                });
            })
            .catch((error) => {
              alert(`${error} while getting refresh token from AsyncStorage`);
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
      console.log("Error checking storage tokens:", error);
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
        registerIndieID(user.name, 21135, "QG1T2O5TtmkEISR9ted9aG");
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

  async function unregisterBackgroundFetchAsync() {
    return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
  }

  const logout = async () => {
    try {
      await axios.post(`${BaseURL}/api/user/logout/`, {
        refresh: authToken.refresh,
      });
      await AsyncStorage.multiRemove(["refresh", "access"]).then(() => {
        setUser({});
        setAuthToken({});
        unregisterBackgroundFetchAsync();
        unregisterIndieDevice(
          authUser.name, // Correct user ID for unregistering
          21135,
          "QG1T2O5TtmkEISR9ted9aG"
        );
        setIsLoggedIn(false);
        checkStorageToken();
      });
    } catch (error) {
      alert(`LogoutError: ${error}`);
    }
  };

  const BACKGROUND_FETCH_TASK = "background-fetch-task";

  TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
    if (isLoggedIn) {
      await checkNotification();
    }
    return TaskManager.Result.NewData;
  });

  useEffect(() => {
    const configureBackgroundFetch = async () => {
      try {
        console.log("Background fetch task registered");
        await BackgroundFetch.registerTaskAsync("background-fetch-task", {
          minimumInterval: 15 * 60, // 15 minutes
          stopOnTerminate: false, // Continue background fetch even when the app is terminated
          startOnBoot: true, // Start background fetch on device boot
        });
        console.log("Background fetch task registered");
      } catch (error) {
        console.log("Failed to register background fetch task", error);
      }
    };

    if (isLoggedIn) {
      configureBackgroundFetch();
    }
  }, [isLoggedIn]);

  const setNotificationRead = async (access, notification) => {
    try {
      await axios
        .patch(
          `${BaseURL}/api/notifications/set_notification_read/`,
          {},
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
            params: {
              notification_id: notification.id,
            },
          }
        )
        .then(async (response) => {
          console.log("Notification read:", response.data);
        })
        .catch((error) => {
          console.log("Error fetching:", JSON.stringify(error));
        });
    } catch (error) {
      console.log("Error fetching notifications:", error);
    }
  };

  const checkNotification = async () => {
    try {
      await AsyncStorage.getItem("access")
        .then(async (access) => {
          if (!access) return;
          const user = jwtDecode(access);
          console.log(user.user_id);
          await axios
            .get(`${BaseURL}/api/notifications/get_new_notification/`, {
              headers: {
                Authorization: `Bearer ${access}`,
              },
            })
            .then(async (response) => {
              const notification = response.data;
              const notificationIdFromResponse = response.data.id.toString();
              const userNotification = notification.users.find(
                (userr) => userr.user === user.user_id
              );
              console.log(userNotification, "this is user notification");
              AsyncStorage.getItem("lastNotificationId").then(
                async (lastNId) => {
                  console.log(
                    notificationIdFromResponse !== lastNId &&
                      !userNotification.is_read
                  );

                  if (notificationIdFromResponse === lastNId) {
                    setNotification(null);
                    return;
                  } else if (
                    notificationIdFromResponse !== lastNId &&
                    !userNotification.is_read
                  ) {
                    AsyncStorage.setItem(
                      "lastNotificationId",
                      notificationIdFromResponse
                    );
                    setNotification(response.data);
                    console.log("Notification:", response.data);
                    try {
                      await axios
                        .post(
                          "https://app.nativenotify.com/api/indie/notification",
                          {
                            subID: user.name,
                            appId: 21135,
                            appToken: "QG1T2O5TtmkEISR9ted9aG",
                            dateSent: new Date().toISOString(),
                            title: response.data.title,
                            message: response.data.description,
                          }
                        )
                        .then((responsee) => {
                          console.log(
                            "Notification sent to indie:",
                            responsee.data
                          );
                        })
                        .catch((error) => {
                          console.log(
                            "Error sending notification to indie:",
                            error
                          );
                        });
                      console.log("notification is not read", access);
                      setNotificationRead(access, notification);
                    } catch (error) {
                      console.log(
                        "Error sending notification from the post notification:",
                        error
                      );
                    }
                  }
                }
              );
            })
            .catch((error) => {
              console.log("Error fetching:", JSON.stringify(error));
            });
        })
        .catch((TokenError) => {
          console.log("TokenError fetching notifications:", TokenError);
          logout();
        });
    } catch (error) {
      console.log("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    checkNotification();
    const intervalId = setInterval(checkNotification, 10000); // Fetch every 10 seconds
    return () => clearInterval(intervalId);
  }, []);

  const data = {
    login,
    logout,
    setIsLoading,
    setIsLoggedIn,
    checkStorageToken,
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
