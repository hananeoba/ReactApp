import axios from "axios";
import { BaseURL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { decode } from "base-64";
global.atob = decode;

const fetchStructure= async (props) =>{
  await AsyncStorage.getItem("access").then((access)=>{
    if (props.installation) {
      axios.get(`${BaseURL}/api/basedata/structure/all`,
          { 
          params:{
              installation_id: props.installation
          },
          headers: {  
              Authorization: `Bearer ${access}`,
          },
      })
          .then((response) => {
            console.log(response.data)
            return response.data
          })
          .catch((error) => {
            alert(`Error fetching structure: ${error}`);
          });
    }
  }).catch((err)=>{
    alert(`${err} could not find token `)
  })
}
 export  {fetchStructure};