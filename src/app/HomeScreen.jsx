import React, { useContext } from "react";
import { View, Text, Button, StyleSheet, ImageBackground } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { AuthContext } from "../contexts/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import LinearGradient from "../components/LinearGradient";
import { useState, useEffect } from "react";
import { BaseURL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Fetching data using Axios in React Native
import axios from "axios";
import ChartComponent from "../components/chart";
import LoginScreen from "./LoginScreen";
import fetchWork from "../api/fetchWork";

export default function HomeScreen() {
  // Fetch events this week
  const {
    isLoading,
    authUser,
    authToken,
    setIsLoading,
    isLoggedIn,
    checkStorageToken,
  } = useContext(AuthContext);
  const [eventWeek, setEventWeek] = useState([]);
  const [eventMonth, setEventMonth] = useState([]);
  const [token, setToken] = useState({});
  const [countw, setCountW] = useState(0);
  const [countm, setCountM] = useState(0);
  let result = { acess: null, refresh: null };
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await AsyncStorage.getItem("access")
        .then(async (value) => {
          if (value !== null) {
            setToken(value);
            try {
              const response = await axios.get(
                `${BaseURL}/api/events/by-week/`,
                {
                  headers: {
                    Authorization: `Bearer ${value}`,
                  },
                }
              );

              if (response.data) {
                const eventCounts = response.data.map((event) => event.count);
                setEventWeek(eventCounts);
                setIsLoading(false);
              } else {
                // If response.data is falsy or empty, set event counts to zero for each week
                setEventWeek([null, null, null, null, null, null, null]);
                setIsLoading(false);
              }
            } catch (error) {
              console.error("Error fetching week data:", error);
              setIsLoading(false);
            }
          }
        })
        .catch((error) => {
          alert("Token not found", error);
        });
    };
    setCountW(
      eventWeek.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      )
    );
    fetchData();
  }, [isLoggedIn]);

  useEffect(() => {
    const fetchMonthData = async () => {
      await AsyncStorage.getItem("access")
        .then(async (value) => {
          setToken(value);
          try {
            const response = await axios.get(
              `${BaseURL}/api/events/by-month/`,
              {
                headers: {
                  Authorization: `Bearer ${value}`,
                },
              }
            );

            if (response.data) {
              const eventCounts = response.data.map((event) => event.count);
              setEventMonth(eventCounts);
              setIsLoading(false);
            } else {
              // If response.data is falsy or empty, set event counts to zero for each week
              setEventMonth([
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
              ]);
              setCountM(null);
              setIsLoading(false);
            }
          } catch (error) {
            console.error("Error fetching month data:", error);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          alert("Token not found", error);
        });
    };
    fetchMonthData();
  }, []);

  // Fetch events this year by month
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  useEffect(() => {
    setCountW(
      eventWeek.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      )
    );
    setCountM(
      eventMonth.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      )
    );
  }, [eventWeek, eventMonth]);

  return (
    <View style={styles.container}>
      <LinearGradient>
        <Spinner
          visible={isLoading}
          textContent={"Loading..."}
          textStyle={{ color: "#FFF" }}
        />
        <SafeAreaView style={styles.content}>
          <Text style={styles.greetingText}>Events this week: {countw}</Text>
          <ChartComponent datata={eventWeek} labels={days} />
          <Text style={styles.greetingText}>Events this year: {countm}</Text>
          <ChartComponent datata={eventMonth} labels={months} />
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
  },
  greetingText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#FFF",
    margin: 30,
  },
});
