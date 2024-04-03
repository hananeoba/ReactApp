import React, { useContext } from "react";
import { View, Text, Button, StyleSheet, ImageBackground } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { AuthContext } from "../contexts/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeScreen() {
  const { isLoading, authUser, logout } = useContext(AuthContext);
  return (
    <View style={styles.container}>
        <LinearGradient
          colors={["#abc4ff", "#edf2fb"]} // Adjust opacity and colors as needed
          style={styles.overlay}
        >
          <Spinner
            visible={isLoading}
            textContent={"Loading..."}
            textStyle={{ color: "#FFF" }}
          />
          <SafeAreaView style={styles.content}>
            <Text style={styles.greetingText}>Hello: {authUser.name}</Text>
            <Button title="Logout" onPress={() => logout()} />
          </SafeAreaView>
        </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  greetingText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#FFF",
  },
});
