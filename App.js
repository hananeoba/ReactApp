import React,{useEffect} from "react";
import { AuthProvider } from "./src/contexts/AuthContext";
import { Navigation } from "./src/components/navigation";
import "react-native-gesture-handler";
import registerNNPushToken from "native-notify";

export default function App() {
  registerNNPushToken(21135, "QG1T2O5TtmkEISR9ted9aG");
 
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}
