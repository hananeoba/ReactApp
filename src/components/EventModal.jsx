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
import { globalColors, globalStyles } from "../styles/global";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { BaseURL } from "../config";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import {
  SelectList,
  MultipleSelectList,
} from "react-native-dropdown-select-list";
import AsyncStorage from "@react-native-async-storage/async-storage";

const eventSchema = yup.object({
  work: yup.string().required(),
  description: yup.string().required(),
  eventType: yup.string().required(),
  start_date: yup.string().required(),
  causes: yup.array().required(),
});

const EventModal = ({ modalOpen, setModalOpen }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [user, setUser] = useState({});
  const [eventTArray, setEventTArray] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [installationArray, setInstallationArray] = useState([]);
  const [workArray, setWorkArray] = useState([]);
  const [causesArray, setCausesArray] = useState([]);
  const [causes, setCauses] = useState([]);
  const [causes2, setCauses2] = useState([]);
  const [isTouched, setIsTouched] = useState(false);
  const [openTimer, setOpenTimer] = useState(false);
  const { authUser } = useContext(AuthContext);

  const toggleDatePicker = () => {
    setIsTouched(!isTouched);
  };

  const addEvent = async (values) => {
    await AsyncStorage.getItem("access").then((access) => {
      axios
        .post(
          `${BaseURL}/api/events/create/`,
          {
            work: { id: parseInt(values.work) },
            event_type: { id: parseInt(values.eventType) },
            event_causes: causes2,
            start_date: values.start_date + "T" + values.start_date_time,
            event_description: values.event_description,
          },
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        )
        .then((res) => {
          alert(`response : ${JSON.stringify(res.data)}`);
        })
        .catch((error) => {
          alert(`from submitting error:, ${error}`);
        });
    });
  };

  const fetchCauses = async (event_t) => {
    await AsyncStorage.getItem("access").then(async (val) => {
      try {
        const response = axios({
          method: "GET",
          url: `${BaseURL}/api/basedata/causes/all/`,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${val}`,
          },
          data: {},
          params: {
            event_type_id: event_t,
          },
        })
          .then((response) => {
            const causesarray = response.data.map((causes) => {
              return {
                key: JSON.stringify(causes.id),
                value: causes.label,
              };
            });
            setCausesArray(causesarray);
          })
          .catch((err) => {
            alert(err);
          });
      } catch (error) {
        alert("Error fetching event type data:", error);
        setIsLoading(false);
      }
    });
  };
  const fetchUser = async () => {
    await AsyncStorage.getItem("access")
      .then(async (val) => {
        try {
          const response = axios.get(`${BaseURL}/api/user/get_user/`,{
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${val}`,
            },
          })

            .then((value) => {
              setUser(value.data);
            })
            .catch((err) => {
              alert(err);
            });
        } catch (error) {
          alert("Error fetching user data:", error);
        }
      })
    }

  const fetchWork = async (installation) => {
    await AsyncStorage.getItem("access")
      .then(async (val) => {
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
              installation_id: installation,
            },
          })
            .then((value) => {
              const workarray = value.data.map((work) => {
                return {
                  key: JSON.stringify(work.id),
                  value: work.label,
                };
              });
              setWorkArray(workarray);
            })
            .catch((err) => {
              alert(err);
            });
        } catch (error) {
          alert("Error fetching work data:", error);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        alert(`${err} from fetchWork`);
      });
  };

  const fetchinstallation = async (structure) => {
    await AsyncStorage.getItem("access")
      .then(async (val) => {
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
              structure_id: structure,
            },
          })
            .then((value) => {
              const installationarray = value.data.map((installation) => {
                return {
                  key: JSON.stringify(installation.id),
                  value: installation.label,
                };
              });
              setInstallationArray(installationarray);
            })
            .catch((err) => {
              alert(err);
            });
        } catch (error) {
          alert("Error fetching installation data:", error);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        alert(`${err} from fetchInstallation`);
      });
  };
  const fetchEventT = async (company) => {
    await AsyncStorage.getItem("access")
      .then(async (val) => {
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
              company_id: company,
            },
          }).then((value) => {
            const eventTarray = value.data.map((eventT) => {
              return {
                key: JSON.stringify(eventT.id),
                value: eventT.label,
              };
            });
            setEventTArray(eventTarray);
          });
        } catch (error) {
          alert("Error fetching event type data:", error);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        alert(`${err} from fetchEventT`);
      });
  };
  useEffect(() => {
    fetchUser();
    fetchWork("");
    fetchinstallation(authUser.structure);
    console.log(authUser.structure_id);
    fetchEventT(authUser);
    fetchCauses("");
  }, []);

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
          <ScrollView
            style={{
              flex: 1,
              width: "95%",
              //paddingVertical: 19,
            }}
          >
            <Formik
              initialValues={{
                work: null,
                eventType: null,
                causes: [{}],
                description: "",
                location: "",
                start_date: "",
                start_date_time: "",
              }}
              validationSchema={eventSchema}
              onSubmit={(values, actions) => {
                setIsLoading(true);
                addEvent(values);
                actions.resetForm();
                actions.setSubmitting(false);
                setModalOpen(false);
              }}
            >
              {(props) => (
                <View>
                  <Text style={globalStyles.label}>Start Date</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      flex: 1,
                    }}
                  >
                    {isTouched && (
                      <DateTimePicker
                        mode="date"
                        display="spinner"
                        value={startDate}
                        onChange={({ type }, currentDate) => {
                          if (type === "set") {
                            props.handleChange("start_date")(
                              currentDate.toISOString().split("T")[0]
                            );
                            if (Platform.OS === "android") {
                              setIsTouched(false);
                              setOpenTimer(true);
                            }
                          } else {
                            toggleDatePicker();
                          }
                        }}
                      />
                    )}
                    {!isTouched && (
                      <Pressable
                        style={globalStyles.input}
                        onPress={() => {
                          toggleDatePicker();
                        }}
                      >
                        <TextInput
                          style={{
                            fontSize: 18,
                          }}
                          placeholder={startDate.toISOString().split("T")[0]}
                          onChangeText={() => {
                            props.handleChange("start_date");
                          }}
                          onBlur={() => {
                            props.handleBlur("start_date");
                          }}
                          value={startDate.toISOString().split("T")[0]}
                          editable={false}
                        />
                      </Pressable>
                    )}
                    {openTimer && (
                      <DateTimePicker
                        mode="time"
                        display="spinner"
                        value={startDate}
                        onChange={({ type }, currentDate) => {
                          if (type === "set") {
                            props.handleChange("start_date_time")(
                              currentDate.toISOString().split("T")[1]
                            );
                            setOpenTimer(false);
                          } else {
                            setOpenTimer(false);
                          }
                        }}
                      />
                    )}
                    {!isTouched && (
                      <Pressable
                        style={globalStyles.input}
                        onPress={() => {
                          setOpenTimer(true);
                        }}
                      >
                        <TextInput
                          style={{
                            fontSize: 18,
                          }}
                          placeholder={startDate.toISOString().split("T")[1]}
                          onChangeText={() => {
                            props.handleChange("start_date_time");
                          }}
                          onBlur={() => {
                            props.handleBlur("start_date_time");
                          }}
                          value={startDate.toISOString().split("T")[1]}
                          editable={false}
                        />
                      </Pressable>
                    )}
                  </View>
                  <Text style={globalStyles.errorText}>
                    {props.errors["start_date_time"]}
                  </Text>
                  <Text style={globalStyles.label}>Installation</Text>
                  <SelectList
                    boxStyles={globalStyles.input}
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
                    boxStyles={globalStyles.input}
                    setSelected={(val) => props.handleChange("work")(val)}
                    data={workArray}
                    save="key"
                  />
                  <Text style={globalStyles.errorText}>
                    {props.touched.work && props.errors.work}
                  </Text>

                  <Text style={globalStyles.label}>Event Type </Text>
                  <SelectList
                    boxStyles={globalStyles.input}
                    setSelected={(val) => {
                      props.handleChange("eventType")(val);
                    }}
                    data={eventTArray}
                    save="key"
                  />
                  <Text style={globalStyles.errorText}>
                    {props.touched.eventType && props.errors.eventType}
                  </Text>
                  <Text style={globalStyles.label}>Event Causes </Text>
                  <MultipleSelectList
                    badgeStyles={{
                      backgroundColor: globalColors.primary,
                    }}
                    boxStyles={globalStyles.input}
                    setSelected={(val) => {
                      setCauses(val);
                    }}
                    onSelect={() => {
                      console.log(causes);
                      setCauses2(
                        causes.map((val) => {
                          return { id: val };
                        })
                      );
                      console.log(causes2);
                    }}
                    data={causesArray}
                    save="key"
                    label="causes"
                  />
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

                  <View style={globalStyles.buttonContainer}>
                    <Pressable
                      color={globalColors.primary}
                      onPress={() => {
                        props.resetForm();
                        setCauses([]);
                        setCauses2([]);
                        setModalOpen(false);
                      }}
                    >
                      <Text
                        style={{
                          color: globalColors.light,
                          padding: 10,
                          margin: 10,
                          backgroundColor: globalColors.primary,
                          borderRadius: 10,
                        }}
                      >
                        Cancel
                      </Text>
                    </Pressable>
                    <Pressable
                      color={globalColors.primary}
                      title="Submit"
                      onPress={props.handleSubmit}
                    >
                      <Text
                        style={{
                          color: globalColors.light,
                          padding: 10,
                          margin: 10,
                          backgroundColor: globalColors.primary,
                          borderRadius: 10,
                        }}
                      >
                        Submit
                      </Text>
                    </Pressable>
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
