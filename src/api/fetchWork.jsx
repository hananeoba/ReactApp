import axios from "axios";
import { BaseURL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useState } from "react";
import { decode } from "base-64";
import AuthContext from "../contexts/AuthContext";

const fetchWork = async (props) => {
  await AsyncStorage.getItem("access")
    .then((access) => {
      try{
      const response = axios.get(`${BaseURL}/api/basedata/work/all`, {
        params: {
          installation_id: props.installation,
        },
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });

      const workArray = response.data.map((company) => {
        return {
          key: company.id,
          value: company.label,
        };
        setWorkArray(workarray)
      });
    }
    catch{

    }}
  )
  
};
export { fetchWork };
