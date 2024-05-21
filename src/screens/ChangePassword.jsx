//change Password 
import LinearGradient from "../components/LinearGradient";
import React, { useContext } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BaseURL } from "../config";
import { AuthContext } from "../contexts/AuthContext";


const ChangePassword = () => {
  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
  const validationSchema = Yup.object({
    currentPassword: Yup.string().required("Required"),
    newPassword: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{15,})/,
      "Must Contain 15 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ).required("Required"),
    confirmPassword: Yup.string()
      .required("Required")
      .test("password-match", "password must match ", function (value) {
        return this.parent.newPassword === value;
      }),
  });
  const {logout}= useContext(AuthContext);

  const ChangePassword = async (currentPassword,newPassword, confirmPassword ) => {
    
    await AsyncStorage.getItem("access").then(async (val) => {
      try {
        const response = await axios({
          method: "PATCH",
          url: `${BaseURL}/api/user/update/password/`,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${val}`,
          },
          data: {
            password: currentPassword,
            new_password:newPassword,
            confirm_password:confirmPassword

          },
        })
          .then((value) => {
            alert(`${value.data.message}`);
            logout();
          })
          .catch((err) => {
            alert(err);
          });
      } catch (error) {
        alert(`Error changing password: ${error}`);
      }
    });
  };

  return (
    <LinearGradient>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={(values) => {
          cp=values.currentPassword;
          np=values.newPassword;
          cnp=values.confirmPassword;
          ChangePassword(cp,np,cnp);
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
              style={globalStyles.input}
            />
            <Text style={globalStyles.errorText}>{errors.currentPassword}</Text>
            <Text>new Password</Text>
            <TextInput
              onChangeText={handleChange("newPassword")}
              onBlur={handleBlur("newPassword")}
              placeholder="Enter your new password"
              secureTextEntry={true}
              style={globalStyles.input}
            />
            <Text style={globalStyles.errorText}>{errors.newPassword}</Text>
            <Text>confirm your new password</Text>
            <TextInput
              onChangeText={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
              placeholder="Confirm your new password"
              secureTextEntry={true}
              style={globalStyles.input}
            />
            <Text style={globalStyles.errorText}>{errors.confirmPassword}</Text>
            <TouchableOpacity onPress={handleSubmit} style={globalStyles.button}>
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
    padding:30,
    alignItems: "flex-start",
    justifyContent: "flex-start",
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
