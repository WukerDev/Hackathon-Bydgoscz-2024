import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, PermissionsAndroid } from 'react-native';
import { showNotification } from '../src/notification';
import tw from 'twrnc';
import { Platform } from 'react-native';

const requestNotificationPermission = async () => {
  if(Platform.OS ==="android"){
    try {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS).then(
        response => {
          if(!response){
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,{
                title: 'Notification',
                message:
                  'App needs access to your notification ' +
                  'so you can get Updates',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            })
          }
        }
      ).catch(
        err => {
          console.log("Notification Error=====>",err);
        }
      )
    } catch (err){
      console.log(err);
    }
  }
};

function Mrowinski() {
  const [selectedTime, setSelectedTime] = useState<string>('');
  requestNotificationPermission();

  return (
    <View style={[tw`flex-1`]}>
      <TouchableOpacity
        style={[tw`bg-blue-500 rounded-md p-3 m-2`, { alignSelf: 'center' }]}
        onPress={() => showNotification('Hello', 'This is a notification')}
      >
        <Text style={tw`text-white`}>Schedule Notification</Text>
      </TouchableOpacity>

    </View>
  );
}

export default Mrowinski;