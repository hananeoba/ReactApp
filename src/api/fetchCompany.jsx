import axios from "axios";
import { BaseURL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { decode } from "base-64";
import AuthContext from "../contexts/AuthContext";
global.atob = decode;


const  fetchCompany= async(props) =>{
  const {setCompanyArray}= useContext(AuthContext);
  await AsyncStorage.getItem("access").then((access)=>{
    axios.get(`${BaseURL}/api/basedata/company/all`,
    { 
    params:{
        activity_nature_id: props.activity_nature
    },
    headers: {  
        Authorization: `Bearer ${access}`,
    },
})
    .then((response) => {
      const companyArray = response.data.map((company) => {
        return {
          key: company.id,
          value: company.label,
        };
      });
      console.log(companyArray);
      setCompanyArray(companyArray);
      console.log(companyArray);
      return response.data
    })
    .catch((error) => {
      alert(`Error fetching company: ${error}`);
    });
  }).catch((err)=>{
    alert(`${err} could not find token `)
  });
}
export {fetchCompany};