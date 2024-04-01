import { View, Text, Button } from "react-native";
import React from "react";
import Spinner from "react-native-loading-spinner-overlay";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";


export default function HomeScreen() {
  const { isLoading, authUser, logout } = useContext(AuthContext);
  return (
    
    <View>
      <Spinner
        visible={false}
        textContent={"Loading..."}
        textStyle={{ color: "#FFF" }}
      />
      <SafeAreaView >
      <Text style= {{
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
      }}>hello: {authUser.name}</Text>

      <Button title="Logout" onPress={() => {logout()}} />
      </SafeAreaView>
    </View>
  );
}
