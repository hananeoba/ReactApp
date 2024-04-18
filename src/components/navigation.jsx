import React, { useState, useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../app/HomeScreen";
import LoginScreen from "../app/LoginScreen";
import { AuthContext } from "../contexts/AuthContext";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StatusBar } from "expo-status-bar";
import CustomDrawer from "./costumDrawer";
import ChangePassword from "../app/ChangePassword";
import EventScreen from "../app/EventScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const Navigation = () => {
  const { authToken, isLoggedIn} = useContext(AuthContext);



  return (
    <NavigationContainer>
      <StatusBar style="auto" animated={true} />
      {isLoggedIn ? (
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawer {...props} />}
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: "#cdb4db",
            },
            headerTintColor: "gray",
            headerTitleStyle: {
              fontWeight: "semibold",
              alignContent: "center",
              textAlign: "center",
            },
          }}
        >
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="ChangePassword" component={ChangePassword} />
          <Drawer.Screen name="EventScreen" component={EventScreen} />
        </Drawer.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export { Navigation };
