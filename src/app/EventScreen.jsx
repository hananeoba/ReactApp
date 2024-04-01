import { SafeAreaView,View, Text } from 'react-native'
import React from 'react'
import Spinner from 'react-native-loading-spinner-overlay'

const EventScreen = () => {
  return (

    <SafeAreaView>
    <Spinner visible={false} textContent={"Loading..."} textStyle={{color: "#FFF"}} />
      <Text>Event Screen</Text>
    </SafeAreaView>
  )
}

export default EventScreen