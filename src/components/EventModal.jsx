import React, { useState } from 'react';
import { View, Modal, Button, TextInput, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const EventModal = ({ visible, onClose }) => {
  const [step, setStep] = useState(1);
  const [eventName, setEventName] = useState('');
  const [eventWork, setEventWork] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventType, setEventType] = useState('');
  const [eventStatus, setEventStatus] = useState('');
  const [eventDuration, setEventDuration] = useState('');
  const [eventCauses, setEventCauses] = useState('');
  const [errors, setErrors] = useState({});

  const validateFields = (step) => {
    const errors = {};
    if (step === 1)
    { if (!eventName.trim()) {
        errors.eventName = 'Event Name is required';
      }
      if (!eventWork) {
        errors.eventWork = 'Work is required';
      }
      if (!eventDescription.trim()) {
        errors.eventDescription = 'Event Description is required';
      }
      if (!eventLocation.trim()) {
        errors.eventLocation = 'Event Location is required';
      }
      setErrors(errors);
      return Object.keys(errors).length === 0;
    }
    if (step === 2)
    {
        if (!eventType) {
        errors.eventType = 'Event Type is required';
      }
      if (!eventStatus.trim()) {
        errors.eventStatus = 'Event Status is required';
      }
      if (!eventDuration.trim()) {
        errors.eventDuration = 'Event Duration is required';
      }
      if (!eventCauses.trim()) {
        errors.eventCauses = 'Event Causes are required';
      }
      setErrors(errors);
      return Object.keys(errors).length === 0;
    }
  };

  const handleNextStep = () => {
    if (validateFields(step)) {
      setStep(step + 1);
    }
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    if (validateFields(step)) {
      console.log({
        eventName,
        eventWork,
        eventDescription,
        eventLocation,
        eventType,
        eventStatus,
        eventDuration,
        eventCauses,
      });
      setEventCauses('');
      setEventDescription('');
      setEventDuration('');
      setEventLocation('');
      setEventName('');
      setEventStatus('');
      setEventType('');
      setEventWork('');
      setStep(1);
       onClose();
    }
     
  };

  return (
    <Modal visible={visible} animationType="slide" transparent= {true} >
      <View style={styles.container}>
        {step === 1 && (
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Event Name"
              value={eventName}
              onChangeText={setEventName}
            />
            {errors.eventName && <Text style={styles.errorText}>{errors.eventName}</Text>}
            <Picker
              style={styles.input}
              selectedValue={eventWork}
              onValueChange={(itemValue) => setEventWork(itemValue)}
            >
              <Picker.Item label="Select Work" value="" />
              <Picker.Item label="Electrical Engineer" value="Electrical Engineer" />
              <Picker.Item label="Mechanical Engineer" value="Mechanical Engineer" />
            </Picker>
            {errors.eventWork && <Text style={styles.errorText}>{errors.eventWork}</Text>}
            <TextInput
              style={styles.input}
              placeholder="Event Description"
              value={eventDescription}
              onChangeText={setEventDescription}
            />
            {errors.eventDescription && <Text style={styles.errorText}>{errors.eventDescription}</Text>}
            <TextInput
              style={styles.input}
              placeholder="Event Location"
              value={eventLocation}
              onChangeText={setEventLocation}
            />
            {errors.eventLocation && <Text style={styles.errorText}>{errors.eventLocation}</Text>}
            <Button title="Cancel" onPress={onClose} />
            <Button title="Next" onPress={handleNextStep} />
            <Button title="Submit" onPress={handleSubmit} />
          </View>
        )}
        {step === 2 && (
          <View style={styles.formContainer}>
            <Picker
              style={styles.input}
              selectedValue={eventType}
              onValueChange={(itemValue) => setEventType(itemValue)}
            >
              <Picker.Item label="Select Type" value="" />
              <Picker.Item label="Type 1" value="Type 1" />
              <Picker.Item label="Type 2" value="Type 2" />
              <Picker.Item label="Type 3" value="Type 3" />
            </Picker>
            {errors.eventType && <Text style={styles.errorText}>{errors.eventType}</Text>}
            <TextInput
              style={styles.input}
              placeholder="Event Status"
              value={eventStatus}
              onChangeText={setEventStatus}
            />
            {errors.eventStatus && <Text style={styles.errorText}>{errors.eventStatus}</Text>}
            <TextInput
              style={styles.input}
              placeholder="Event Duration"
              value={eventDuration}
              onChangeText={setEventDuration}
            />
            {errors.eventDuration && <Text style={styles.errorText}>{errors.eventDuration}</Text>}
            <TextInput
              style={styles.input}
              placeholder="Event Causes"
              value={eventCauses}
              onChangeText={setEventCauses}
            />
            {errors.eventCauses && <Text style={styles.errorText}>{errors.eventCauses}</Text>}
            <Button title="Previous" onPress={handlePreviousStep} />
            <Button title="Submit" onPress={handleSubmit} />
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  formContainer: {
    width: '90%',
    paddingHorizontal: 20,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
  },
  input: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default EventModal;
