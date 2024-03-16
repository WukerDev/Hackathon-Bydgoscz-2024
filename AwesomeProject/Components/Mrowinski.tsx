import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, PermissionsAndroid } from 'react-native';
import { showNotification } from '../src/notification';
import tw from 'twrnc';
import { Platform } from 'react-native';
import SmsListener from '@ernestbies/react-native-android-sms-listener';

const requestNotificationPermission = async () => {
  if (Platform.OS === "android") {
    try {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS).then(
        response => {
          if (!response) {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS, {
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
          console.log("Notification Error=====>", err);
        }
      )
    } catch (err) {
      console.log(err);
    }
  }
};

async function requestReadSmsPermission() {
  try {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_SMS,
    );

    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
    );
  } catch (err) { }
}

function Mrowinski() {
  const [selectedTime, setSelectedTime] = useState<string>('');
  requestNotificationPermission();

  const [receivedMessage, setReceivedMessage] = useState<SmsMessage | null>(null);

  useEffect(() => {
    requestReadSmsPermission();
    const listener = SmsListener.addListener(handleMessageReceived);

    return () => {
      listener.remove();
    };
  }, []);

  const handleMessageReceived = (message: SmsMessage) => {
    setReceivedMessage(message);
    checkForLink(message.body);
  };

  const checkForLink = (messageBody: string) => {
    // Regular expression to match URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    // Check if the message body contains a URL
    if (urlRegex.test(messageBody)) {
      // If a URL is found, show the notification
      showNotification('Suspicious Message', 'This message contains a link.');
    }
  };

  return (
    <View style={[tw`flex-1`]}>
      <TouchableOpacity
        style={[tw`bg-blue-500 rounded-md p-3 m-2`, { alignSelf: 'center' }]}
        onPress={() => showNotification('Hello', 'This is a notification')}
      >
        <Text style={tw`text-white`}>Schedule Notification</Text>
      </TouchableOpacity>

      {receivedMessage && (
        <View>
          <Text>Originating Address: {receivedMessage.originatingAddress}</Text>
          <Text>Body: {receivedMessage.body}</Text>
          <Text>Timestamp: {receivedMessage.timestamp}</Text>
        </View>
      )}
      </View>
  );
}

export default Mrowinski;