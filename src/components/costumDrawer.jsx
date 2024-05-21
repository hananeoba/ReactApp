//costume Drawer
import React from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useContext } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { AuthContext } from "../contexts/AuthContext";
import EventModal from "./EventModal";
import { globalColors } from "../styles/global";

const CustomDrawer = (props) => {
  const { authUser, logout } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        style={{ padding: 0 }}
        contentContainerStyle={{ backgroundColor: globalColors.primary }}
      >
        <Text
          style={{
            color: globalColors.white,
            fontSize: 20,
            fontWeight: "bold",
            padding: 10,
          }}
        >
          Welcome {authUser.name}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              color: "#fff",
              padding: 20,
            }}
          >
           company: {authUser.company}--- structure: {authUser.structure}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: globalColors.white,
            paddingTop: 10,
          }}
        >
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 7, borderTopWidth: 1, borderTopColor: "#ccc" }}>
        <TouchableOpacity
          onPress={() => {
            logout();
          }}
          style={{ paddingVertical: 15 }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="exit-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
              }}
            >
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
