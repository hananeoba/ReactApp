import { View, Text } from "react-native";
import React from "react";
import { globalStyles } from "../styles/global";

const EventCard = ({ event }) => {
  return (
    <View>
      <Text>EventCard</Text>
      <Text style={globalStyles.title}>{event.label}</Text>
      <Text style={globalStyles.text}>
        started at:{event.start_date} by:{event.created_by} from:{event.work.label}
      </Text>
      <Text style={globalStyles.text}>description: {event.description}</Text>
    </View>
  );
};

export default EventCard;
