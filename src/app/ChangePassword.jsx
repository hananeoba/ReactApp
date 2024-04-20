import LinearGradient from "../components/LinearGradient";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { globalStyles } from "../styles/global";
import { Formik } from "formik";
import * as Yup from "yup";

const ChangePassword = () => {
  const initialValues = {
    currentPassword: "",
    newPssword: "",
    confirmPassword: "",
  };
  const validationSchema = Yup.object({
    currentPassword: Yup.string().required("Required"),
    newPassword: Yup.string()
      .required("Required")
      .min(15, "Must be atleast 15 charecters"),
    confirmPassword: Yup.string()
      .required("Required")
      .test("password-match", "password must match ", function(value){
        return this.parent.newPassword=== value
      }),
  });
  return (
    <LinearGradient>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View style={styles.container}>
            {/* Wrap everything inside a single View */}
            <Text>Change Password</Text>
            <TextInput
              onChangeText={handleChange("currentPassword")}
              onBlur={handleBlur("currentPassword")}
              placeholder="Enter your current password"
              secureTextEntry={true}
              style={styles.input}
            />
            <Text style={styles.errorText}>{errors.currentPassword}</Text>
            <Text>new Password</Text>
            <TextInput
              onChangeText={handleChange("newPassword")}
              onBlur={handleBlur("newPassword")}
              placeholder="Enter your new password"
              secureTextEntry={true}
              style={styles.input}
            />
            <Text style={styles.errorText}>{errors.newPassword}</Text>
            <Text>confirm your new password</Text>
            <TextInput
              onChangeText={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
              placeholder="Confirm your new password"
              secureTextEntry={true}
              style={styles.input}
            />
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Change Password</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
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
    padding: 10,
    fontSize: 18,
    borderRadius: 10,
    width: 300,
    borderWidth: 1,
    borderColor: "#777",
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
  errorText: {
    color: "crimson",
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 6,
    textAlign: "center",
    alignSelf: "center",
  },
});

export default ChangePassword;
