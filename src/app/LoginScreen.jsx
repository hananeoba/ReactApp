import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
  Alert,
} from "react-native";
import React, { useState, useContext } from "react";
import HomeScreen from "./HomeScreen";
import { AuthContext } from "../contexts/AuthContext";
import Spinner from "react-native-loading-spinner-overlay";

const LoginScreen = ({ navigation }) => {
  const [user_name, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const {login, isLoading} = useContext(AuthContext);

  return (
    <View style={styles.container}>

      <Spinner visible={isLoading} textContent={"Loading..."} textStyle={{color: "#FFF"}} />
      <Text>user_name</Text>
      <TextInput
        style={styles.input}
        placeholder="user_name"
        keyboardType="email-address"
        onChangeText={(text) => setUserName(text)}
      />
      <Text>Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="login " onPress={() => {login(user_name, password)}} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 10,
    width: 200,
  },
});

export default LoginScreen;
