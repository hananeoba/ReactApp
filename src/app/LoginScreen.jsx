import React, { useState, useContext } from "react";
import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import Spinner from "react-native-loading-spinner-overlay";
import LinearGradient from "../components/LinearGradient";
import axios from "axios";

const LoginScreen = ({ navigation }) => {
  const [user_name, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, setIsLoading, login } = useContext(AuthContext);

  return (
    <LinearGradient>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spinner
          visible={isLoading}
          textContent={"Loading..."}
          textStyle={{ color: "#FFF" }}
        />
        <View style={styles.container}>
          <Text style={styles.text}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            keyboardType="email-address"
            onChangeText={(text) => setUserName(text)}
          />
          <Text style={styles.text}>Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => login("user", "1234")}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 10,
    width: 200,
    backgroundColor: "#FFF", // Optional: Add a background color to input fields
    borderRadius: 10, // Optional: Add border radius for input fields
  },
  button: {
    backgroundColor: "#9b5de5",
    padding: 10,
    margin: 15,
    width: 200,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  text: {
    color: "#FFF",
    fontSize: 16,
    marginBottom: 5,
  },
});

export default LoginScreen;
