import axios from "axios";
import { BaseURL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { decode } from "base-64";
global.atob = decode;

export default  async function  fetchWork(props) {
  const [token, setToken]= useState("");
  await AsyncStorage.getItem("access").then((access)=>{
    setToken(access)
  }).catch((err)=>{
    alert(`${err} could not find token `)
  })
  if (props.company) {
    axios.get(`${BaseURL}/api/basedata/work/all`,
        { 
        params:{
            installation_id: props.installation
        },
        headers: {  
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
          console.log(response.data)
          return response.data
        })
        .catch((error) => {
          alert(`Error fetching work: ${error}`);
        });
  }
  else {
    axios.get(`${BaseURL}/api/basedata/work/all`,
        { 
        headers: {  
            Authorization: `Bearer ${token}`,
            },
    })
        .then((response) => {
          console.log(response.data)
          return response.data
        })
        .catch((error) => {
          alert(`Error fetching all work: ${error}`);
        });
  }
}
