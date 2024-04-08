import { Picker } from "@react-native-picker/picker";
import React from "react";
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

const eventSchema = yup.object({
  work: yup.string().required(),
  company: yup.string().required(),
  structure: yup.string().required(),
  label: yup.string().required().min(4),
  description: yup.string().required().min(8),
  code: yup
    .string()
    .required()
    .test("is required ", "Code must be a number of 6 digits", (val) => {
      return parseInt(val) > 100000 && parseInt(val) < 999999;
    }),
  location: yup.string().required().min(4),
  eventType: yup.string().required(),
});

export default function EventModal({ modalOpen, setModalOpen, addEvent }) {
  const workarray = ["work", "school", "personal", "other"];
  const structurearray = ["structure", "flexible", "hybrid", "other"];
  const companyarray = ["company", "google", "microsoft", "amazon", "other"];
  const eventStatus = ["status1", "status2", "status3", "other"];

  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    if (!isEnabled) {
      setEventStatus(null);
      setEventDuration(null);
      setEventCause(null);
    }
  };
  
  const eventType = [
    "eventType",
    "meeting",
    "presentation",
    "interview",
    "other",
  ];

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
                  

                  <View style={styles.switchContainer}>
                    <Text style={styles.switchLabel}>Additional Information</Text>
                    <Switch
                      trackColor={{false: '#767577', true: '#81b0ff'}}
                      thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitch}
                      value={isEnabled}
                    />
                  </View>

                  {isEnabled && ( 
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
                        <Picker.Item label={item} value={item} key={index} />
                      );
                    })}
                  </Picker>
                  <Text style={globalStyles.errorText}>
                    {props.touched.eventStatus && props.errors.eventStatus}
                  </Text>
              )}
      

                  <View style={globalStyles.buttonContainer}>
                    <Button
                      color="maroon"
                      title="Cancel"
                      onPress={() => setModalOpen(false)}
                    />
                    <Button
                      color="maroon"
                      title="Submit"
                      onPress={props.handleSubmit}
                    />
                  </View>
                </View>
              )}
            </Formik>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
