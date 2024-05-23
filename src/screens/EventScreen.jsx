// EventScreen.js
import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import EventModal from "../components/EventModal"; // Assuming the EventModal component is in the same directory
import LinearGradient from "../components/LinearGradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import { globalStyles } from "../styles/global";
import EventCard from "../components/EventCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BaseURL } from "../config";
import axios from "axios";

const EventScreen = () => {
  const [eventsArray, setEventsArray] = useState([
    {
      id: 1,
      code: "Event 1",
      label: "event1 ",
      start_date: "2021-09-01",
      created_by: "Admin",
      work: {
        label: "Work 1",
      },
      description: "This is event 1",
    },
  ]);
  let event = [];
  useEffect(() => {
    const fetchevents = async () => {
      await AsyncStorage.getItem("access").then(async (access) => {
        try {
          axios
            .get(`${BaseURL}/api/events/get_events/`, {
              headers: {
                Authorization: `Bearer ${access}`,
              },
            })
            .then((value) => {
              const eventsarray = value.data;
              event = eventsArray;
              setEventsArray(eventsarray);
              //console.log("Events data fetched successfully:", eventsArray);
            })
            .catch((err) => {
              console.log(`Error fetching events data: ${err}`);
              alert(err);
            });
        } catch (error) {
          console.log(`Error fetching events data: ${error}`);
          alert("Error fetching events data:", error);
        }
      });
    };
    fetchevents();
  }, []);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <LinearGradient>
      <SafeAreaView>
        <View style={{ flexDirection: "row", alignItems: "space-arround" }}>
          <Text style={globalStyles.title}>Event Screen</Text>
          <TouchableOpacity onPress={() => setModalOpen(true)}>
            <Ionicons name="add" size={30} color="black" />
          </TouchableOpacity>
        </View>
        {/*eventsArray.map((events, index) => (
          <>
            <Text>EventCard</Text>
            <Text style={globalStyles.title}>{event.code}</Text>
            <Text style={globalStyles.text}>
              started at:{event.start_date} by:{event.created_by} from:
              {event.work}
            </Text>
            <Text style={globalStyles.text}>
              description: {event.description}
            </Text>
          </>
        ))*/}
        <EventModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default EventScreen;
