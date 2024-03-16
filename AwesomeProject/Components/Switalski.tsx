import React, { useState } from 'react';
import { View, Text, PermissionsAndroid, Button, ScrollView } from 'react-native';
import SmsListener from '@ernestbies/react-native-android-sms-listener'
import SmsAndroid from "react-native-get-sms-android";
import tw from 'twrnc';

interface SmsMessage {
  originatingAddress: string;
  body: string;
  timestamp: number;
}

var filter = {
  box: 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all
  minDate: Date.now() - 3 * 24 * 60 * 60 * 1000,
};

function formatDate(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleString();
}

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

function Switalski() {

  const [smsList, setSmsList] = useState([]);

  // State to store the received message
  const [receivedMessage, setReceivedMessage] = useState<SmsMessage | null>(null);


  // Function to handle receiving a new message
  const handleMessageReceived = (message: SmsMessage) => {
    // Update the state with the received message
    setReceivedMessage(message);
  };

  // Attach the listener when the component mounts
  React.useEffect(() => {
    requestReadSmsPermission();
    const listener = SmsListener.addListener(handleMessageReceived);

    // Clean up the listener when the component unmounts
    return () => {
      listener.remove();
    };
  }, []);
  SmsAndroid.list(
    JSON.stringify(filter),
    fail => {
      console.log("Failed with this error: " + fail);
    },
    (count, smsList) => {
      const arr = JSON.parse(smsList);
      setSmsList(arr);
    }
  );


  return (
    <View style={tw`flex-1 items-center justify-center w-full`}>
      {receivedMessage && (
        <View style={tw`mt-4`}>
          <Text >Originating Address: {receivedMessage.originatingAddress}</Text>
          <Text >Body: {receivedMessage.body}</Text>
          <Text >Timestamp: {receivedMessage.timestamp}</Text>
        </View>
      )}
      <Text style={tw`text-lg font-bold`}>SMS List:</Text>
      <ScrollView style={tw`mt-4 w-full p-4`}>

        {smsList.map((sms, index) => (
          <View key={index} style={tw`mt-2 bg-gray-200 rounded p-4 flex-row justify-between items-center`}>
            <View style={tw`w-4/6`}>
            <Text style={tw`text-xl`}>{sms.address}</Text>
            <Text style={tw`text-base `}>{sms.body}</Text>
            <Text style={tw`text-sm`}>{formatDate(sms.date)}</Text>
          </View>
          <View style={tw`rounded-full w-2/6  p-2`}>
            <Button title="zgłoś" />
          </View>
        </View>
        ))}
      </ScrollView>
    </View>

  );
}

export default Switalski;