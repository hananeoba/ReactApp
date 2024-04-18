import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const GradientBackground = ({ children }) => {
  return (
    <LinearGradient colors={["#cdb4db", "#abc4ff"]} style={styles.gradient}>
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 10,
    alignContent: "center", // Adjust padding as needed
  },
});

export default GradientBackground;
