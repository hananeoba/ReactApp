import { View, Text, TextInput, TouchableOpacity,StyleSheet, Button, Alert  } from "react-native";
import React ,{ useState, useContext }from "react";
import HomeScreen from "./HomeScreen";

const LoginScreen = () => {
  const [user_name, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser]= useState("")
  const [isLogedIn, setIsLogedIN] = useState(false);

  const checkUser = async (email, password) => {
    try {
      console.log("checkUser");
      const response = await fetch("http://localhost:8000/api/user/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: user_name,
          password: password,
        }),
      });
      console.log('Response status:', response.status);
      const responseData = await response.json();
      console.log('Response data:', responseData);
      
      if (response.ok) {
        setUser(responseData); // Assuming responseData is the user object
        setIsLogedIN(true);
      } else {
        Alert.alert('Login Error', responseData.detail);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Login Error', 'An error occurred. Please try again later.');
    }
  };
  

  
  return (
    <View style= {styles.container}>
     
      <Text>LoginScreen</Text>
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
      <Button title = "login " onPress={()=> checkUser(user_name,password)} />
        
    </View>
  );
};
const styles= StyleSheet.create({
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

