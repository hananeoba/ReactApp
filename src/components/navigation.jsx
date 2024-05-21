//navigation
import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import { AuthContext } from "../contexts/AuthContext";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StatusBar } from "expo-status-bar";
import CustomDrawer from "./costumDrawer";
import ChangePassword from "../screens/ChangePassword";
import EventScreen from "../screens/EventScreen";
import Notifications from "../screens/Notifications";
import { globalColors } from "../styles/global";
import MainHome from "../screens/mainhome";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const Navigation = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <StatusBar style="auto" animated={true} />
      {isLoggedIn ? (
        <Drawer.Navigator
          drawerStyle={{
            backgroundColor: globalColors.primary,
            margin: 30,
          }}
          drawerContent={(props) => <CustomDrawer {...props} />}
          initialRouteName="mainhome"
          screenOptions={{
            headerStyle: {
              backgroundColor: globalColors.primary,
            },
            headerTintColor: globalColors.secondary,
            headerTitleStyle: {
              fontWeight: "bold",
              alignContent: "center",
              textAlign: "center",
            },
          }}
        >
          {/* <Drawer.Screen
            name="Home"
            component={HomeScreen}
          /> */}
          <Drawer.Screen
            name="mainhome"
            component={MainHome}
            options={{
              title: "Home",
              headerTitleStyle: {
                fontWeight: "bold",
                alignContent: "center",
                textAlign: "center",
              },
            }}
          />
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
