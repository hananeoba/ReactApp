// EventScreen.js
import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import EventModal from "../components/EventModal"; // Assuming the EventModal component is in the same directory
import LinearGradient from "../components/LinearGradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import { globalColors, globalStyles } from "../styles/global";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { BaseURL } from "../config";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";

const EventScreen = () => {
  const [eventsArray, setEventsArray] = useState([
    {
      id: 1,
      code: "Event 1",
      label: "event1 ",
      start_date: "2021-09-01",
      created_by: "Admin",
    },
  ]);
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
              setEventsArray(eventsarray);
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
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent:"space-between" }}>
          <Text style={globalStyles.title}>Event Screen</Text>
          <View >
          <TouchableOpacity 
          style={{
            backgroundColor:globalColors.primary,
            justifyContent:"center",
            alignItems:"center",
            borderRadius:20,
            padding:10,
          }}
           onPress={() => setModalOpen(true)}>
            <Ionicons name="add" size={30} color="white" />
            <Text style={{
              color:"white"
            }}>
              Add new Event
            </Text>
          </TouchableOpacity>
          </View>
        </View>
        <ScrollView
        style={{
        marginBottom:60,
      }}>
        {eventsArray.map((event) => (
          <EventCard
            code={event.code}
            created_by={event.created_by}
            start_date={event.start_date}
            event_status={event.event_status}
            key={event.id}
          />
         
        ))}
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
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default EventScreen;

const EventCard = (props) => {
  return (
    <>
      <View style={globalStyles.carts}>
        <Text style={globalStyles.title}>{props.code}</Text>
        <Text style={globalStyles.text}>
          event:{props.code} is created by user {props.created_at} 
          
        </Text>
        <Text>
        at {props.start_date}
          with status: {props.event_status}
        </Text>
      </View>
    </>
  );
};
