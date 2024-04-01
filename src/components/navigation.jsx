import React from "react";
import { useContext } from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../app/HomeScreen";
import LoginScreen from "../app/LoginScreen";
import { AuthContext } from "../contexts/AuthContext";
import { createDrawerNavigator } from "@react-navigation/drawer";
import EventScreen from "../app/EventScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Navigation = () => {
  const {authToken} = useContext(AuthContext);
  return (
    <NavigationContainer>
    {authToken ? (
      <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen
            name="Home"
            component={HomeScreen}
            options={{}}
          />
          <Drawer.Screen
            name="Events"
            component={EventScreen}
            options={{ }}
          />

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
