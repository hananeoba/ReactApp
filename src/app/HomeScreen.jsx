import React, { useContext } from "react";
import { View, Text, Button, StyleSheet, ImageBackground } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { AuthContext } from "../contexts/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import EventModal from "../components/EventModal";

export default function HomeScreen() {
  const { isLoading, authUser, logout } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
        <LinearGradient
          colors={["#cdb4db","#abc4ff"]} // Adjust opacity and colors as needed
          style={styles.overlay}
        >
          <Spinner
            visible={isLoading}
            textContent={"Loading..."}
            textStyle={{ color: "#FFF" }}
          />
          <SafeAreaView style={styles.content}>
            <Text style={styles.greetingText}>Hello: {authUser.name}</Text>
            <Button title="add event" onPress={() => setModalVisible(true)} />
            <EventModal visible={modalVisible} onClose={() => setModalVisible(false)} />
          </SafeAreaView>
        </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    //backgroundColor: "transparent",
    //justifyContent: "center",
    //alignItems: "center",
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
