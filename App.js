import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./app/HomeScreen";
import LoginScreen from "./app/LoginScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider } from "./contexts/AuthContext";
export default function App() {
  const stack = createNativeStackNavigator();
  return (
    <NavigationContainer>  
     <AuthProvider>
        <stack.Navigator>
          <stack.Screen name="login" component={LoginScreen} />
          <stack.Screen component={HomeScreen} name="home" />
        </stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
