// EventScreen.js
import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, TouchableOpacity , View} from "react-native";
import EventModal from "../components/EventModal"; // Assuming the EventModal component is in the same directory
import LinearGradient from "../components/LinearGradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import { globalStyles } from "../styles/global";
import EventCard from "../components/EventCard";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EventScreen = () => {
  const [eventsArray, setEventsArray] = useState([]);
  useEffect(() => {
    const fetchevents = async () => {
      await AsyncStorage.getItem("access").then(async (val) => {
        try {
          axios(`${BaseURL}/api/basedata/get_events/`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${val}`,
            },
          })
            .then((value) => {
              const eventsarray = value.data
              setEventsArray(eventsarray);
            })
            .catch((err) => {
              alert(err);
            });
        } catch (error) {
          alert("Error fetching events data:", error);
          setIsLoading(false);
        }
      });
    };
    fetchevents();
  },[]);
  const [modalOpen, setModalOpen] = useState(false);

  // Function to add event
  const addEvent = (eventData) => {
    // Implement your logic to add the event here
    console.log("Added event:", eventData);
  };

  return (
    <LinearGradient>
      <SafeAreaView>
        <View
          style={{ flexDirection: "row", alignItems: "space-arround" }}
        >
          <Text style={globalStyles.title}>Event Screen</Text>
          <TouchableOpacity onPress={() => setModalOpen(true)}>
            <Ionicons name="add" size={30} color="black" />
          </TouchableOpacity>
        </View>
        {eventsArray.map((event) => (
          <EventCard event={event} />
        ))}
        <EventModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default EventScreen;
