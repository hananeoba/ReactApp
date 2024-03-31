import { View, Text, Button } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default function HomeScreen() {
  
  return (
    <NavigationContainer>

      

      <Stack.Navigator>
        <View>
          <Text>Some text</Text>
          <Button
            title="Logout"
            onPress={() => {
              setIsLogedIN(false);
              setUser(null);
            }}
          />
        </View>
        <View>
          <Text>Some text</Text>


        </View>

      

      </Stack.Navigator>
    </NavigationContainer>
  )
}