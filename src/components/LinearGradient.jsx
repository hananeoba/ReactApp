import React, { useContext } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View, ImageBackground } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { globalColors } from "../styles/global";
import NotificationModal from "../components/Notification_model";
import AuthContext from "../contexts/AuthContext";

const GradientBackground = ({ children }) => {
  const { isLoggedIn, isModalVisible, setIsModalVisible, notification } =
    useContext(AuthContext);
  return (
    //<ImageBackground #cdb4db source#abc4ff={require('../assets/background.png')} style={styles.gradient}>
    <LinearGradient
      colors={["white", "white"]}
      style={styles.gradient}
    >
      {isLoggedIn && (
        <NotificationModal
          notification={notification}
          isVisible={isModalVisible}
          setIsVisible={setIsModalVisible}
        />
      )}

      {children}
    </LinearGradient>
    //</ImageBackground>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    padding: 10,
  },
  content: {
    flex: 1,
    padding: 10,
    alignContent: "center", // Adjust padding as needed
  },
});

export default GradientBackground;
