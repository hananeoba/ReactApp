import React from "react";
import { Text, TextInput } from "react-native";
import { useFormikContext } from "formik";
import { globalStyles } from "../styles/global";
const MyDateTimePicker = ({ fieldName }) => {
  const { setFieldValue, values, errors, touched } = useFormikContext();

  const handleChange = (event, selectedDate) => {
    // Update the field value when DateTimePicker value changes
    setFieldValue(fieldName, selectedDate || values[fieldName]);
  };

  return (
    ({setFieldValue, values, errors, touched})=>{
        <>
      <Text style={globalStyles.label}>Start Date</Text>
      <RNDateTimePicker
        mode="time"
        value={values[fieldName] || new Date()}
        onChange={handleChange}
      />
      <TextInput
        style={globalStyles.input}
        onChangeText={props.handleChange(fieldName)}
        onBlur={props.handleBlur(fieldName)}
        value={props.values[fieldName]}
      />
      <Text style={globalStyles.errorText}>
        {touched[fieldName] && errors[fieldName]}
      </Text>
    </>
    }
    
  );
};

export default MyDateTimePicker;
