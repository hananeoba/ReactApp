import axios from "axios";
import { BaseURL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { decode } from "base-64";
global.atob = decode;

import { View, Text } from "react-native";
import React from "react";

export default function fetchCauses(props) {
  if (props.company) {
    axios.get(`${BaseURL}/api/basedata/event_type/all`,
        { 
        params:{
            compant_id: props.company
        },
        headers: {  
            Authorization: `Bearer ${authToken.access}`,
        },
    })
        .then((response) => {
          console.log(response.data)
          return response.data
        })
        .catch((error) => {
          alert(`Error fetching causes: ${error}`);
        });
  }
  else {
    axios.get(`${BaseURL}/api/basedata/event_type/all`,
        { 
        headers: {  
            Authorization: `Bearer ${authToken.access}`,
            },
    })
        .then((response) => {
          console.log(response.data)
          return response.data
        })
        .catch((error) => {
          alert(`Error fetching causes: ${error}`);
        });
  }
}
