import { View, Text } from "react-native";
import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { globalStyles } from "../styles/global";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BaseURL } from "../config";
import { AuthContext } from "../contexts/AuthContext";
import NotificationModel from "../components/Notification_model";
import { ScrollView } from "react-native-gesture-handler";

const Notifications = () => {
  const { logout, notification } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const fetchNotifications = async () => {
    await AsyncStorage.getItem("access")
      .then((access) => {
        axios
          .get(`${BaseURL}/api/notifications/get_notifications/`, {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          })
          .then((response) => {
            setNotifications(response.data);
          })
          .catch((error) => {
            if (error.response.status === 401) {
              logout();
            }
            console.log(error, "fetching notifications");
          });
      })
      .catch((error) => {
        console.log(error);
        logout();
      });
  };
  useEffect(() => {
    fetchNotifications();
  }, [notification]);

  return (
    <View
      style={{
        paddingVertical: 20,
        backgroundColor: "#fff",
      }}
    >
      <ScrollView>
        {notifications.map((notification) => (
          <NotificationCard
            title={notification.title}
            body={notification.description}
            event={notification.event}
            isRead={notification.is_read}
            key={notification.id}
          />
        ))}
      </ScrollView>
    </View>
  );
};
const NotificationCard = (props) => {
  return (
    <>
      <View style={globalStyles.carts}>
        <Text style={globalStyles.title}>{props.title}</Text>
        <Text style={globalStyles.text}>
          {props.body} is created by event id {props.event}
        </Text>
        <Text style={globalStyles.text}>
          {props.isRead ? "Read" : "Unread"}
        </Text>
      </View>
    </>
  );
};

export default Notifications;
