// EventModal.js
import React, { useEffect, useState } from "react";
import {
  Modal,
  StyleSheet,
  Button,
  TextInput,
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Switch,
} from "react-native";
import { globalStyles } from "../styles/global.js";
import { Formik } from "formik";
import * as yup from "yup";
import { Picker } from '@react-native-picker/picker';
import axios from "axios";
import { BaseURL } from "../config";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const eventSchema = yup.object({
  work: yup.string().required(),
  company: yup.string().required(),
  structure: yup.string().required(),
  label: yup.string().required().min(4),
  description: yup.string().required().min(8),
  code: yup
    .string()
    .required()
    .test(
      "is required ",
      "Code must be a number of less than 6 digits",
      (val) => {
        return parseInt(val) > 0 && parseInt(val) < 999999;
      }
    ),
  location: yup.string().required().min(4),
  eventType: yup.string().required(),
});

const EventModal = ({ modalOpen, setModalOpen }) => {
  const { authToken } = useContext(AuthContext);
  const [work, setWork] = useState(null);
  const [eventT, setEventT] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
  }, []);

  useEffect(() => {
  }, []);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    if (!isEnabled) {
      setEventStatus(null);
    }
  };

  const eventType = [1, 2, 3, 4, 5, 6];
  const workarray = [1, 2, 3, 4, 5];
  const companyarray = [1, 2, 3, 4, 5];
  const structurearray = [1, 2, 3, 4, 5];
  const eventStatus = ["fixed", "discovered", "mid-way"];

  const addEvent = async (values) => {
    axios
      .post(
        "http://192.168.0.44:8000/api/events/create/",
        {
          work: { id: values.work },
          event_type: { id: values.eventType },
          event_status: "Status of the event",
          event_duration: "2 days",
          event_causes: [{ id: 1 }],
          code: values.code,
          label: values.label,
          start_date: "2024-03-05",
        },
        {
          headers: {
            Authorization: `Bearer ${authToken.access}`,
          },
        }
      )
      .then((res) => {
        console.log(`response${res}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalOpen}
      onRequestClose={() => {
        setModalOpen(false);
      }}
    >
      <TouchableWithoutFeedback>
        <View style={globalStyles.modalContent}>
          <Text style={globalStyles.modalTitle}>Add Event</Text>
          <ScrollView>
            <Formik
              initialValues={{
                work: null,
                company: null,
                structure: null,
                label: "",
                description: "",
                code: "",
                location: "",
                eventType: null,
              }}
              validationSchema={eventSchema}
              onSubmit={(values, actions) => {
                addEvent(values);
                actions.resetForm();
                setModalOpen(false);
              }}
            >
              {(props) => (
                <View>
                  <Text style={globalStyles.label}>Work</Text>
                  <Picker
                    style={globalStyles.input}
                    selectedValue={props.values.work}
                    onValueChange={(value) => {
                      if (value !== null) {
                        props.handleChange("work")(value);
                      }
                    }}
                  >
                    <Picker.Item
                      label="Select Work"
                      value={null}
                      enabled={false}
                    />
                    {workarray.map((item, index) => {
                      return (
                        <Picker.Item label={item} value={item} key={index} />
                      );
                    })}
                  </Picker>
                  <Text style={globalStyles.errorText}>
                    {props.touched.work && props.errors.work}
                  </Text>

                  <Text style={globalStyles.label}>company</Text>
                  <Picker
                    style={globalStyles.input}
                    selectedValue={props.values.company}
                    onValueChange={(value) => {
                      if (value !== null) {
                        props.handleChange("company")(value);
                      }
                    }}
                  >
                    <Picker.Item
                      label="Select company"
                      value={null}
                      enabled={false}
                    />
                    {companyarray.map((item, index) => {
                      return (
                        <Picker.Item label={item} value={item} key={index} />
                      );
                    })}
                  </Picker>
                  <Text style={globalStyles.errorText}>
                    {props.touched.company && props.errors.company}
                  </Text>

                  <Text style={globalStyles.label}>Structure</Text>
                  <Picker
                    style={globalStyles.input}
                    selectedValue={props.values.structure}
                    onValueChange={(value) => {
                      if (value !== null) {
                        props.handleChange("structure")(value);
                      }
                    }}
                  >
                    <Picker.Item
                      label="Select structure"
                      value={null}
                      enabled={false}
                    />
                    {structurearray.map((item, index) => {
                      return (
                        <Picker.Item label={item} value={item} key={index} />
                      );
                    })}
                  </Picker>
                  <Text style={globalStyles.errorText}>
                    {props.touched.structure && props.errors.structure}
                  </Text>

                  <Text style={globalStyles.label}>Code</Text>
                  <TextInput
                    style={globalStyles.input}
                    onChangeText={props.handleChange("code")}
                    onBlur={props.handleBlur("code")}
                    value={props.values.code}
                    keyboardType="numeric"
                  />
                  <Text style={globalStyles.errorText}>
                    {props.touched.code && props.errors.code}
                  </Text>

                  <Text style={globalStyles.label}>Label</Text>
                  <TextInput
                    style={globalStyles.input}
                    onChangeText={props.handleChange("label")}
                    onBlur={props.handleBlur("label")}
                    value={props.values.label}
                  />
                  <Text style={globalStyles.errorText}>
                    {props.touched.label && props.errors.label}
                  </Text>

                  <Text style={globalStyles.label}>Description </Text>
                  <TextInput
                    style={globalStyles.input}
                    multiline
                    onChangeText={props.handleChange("description")}
                    onBlur={props.handleBlur("description")}
                    value={props.values.description}
                  />
                  <Text style={globalStyles.errorText}>
                    {props.touched.description && props.errors.description}
                  </Text>

                  <Text style={globalStyles.label}>Location </Text>
                  <TextInput
                    style={globalStyles.input}
                    onChangeText={props.handleChange("location")}
                    onBlur={props.handleBlur("location")}
                    value={props.values.location}
                  />
                  <Text style={globalStyles.errorText}>
                    {props.touched.location && props.errors.location}
                  </Text>

                  <Text style={globalStyles.label}>Event Type </Text>
                  <Picker
                    style={globalStyles.input}
                    selectedValue={props.values.eventType}
                    onValueChange={(value) => {
                      if (value !== null) {
                        props.handleChange("eventType")(value);
                      }
                    }}
                  >
                    <Picker.Item
                      label="Select Event Type"
                      value={null}
                      enabled={false}
                    />
                    {eventType.map((item, index) => {
                      return (
                        <Picker.Item label={item} value={item} key={index} />
                      );
                    })}
                  </Picker>
                  <Text style={globalStyles.errorText}>
                    {props.touched.eventType && props.errors.eventType}
                  </Text>

                  <View style={globalStyles.switchContainer}>
                    <Text style={globalStyles.switchLabel}>
                      Additional Information
                    </Text>
                    <Switch
                      trackColor={{ false: "#767577", true: "#81b0ff" }}
                      thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitch}
                      value={isEnabled}
                    />
                  </View>

                  {isEnabled && (
                    <>
                      <Text style={globalStyles.label}>Event Status</Text>
                      <Picker
                        style={globalStyles.input}
                        selectedValue={props.values.eventStatus}
                        onValueChange={(value) => {
                          if (value !== null) {
                            props.handleChange("eventStatus")(value);
                          }
                        }}
                      >
                        <Picker.Item
                          label="Select Event Status"
                          value={null}
                          enabled={false}
                        />
                        {eventStatus.map((item, index) => {
                          return (
                            <Picker.Item
                              label={item}
                              value={item}
                              key={index}
                            />
                          );
                        })}
                      </Picker>
                      <Text style={globalStyles.errorText}>
                        {props.touched.eventStatus && props.errors.eventStatus}
                      </Text>
                    </>
                  )}

                  <View style={globalStyles.buttonContainer}>
                    <Button
                      color="maroon"
                      title="Cancel"
                      onPress={() => {
                        props.resetForm();
                        setModalOpen(false);
                      }}
                    />
                    <Button
                      color="maroon"
                      title="Submit"
                      onPress={props.handleSubmit}
                    />
                  </View>
                  {/* Render your form fields here */}
                </View>
              )}
            </Formik>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default EventModal;
