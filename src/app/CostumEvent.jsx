import React from 'react';
import {View,Text, StyleSheet} from 'react-native';
import EventModal from '../components/EventModal';
import { useState } from 'react';
import { Button } from 'react-native';
const CostumEvent = () => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View>
            <Text>Costum Event</Text>
            <Button title="add event" onPress={() => setModalVisible(true)} />
            <EventModal visible={modalVisible} onClose={() => setModalVisible(false)} />
        </View>
    );
}

const styles = StyleSheet.create({})

export default CostumEvent;
