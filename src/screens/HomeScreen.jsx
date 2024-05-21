import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import Spinner from "react-native-loading-spinner-overlay";
import { AuthContext } from "../contexts/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import moment from "moment";
import LinearGradient from "../components/LinearGradient";
import { BaseURL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import ChartComponent from "../components/chart";
import { Formik } from "formik";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import { globalColors, globalStyles } from "../styles/global";
import * as yup from "yup";
import qs from "qs";
import NotificationModal from "../components/Notification_model";

export default function HomeScreen() {
  const {
    isLoading,
    setIsLoading,
    logout,
    isModalVisible,
    setIsModalVisible,
    notification,
    authUser,
  } = useContext(AuthContext);

  const [selectedStruct, setSelectedStruct] = useState([]);
  const [events, setEvents] = useState([]);
  const [eventMonth, setEventMonth] = useState([]);
  const [structureArray, setStructureArray] = useState([]);
  const [countm, setCountM] = useState(0);
  const [activeItem, setActiveItem] = useState({});

  const [startDate, setStartDate] = useState(new Date());
  const [isTouched, setIsTouched] = useState(false);
  const [isTouched2, setIsTouched2] = useState(false);

  useEffect(() => {
    const fetchStructChildren = async (company_id) => {
      setIsLoading(true);
      if (company_id === null) {
        await AsyncStorage.getItem("access")
          .then((access) => {
            axios
              .get(
                `${BaseURL}/api/basedata/structure/children_structures/all/`,
                {
                  params: { structure_id: authUser.structure },
                  headers: {
                    Authorization: `Bearer ${access}`,
                  },
                }
              )
              .then((response) => {
                setStructureArray(
                  response.data.map((item) => {
                    return {
                      key: item.id,
                      value: item.label,
                    };
                  })
                );
              })
              .catch((err) => {
                if (err.response.status === 401) {
                  logout();
                }
                console.log(`${err} while fetching structures`);
              });
          })
          .catch((err) => {
            alert(`${err}: while getting access token`);
          });
      } else {
        await AsyncStorage.getItem("access")
          .then((access) => {
            axios
              .get(`${BaseURL}/api/basedata/structures/all`, {
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  Authorization: `Bearer ${access}`,
                },
                params: { company_id: company_id },
              })
              .then((response) => {
                setStructureArray(
                  response.data.map((item) => ({
                    key: item.id,
                    value: item.label,
                  }))
                );
              })
              .catch((error) => {
                if (error.response.status === 401) {
                  logout();
                }
                console.log(`${error} while fetching structures`);
              });
          })
          .catch((error) => {
            alert(`${error}: while getting access token`);
            logout();
          });
      }
      setIsLoading(false);
    };
    fetchStructChildren(null);
  }, [authUser]);

  const getEventByDateRange = async (values) => {
    setIsLoading(true);
    try {
      const queryString = qs.stringify(
        {
          start_date: values.start_date,
          end_date: values.end_date,
          structure_ids: selectedStruct,
        },
        { arrayFormat: "repeat" }
      );
      console.log(queryString);
      await AsyncStorage.getItem("access").then((access) => {
        axios
          .get(`${BaseURL}/api/events/by-date-range/?${queryString}`, {
            params: {
              start_date: values.start_date,
              end_date: values.end_date,
              //structure_ids:values.structures,
            },
            headers: {
              Authorization: `Bearer ${access}`,
            },
          })
          .then((response) => {
            console.log(response.data);
            setEvents(response.data);
          })
          .catch((error) => {
            console.log(`error from getEventByDateRange: ${error}`);
          });
      });
    } catch (error) {
      alert(`"Error fetching data:", ${error}`);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const fetchMonthData = async () => {
      setIsLoading(true);
      await AsyncStorage.getItem("access")
        .then((access) => {
          axios
            .get(`${BaseURL}/api/events/by-month/`, {
              headers: {
                Authorization: `Bearer ${access}`,
              },
            })
            .then((response) => {
              setEventMonth(response.data);
              setIsLoading(false);
            })
            .catch((error) => {
              if (error.response.status === 401) {
                logout();
              }
              alert("Error fetching month data:", JSON.stringify(error));
              setIsLoading(false);
            });
        })
        .catch((error) => {
          alert(`${error}: while getting access token`);
          logout();
        });
    };
    fetchMonthData();
  }, []);

  const validationSchema = yup.object({
    start_date: yup.string().required("Required"),
    end_date: yup.string().required("Required"),
    //structures: yup.array().min(1, "Please select at least one structure"),
  });

  useEffect(() => {
    setCountM(
      eventMonth
        .map((event) => event.count)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    );
  }, [eventMonth]);

  const oneWeekBeforeToday = moment().subtract(7, "days").toDate();
  const today = moment().toDate();

  return (
    <LinearGradient>
      <Spinner
        visible={isLoading}
        textContent={"Loading..."}
        textStyle={{ color: "#4f44b6" }}
      />
      <NotificationModal
        notification={notification}
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
      />
      <Text style={styles.greetingText}>Welcome to the Home Screen</Text>
      <Formik
        initialValues={{
          start_date: moment().subtract(7, "days").format("YYYY-MM-DD"),
          end_date: moment().format("YYYY-MM-DD"),
          structures: selectedStruct,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(JSON.stringify(values));
          getEventByDateRange(values);
          setSelectedStruct([null]);
        }}
      >
        {(props) => (
          <>
            <MultipleSelectList
              badgeStyles={{
                color: globalColors.tertiary,
                backgroundColor: globalColors.primary,
                marginTop: 13,
              }}
              boxStyles={globalStyles.input}
              setSelected={(val) => {
                setSelectedStruct(val);
                console.log(`${selectedStruct} selected`);
              }}
              placeholder="Choose your Structure"
              data={structureArray}
              save="key"
              label="Structures"
            />
            <Text style={globalStyles.errorText}>
              {props.errors.structures}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {isTouched && (
                <DateTimePicker
                  mode="date"
                  display="spinner"
                  maximumDate={oneWeekBeforeToday}
                  value={startDate}
                  onChange={(event, selectedDate) => {
                    if (event.type === "set") {
                      props.setFieldValue(
                        "start_date",
                        moment(selectedDate).format("YYYY-MM-DD")
                      );
                      setIsTouched(false);
                    } else {
                      setIsTouched(false);
                    }
                  }}
                />
              )}
              {!isTouched && (
                <Pressable
                  onPress={() => {
                    setIsTouched(true);
                  }}
                >
                  <TextInput
                    style={globalStyles.rowinput}
                    placeholder={props.values.start_date}
                    value={props.values.start_date}
                    editable={false}
                  />
                </Pressable>
              )}
              {props.errors.start_date && props.touched.start_date && (
                <Text style={globalStyles.errorText}>
                  {props.errors.start_date}
                </Text>
              )}
              {isTouched2 && (
                <DateTimePicker
                  mode="date"
                  display="spinner"
                  maximumDate={today}
                  value={startDate}
                  onChange={(event, selectedDate) => {
                    if (event.type === "set") {
                      props.setFieldValue(
                        "end_date",
                        moment(selectedDate).format("YYYY-MM-DD")
                      );
                      setIsTouched2(false);
                    } else {
                      setIsTouched2(false);
                    }
                  }}
                />
              )}
              {!isTouched2 && (
                <Pressable
                  onPress={() => {
                    setIsTouched2(true);
                  }}
                >
                  <TextInput
                    style={globalStyles.rowinput}
                    placeholder={props.values.end_date}
                    value={props.values.end_date}
                    editable={false}
                  />
                </Pressable>
              )}
              {props.errors.end_date && props.touched.end_date && (
                <Text style={globalStyles.errorText}>
                  {props.errors.end_date}
                </Text>
              )}
              <Pressable
                onPress={() => {
                  props.handleSubmit();
                }}
              >
                <Ionicons
                  name="search"
                  size={30}
                  color={globalColors.primary}
                />
              </Pressable>
            </View>
            <SafeAreaView style={styles.content}>
              <ScrollView>
                <View style={globalStyles.carts}>
                  <Text style={globalStyles.title}>
                    Events this year: {countm}
                  </Text>
                  <ChartComponent
                    datata={eventMonth.map((item) => item.count)}
                    labels={eventMonth.map((item) => item.month)}
                  />
                </View>
                <View>
                  {Array.isArray(events) && events.length > 0 ? (
                    events.map((eventData, index) => (
                      <View key={index} style={globalStyles.carts}>
                        <Text style={globalStyles.title}>
                          Events for Structure :{eventData.structure_code}
                        </Text>
                        {eventData && eventData.events.length > 0 ? (
                          <ChartComponent
                            datata={eventData.events.map((item) => item.count)}
                            labels={eventData.events.map((item) => item.day)}
                          />
                        ) : (
                          <Text>No events found</Text>
                        )}
                      </View>
                    ))
                  ) : (
                    <Text>No events to display</Text>
                  )}
                </View>
                {/* {events.map((eventData, index) => (
                  <View key={index} style={globalStyles.carts}>
                    <Text style={globalStyles.title}>
                      Events for Structure{" "}
                      {
                        structureArray.find(
                          (s) => s.key === props.values.structures[index]
                        )?.value
                      }
                      :
                    </Text>
                    {eventData[0] && eventData[0].events.length > 0 ? (
                      <ChartComponent
                        datata={eventData[0].events.map((item) => item.count)}
                        labels={eventData[0].events.map((item) => item.day)}
                      />
                    ) : (
                      <Text>No events found</Text>
                    )}
                  </View>
                ))} */}
              </ScrollView>
            </SafeAreaView>
          </>
        )}
      </Formik>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
  },
  greetingText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: globalColors.secondary,
    margin: 30,
  },
});
