import React, { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import EventModal from './EventModal'; // Assuming the EventModal component is in the same directory

const EventScreen = () => {
  const [modalOpen, setModalOpen] = useState(false);

  // Function to add event
  const addEvent = (eventData) => {
    // Implement your logic to add the event here
    console.log('Added event:', eventData);
  };

  return (
    <SafeAreaView>
      <Text>Event Screen</Text>
      <TouchableOpacity onPress={() => setModalOpen(true)}>
        <Text>Add Event</Text>
      </TouchableOpacity>
      
      {/* Render the EventModal component */}
      <EventModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        addEvent={addEvent}
      />
    </SafeAreaView>
  );
};

export default EventScreen;
