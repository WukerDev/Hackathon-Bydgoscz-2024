import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, Alert } from 'react-native';
import {showNotification, handleScheduledNotification, handleCancel, alramNotification} from '../src/notification';
import tw from 'twrnc';

function Mrowinski() {
  const [selectedTime, setSelectedTime] = useState<string>(''); 

  const handleSetNotification = () => {
    if (selectedTime) {

      const [hours, minutes] = selectedTime.split(':').map(Number);
      const currentDate = new Date(Date.now());

      const notificationDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        hours,
        minutes,
        0 // Set seconds to 0
      );

      if (notificationDate > currentDate) {
        notificationDate.setDate(notificationDate.getDate() + 1);
      }

      alramNotification('Hello', 'This is a notification at ' + selectedTime, notificationDate);
      Alert.alert('Notification set for ' + notificationDate + '.')
    } else {
      Alert.alert('Please select a time for the notification.');
    }
  };

  return (
    <View style={[tw`flex-1`, ]}>
      <TouchableOpacity
        style={[tw`bg-blue-500 rounded-md p-3 m-2`, { alignSelf: 'center' }]}
        onPress={() => showNotification('Hello', 'This is a notification')}
      >
        <Text style={tw`text-white`}>Schedule Notification</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[tw`bg-green-500 rounded-md p-3 m-2`, { alignSelf: 'center' }]}
        onPress={() => handleScheduledNotification('Hello', 'Notification after 5 seconds')}
      >
        <Text style={tw`text-white`}>Schedule Notification</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[tw`bg-red-500 rounded-md p-3 m-2`, { alignSelf: 'center' }]}
        onPress={() => handleCancel()}
      >
        <Text style={tw`text-white`}>Cancel Notification</Text>
      </TouchableOpacity>

      <TextInput
        style={[tw`border rounded-md p-2 m-2`, { alignSelf: 'center' }]}
        placeholder="Enter time (HH:MM)"
        value={selectedTime}
        onChangeText={(text) => setSelectedTime(text)}
        keyboardType="numeric"
      />

      <TouchableOpacity
        style={[tw`bg-blue-500 rounded-md p-3 m-2`, { alignSelf: 'center' }]}
        onPress={handleSetNotification}
      >
        <Text style={tw`text-white`}>Set Notification</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Mrowinski;