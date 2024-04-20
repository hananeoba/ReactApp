import axios from "axios";
import { BaseURL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { decode } from "base-64";
import AuthContext from "../contexts/AuthContext";
global.atob = decode;


const  fetchCompany= async(props) =>{
  const {setInstallationArray}= useContext(AuthContext);
  await AsyncStorage.getItem("access").then((access)=>{
    axios.get(`${BaseURL}/api/basedata/installation/all`,
    { 
    params:{
        structure_id: props.structure
    },
    headers: {  
        Authorization: `Bearer ${access}`,
    },
})
    .then((response) => {
      const installationArray = response.data.map((installation) => {
        return {
          key: installation.id,
          value: installation.label,
        };
      });
      console.log(installationArray);
      setInstallationArray(installationArray);
      console.log(installationArray);
      return response.data
    })
    .catch((error) => {
      alert(`Error fetching installation: ${error}`);
    });
  }).catch((err)=>{
    alert(`${err} could not find token `)
  });
}
export {fetchCompany};