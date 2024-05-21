import { View, Text } from "react-native";
import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import Notifications from "./Notifications";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { globalColors } from "../styles/global";
import { AuthContext } from "../contexts/AuthContext";

const MainHome = () => {
  const Tab = createBottomTabNavigator();
  const { notification } = useContext(AuthContext);
  return (
    <Tab.Navigator
      options={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#AD40AF" },
        tabBarInactiveTintColor: "#fff",
        tabBarActiveTintColor: "yellow",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          //tabBarInactiveTintColor: "#fff",
          tabBarActiveTintColor: globalColors.secondary,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          headerShown: false,
          //tabBarInactiveTintColor: "#fff",
          tabBarActiveTintColor: globalColors.secondary,
          tabBarBadge: notification ? 1 : 0,
          tabBarBadgeStyle: {
            backgroundColor: notification ? globalColors.secondary : "#fff",
            color: globalColors.primary,
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainHome;
