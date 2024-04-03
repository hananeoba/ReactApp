import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  TextInput,
  Text,
  StatusBar,
  Touchable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native-gesture-handler";

const EventScreen = () => {
  const [company, setCompany] = useState("");
  const [event, setEvent] = useState("");

  return (
    <LinearGradient colors={["#76c893", "#d9ed92"]} style={styles.gradient}>
      <SafeAreaView style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={company}
            onChangeText={setCompany}
            placeholder="Company"
            autoCorrect={false}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            value={event}
            onChangeText={setEvent}
            placeholder="Event"
            autoCorrect={false}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.container2}>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.text}>Add Event</Text>
        </TouchableOpacity>
        </View>
        <Text style={styles.text}>Company: {company}</Text>
        <Text style={styles.text}>Event: {event}</Text>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    paddingTop: StatusBar.currentHeight,
    justifyContent: "",
  },
  container2:{
    justifyContent: "center",
    alignItems: "center",
  },
  gradient: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#7a42f4",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: "#FFF", // Optional: Add a background color to input fields
  },
  text: {
    paddingHorizontal: 20,
    fontSize: 18,
    margin: 10,
    color: "#FFF", // Set text color to white
  },
  button: {
    backgroundColor: "#9b5de5",
    width: 300,
    borderRadius: 10,
    alignItems: "center",
    
  },
});

export default EventScreen;
