import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../app/HomeScreen';
import EventsScreen from '../app/EventsScreen';
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Events" component={EventsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}