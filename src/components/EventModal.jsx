// EventModal.js
import React, { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
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
  Pressable,
  Switch,
  Platform,
} from "react-native";
import { globalStyles } from "../styles/global";
import { Formik } from "formik";
import * as yup from "yup";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { BaseURL } from "../config";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { SelectList } from "react-native-dropdown-select-list";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyDateTimePicker from "./dateTimePicker";

const eventSchema = yup.object({
  work: yup.string().required(),
  company: yup.string().required(),
  structure: yup.string().required(),
  installation: yup.string().required(),
  label: yup.string().required().min(4),
  description: yup.string().required().min(8),
  code: yup.string().required().max(6),
  //location: yup.string().required().min(4),
  eventType: yup.string().required(),
  start_date: yup.string().required(),
});

const EventModal = ({ modalOpen, setModalOpen }) => {
  const { authToken } = useContext(AuthContext);
  const [startDate, setStartDate] = useState(new Date());
  const [date, setDate]=  useState("" );
  const [eventTArray, setEventTArray] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnabled, setIsEnabled] = useState(false);
  const [companyArray, setCompanyArray] = useState([]);
  const [structureArray, setStructureArray] = useState([]);
  const [installationArray, setInstallationArray] = useState([]);
  const [workArray, setWorkArray] = useState([]);
  const [causesArray, setCausesArray] = useState([]);
  const [isTouched, setIsTouched] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    if (!isEnabled) {
     
    }
  };
  const toggleDatePicker = () => {
    setIsTouched(!isTouched);
  };

  const eventType = [1, 2, 3, 4, 5, 6];
  const eventStatus = ["fixed", "discovered", "mid-way"];
  const formatDate =(rawDate)=>{
    let Date = new Date(rawDate);
    let Year = Date.getFullYear();
    let Month = Date.getMonth()+1;
    let Day = Date.getDay();
    return `${Year}-${Month}-${Day}`

  }


  const addEvent = async (values) => {
    await AsyncStorage.getItem("access").then((access) => {
      axios
        .post(
          `${BaseURL}/api/events/create/`,
          {
            work: { id: parseInt(values.work)},
            event_type: { id: parseInt(values.eventType) },
            event_status: "Status of the event",
            event_duration: values.event_duration,
            event_causes: [{ id: 1 }],
            code: values.code,
            label: values.label,
            start_date: date,
            event_description: values.event_description,
          },
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        )
        .then((res) => {
          console.log(`response${res}`);
        })
        .catch((error) => {
          console.log(" from submitting form", JSON.stringify(error));
        });
    });
  };
  const fetchEventT=async(props)=>{
    await AsyncStorage.getItem("access").then(async (val) => {
      try {
        const response = axios({
          method: "GET",
          url: `${BaseURL}/api/basedata/event_type/all/`,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${val}`,
          },
          data: {},
          params: {
            company_id: props.company,
          },
        }).then((value) => {
          const eventTarray = value.data.map((eventT) => {
            return {
              key: JSON.stringify(eventT.id),
              value: eventT.label,
            };
          });
          console.log(eventTarray ,"this is response");
          setEventTArray(eventTarray);
          console.log(eventTArray, "this is the array ");
        });
      } catch (error) {
        console.error("Error fetching event type data:", error);
        setIsLoading(false);
      }
    });
  }
  const fetchWork = async (props) => {
    await AsyncStorage.getItem("access").then(async (val) => {
      try {
        const response = axios({
          method: "GET",
          url: `${BaseURL}/api/basedata/work/all/`,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${val}`,
          },
          data: {},
          params: {
            installation_id: props.installation,
          },
        }).then((value) => {
          const workarray = value.data.map((work) => {
            return {
              key: JSON.stringify(work.id),
              value: work.label,
            };
          });
          console.log(workarray);
          setWorkArray(workarray);
          console.log(workArray);
        });
      } catch (error) {
        console.error("Error fetching work data:", error);
        setIsLoading(false);
      }
    });
  };

  const fetchStructure = async (props) => {
    await AsyncStorage.getItem("access").then(async (val) => {
      try {
        const response = axios({
          method: "GET",
          url: `${BaseURL}/api/basedata/structure/all/`,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${val}`,
          },
          data: {},
          params: {
            company_id: props.company,
          },
        }).then((value) => {
          const structurearray = value.data.map((structure) => {
            return {
              key: JSON.stringify(structure.id),
              value: structure.label,
            };
          });
          console.log(structurearray);
          setStructureArray(structurearray);
          console.log(structureArray);
        });
      } catch (error) {
        console.error("Error fetching structure data:", error);
        setIsLoading(false);
      }
    });
  };
  const fetchinstallation = async (props) => {
    await AsyncStorage.getItem("access").then(async (val) => {
      try {
        const response = axios({
          method: "GET",
          url: `${BaseURL}/api/basedata/installation/all/`,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${val}`,
          },
          data: {},
          params: {
            structure_id: props.structure,
          },
        }).then((value) => {
          const installationarray = value.data.map((installation) => {
            return {
              key: JSON.stringify(installation.id),
              value: installation.label,
            };
          });
          console.log(installationarray);
          setInstallationArray(installationarray);
          console.log(installationArray);
        });
      } catch (error) {
        console.error("Error fetching installation data:", error);
        setIsLoading(false);
      }
    });
  };
  useEffect(() => {
    const fetchCompany = async () => {
      await AsyncStorage.getItem("access").then(async (val) => {
        try {
          const response = await axios
            .get(`${BaseURL}/api/basedata/company/all/`, {
              headers: {
                Authorization: `Bearer ${val}`,
              },
            })
            .then((res) => {
              const companyArray = res.data.map((company) => {
                return {
                  key: JSON.stringify(company.id),
                  value: company.label,
                };
              });
              console.log(companyArray);
              setCompanyArray(companyArray);
              console.log(companyArray);
            });
        } catch (error) {
          console.error("Error fetching company data:", error);
          setIsLoading(false);
        }
      });
    };

    fetchCompany();
    fetchStructure("");
    fetchWork("");
    fetchinstallation("");
    fetchEventT("");
  }, []);
  useEffect(() => {}, []);

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
                eventType: null,
                label: "",
                description: "",
                code: "",
                location: "",
                start_date: "",
                eventStatus: "",
                event_duration: "",
              }}
              validationSchema={eventSchema}
              onSubmit={(values, actions) => {
                console.log("submitted");
                addEvent(values);
               actions.resetForm();
                actions.setSubmitting(false)
                setModalOpen(false);
              }}
            >
              {(props) => (
                <View>
                  <Text style={globalStyles.label}>Code</Text>
                  <TextInput
                    style={globalStyles.input}
                    onChangeText={props.handleChange("code")}
                    onBlur={props.handleBlur("code")}
                    value={props.values.code}
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

                  <Text style={globalStyles.label}>Company</Text>
                  <SelectList
                    setSelected={(val) => {
                      props.handleChange("company")(val);
                      fetchStructure(parseInt(val));
                      fetchEventT(parseInt(val))
                    }}
                    data={companyArray}
                    save="key"
                  />
                  <Text style={globalStyles.errorText}>
                    {props.touched.company && props.errors.company}
                  </Text>


                  <Text style={globalStyles.label}>Event Type </Text>
                  <SelectList
                    setSelected={(val) => {
                      props.handleChange("eventType")(val);
                      
                    }}
                    data={eventTArray}
                    save="key"
                  />
                  <Text style={globalStyles.errorText}>
                    {props.touched.eventType && props.errors.eventType}
                  </Text>
                  

                  <Text style={globalStyles.label}>Structure</Text>
                  <SelectList
                    setSelected={(val) => {
                      props.handleChange("structure")(val);
                      fetchinstallation(parseInt(val));
                    }}
                    data={structureArray}
                    save="key"
                  />
                  <Text style={globalStyles.errorText}>
                    {props.touched.structure && props.errors.structure}
                  </Text>
                  <Text style={globalStyles.label}>Installation</Text>
                  <SelectList
                    setSelected={(val) => {
                      props.handleChange("installation")(val);
                      fetchWork(parseInt(val));
                    }}
                    data={installationArray}
                    save="key"
                  />
                  <Text style={globalStyles.errorText}>
                    {props.touched.installation && props.errors.installation}
                  </Text>
                  <Text style={globalStyles.label}>Work</Text>
                  <SelectList
                    setSelected={(val) => props.handleChange("work")(val)}
                    data={workArray}
                    save="key"
                  />
                  <Text style={globalStyles.errorText}>
                    {props.touched.work && props.errors.work}
                  </Text>


                  <Text style={globalStyles.label}>Start Date</Text>
                  {isTouched && (
                    <DateTimePicker
                      mode="date"
                      display="spinner"
                      value={startDate}
                      onChange={({ type }, currentDate) => {
                        if (type === "set") {
                          console.log("the time ");
                          setStartDate(currentDate);
                          setDate(currentDate.toISOString().split('T')[0]);
                          props.handleChange("start_date")(currentDate.toString())
                          console.log("start date  ", startDate);
                          if (Platform.OS === "android") {
                            console.log(props.values);
                            setIsTouched(false);
                          }
                        } else {
                          toggleDatePicker();
                        }
                      }}
                    />
                  )}
                  {!isTouched && (
                    <Pressable
                      onPress={() => {
                        toggleDatePicker();
                      }}
                    >
                      <TextInput
                        style={globalStyles.input}
                        placeholder={startDate.toString()}
                        onChangeText={() => {props.handleChange("start_date");}}
                        onBlur={() => {props.handleBlur("start_date");
                        }}
                        value={startDate.toString()}
                        editable={false}
                      />
                    </Pressable>
                  )}
                  <Text style={globalStyles.errorText}>
                    {props.errors["start_date"]}
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
                      onPress={()=>
                        {props.handleSubmit()}
                        
                      }
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
