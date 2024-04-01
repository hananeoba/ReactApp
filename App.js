import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./src/app/HomeScreen";
import LoginScreen from "./src/app/LoginScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider } from "./src/contexts/AuthContext";
import { Navigation } from "./src/components/navigation";
import 'react-native-gesture-handler';
export default function App() {
  return (
    <AuthProvider>
      <Navigation />
      
    </AuthProvider>
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
