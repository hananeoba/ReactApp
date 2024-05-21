import { StyleSheet } from "react-native";
import { AuthProvider } from "./src/contexts/AuthContext";
import { Navigation } from "./src/components/navigation";
import 'react-native-gesture-handler';

export default function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}

