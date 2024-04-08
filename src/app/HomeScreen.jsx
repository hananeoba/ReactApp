import React, { useContext } from "react";
import { View, Text, Button, StyleSheet, ImageBackground } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { AuthContext } from "../contexts/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect } from "react";
import EventModal from "../components/EventModal";

// Fetching data using Axios in React Native
import axios from "axios";

export default function HomeScreen() {
  // Fetch events this week
  const { isLoading, authUser, authToken , setIsLoading} = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);

  const [eventWeek, setEventWeek] = useState([]);
  const [eventMonth, setEventMonth] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://5d9e-105-103-174-82.ngrok-free.app/api/events/by-week/",
          {
            headers: {
              Authorization: `Bearer ${authToken.access}`,
            },
          }
        ); setIsLoading(false);
        console.log(response);
        setEventWeek(response.data);
       
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [isLoading]);

  // Fetch events this year by month

  
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#cdb4db", "#abc4ff"]} // Adjust opacity and colors as needed
        style={styles.overlay}
      >
        <Spinner
          visible={isLoading}
          textContent={"Loading..."}
          textStyle={{ color: "#FFF" }}
        />
        <SafeAreaView style={styles.content}>
          <Text style={styles.greetingText}>Hello: {authUser.name}</Text>
          <Text style={styles.greetingText}>
            <Text style={styles.greetingText}>
              Events this week: {eventWeek}
            </Text>
          </Text>
          <Button title="add event" onPress={() => setModalVisible(true)} />
          <EventModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
          />
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
