import React, { useEffect, useState } from 'react';
import { View, Text, PermissionsAndroid, Button, ScrollView } from 'react-native';
import SmsListener from '@ernestbies/react-native-android-sms-listener';
import SmsAndroid from "react-native-get-sms-android";
import tw from 'twrnc';

interface SmsMessage {
  originatingAddress: string;
  body: string;
  timestamp: number;
}

interface SmsAndroidMessage {
  address: string;
  body: string;
  date: number;
}

var filter = {
  box: 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all
  minDate: Date.now() - 3 * 24 * 60 * 60 * 1000, // last 3 days
};

function formatDate(timestamp: number) {
  const date = new Date(timestamp);
  return date.toLocaleString();
}

async function requestReadSmsPermission() {
  try {
    const grantedRead = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_SMS,
    );
    const grantedReceive = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
    );

    if (grantedRead === PermissionsAndroid.RESULTS.GRANTED && grantedReceive === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("SMS read/receive permissions granted");
    } else {
      console.log("SMS read/receive permissions denied");
    }
  } catch (err) {
    console.warn(err);
  }
}

const Switalski = () => {
  const [smsList, setSmsList] = useState<SmsAndroidMessage[]>([]);
  const [receivedMessage, setReceivedMessage] = useState<SmsMessage | null>(null);

  useEffect(() => {
    requestReadSmsPermission();
  
    const listener = SmsListener.addListener((message: SmsMessage) => {
      setReceivedMessage({
        originatingAddress: message.originatingAddress,
        body: message.body,
        timestamp: message.timestamp,
      });
    });
  
    // Fetching SMS messages
    SmsAndroid.list(
      JSON.stringify(filter),
      (fail: string) => {
        console.log("Failed with this error: " + fail);
      },
      (count: number, smsListString: string) => {
        // Here, we explicitly assert the type of the parsed JSON to be an array of SmsAndroidMessage
        const arr: SmsAndroidMessage[] = JSON.parse(smsListString) as SmsAndroidMessage[];
        setSmsList(arr);
      }
    );
  
    // Cleanup the SMS listener
    return () => listener.remove();
  }, []);
  

  return (
    <View style={tw`flex-1 items-center justify-center w-full`}>
      {receivedMessage && (
        <View style={tw`mt-4`}>
          <Text>Originating Address: {receivedMessage.originatingAddress}</Text>
          <Text>Body: {receivedMessage.body}</Text>
          <Text>Timestamp: {formatDate(receivedMessage.timestamp)}</Text>
        </View>
      )}
      <Text style={tw`text-lg font-bold`}>SMS List:</Text>
      <ScrollView style={tw`mt-4 w-full p-4`}>
        {smsList.map((sms, index) => (
          <View key={index} style={tw`mt-2 bg-gray-200 rounded p-4 flex-row justify-between items-center`}>
            <View style={tw`w-4/6`}>
              <Text style={tw`text-xl`}>{sms.address}</Text>
              <Text style={tw`text-base`}>{sms.body}</Text>
              <Text style={tw`text-sm`}>{formatDate(sms.date)}</Text>
            </View>
            <View style={tw`rounded-full w-2/6 p-2`}>
              <Button title="Report" onPress={() => {}} />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Switalski;
