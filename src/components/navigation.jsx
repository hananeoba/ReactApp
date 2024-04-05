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
import { StatusBar } from 'expo-status-bar';
import CustomDrawer from "./costumDrawer";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Navigation = () => {
  const { authToken } = useContext(AuthContext);
  return (
    <NavigationContainer>
      <StatusBar style="auto"  animated = {true}/>
      {authToken ? (
        <Drawer.Navigator
         drawerContent={props => <CustomDrawer {...props} />}
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: "#cdb4db"
              },
            headerTintColor: "gray",
            headerTitleStyle: {
              fontWeight: "semibold",
              alignContent:"center",
              textAlign:"center",
              backgroundColor:"linear-gradient(direction, color-stop1, color-stop2)"
            },
            style: {
              backgroundColor: "linear-gradient(to right, ff5858,ff5858)"
            },
          }}
        >
          <Drawer.Screen name="Home" component={HomeScreen} options={{}} />
          <Drawer.Screen
            name="Add Events"
            component={EventScreen}
            options={{}}
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
