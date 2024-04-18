// EventScreen.js
import React, { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import EventModal from '../components/EventModal'; // Assuming the EventModal component is in the same directory
import LinearGradient from '../components/LinearGradient';


const EventScreen = () => {
  const [modalOpen, setModalOpen] = useState(false);

  // Function to add event
  const addEvent = (eventData) => {
    // Implement your logic to add the event here
    console.log('Added event:', eventData);
  };

  return (
    <LinearGradient>
    <SafeAreaView>

      <Text>Event Screen</Text>
      <TouchableOpacity onPress={() => setModalOpen(true)}>
        <Text>Add Event</Text>
      </TouchableOpacity>
      
      {/* Render the EventModal component */}
      <EventModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
    </SafeAreaView>
    </LinearGradient>
  );
};

export default EventScreen;
