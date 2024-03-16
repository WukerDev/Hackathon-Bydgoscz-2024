import React, { useEffect, useState } from 'react';
import { View, Text, PermissionsAndroid, Button, ScrollView, Alert } from 'react-native';
import SmsListener from '@ernestbies/react-native-android-sms-listener';
import SmsAndroid from "react-native-get-sms-android";
import StarRating from './StarRating';
import { Linking } from 'react-native';

import { CustomDarkTheme, CustomLightTheme } from './Theme';
import { useColorScheme } from 'react-native';

import tw from 'twrnc';

let shouldContinue = true;

interface SmsMessage {
  originatingAddress: string;
  body: string;
  timestamp: number;
}

interface SmsAndroidMessage {
  address: string;
  body: string;
  date: number;
  dangerLevel:number;
}

var filter = {
  box: 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all
  minDate: Date.now() - 20 * 24 * 60 * 60 * 1000, // last 3 days
};

function formatDate(timestamp: number) {
  const date = new Date(timestamp);
  return date.toLocaleString();
}

async function requestReadSmsPermission() {
  let grantedRead = false;
  let grantedReceive = false;


  while (!grantedRead && !grantedReceive && shouldContinue) {
    try {
      grantedRead = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_SMS,
      ) === PermissionsAndroid.RESULTS.GRANTED;
      grantedReceive = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
      ) === PermissionsAndroid.RESULTS.GRANTED;
      if (grantedRead && grantedReceive) {
        console.log("SMS read/receive permissions granted");
      } else {
        console.log("SMS read/receive permissions not granted");
        const AsyncAlert = async () => new Promise((resolve) => {
          Alert.alert(
            "Wymagane zezwolenie",
            "Ten komponent wymaga zezwolenia na odczytywanie wiadomości w celu ich weryfikacji.",
            [
              {
                text: 'OK',
                onPress: () => resolve('OK'),
              },
              {
                text: 'Idź do ustawień',
                onPress: () => {

                  shouldContinue = false; // Break from the loop
                  Linking.openSettings();
                  resolve('Idź do ustawie');

                },
                style: 'cancel',
              },
            ],
            { cancelable: false },
          );
        });

        await AsyncAlert();
      }
    } catch (err) {
      console.warn(err);
    }
  }
}

const Switalski = () => {
  const currentTheme = useColorScheme();
  const theme = currentTheme === 'dark' ? CustomDarkTheme : CustomLightTheme;
  const [smsList, setSmsList] = useState<SmsAndroidMessage[]>([]);
  const [receivedMessage, setReceivedMessage] = useState<SmsMessage | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      // Request permission
      await requestReadSmsPermission();
      if (!shouldContinue) {
        return;
      }

      // Permission granted, continue with other operations
      const listener = SmsListener.addListener((message: SmsMessage) => {
        setReceivedMessage({
          originatingAddress: message.originatingAddress,
          body: message.body,
          timestamp: message.timestamp,
        });

        //analiza otrzymanej wiadomosci
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
          arr.forEach(smsMsg => {
            smsCalculateDangerLevel(smsMsg);
          });
          setSmsList(arr);
        }
      );
    };

    fetchData();
  }, []);

  if (!shouldContinue) {
    return null;
  }
  const [selectedRating, setSelectedRating] = useState(2);
  return (
    <View style={tw`flex-1 items-center justify-center w-full`}>
      {receivedMessage && (
        <View style={tw`mt-4`}>
          <Text>Originating Address: {receivedMessage.originatingAddress}</Text>
          <Text>Body: {receivedMessage.body}</Text>
          <Text>Timestamp: {formatDate(receivedMessage.timestamp)}</Text>
        </View>
      )}
      <View style={tw` mt-2  flex justify-between items-center`}>
        <Text style={tw`text-lg font-bold`}>Lista SMS:</Text>
      </View>

      <ScrollView style={tw`w-full pb-4 pr-4 pl-4`}>
      {smsList.map((sms, index) => (
        <View key={index} style={[tw`mt-2 rounded p-4 flex-row justify-between relative`, {color:theme.colors.text, backgroundColor: theme.colors.buttonBackground}]}>
          <View style={tw`w-4/6`}>
            <Text style={tw`text-xl`}>{sms.address}</Text>
            <Text numberOfLines={2} ellipsizeMode="tail" style={tw`text-base`}>{sms.body}</Text>
            <Text style={tw`text-sm`}>{formatDate(sms.date)}</Text>
          </View>
          <View style={tw`absolute top-5 right-2`}>
            <StarRating
              rating={sms.dangerLevel}
              onRatingChange={(rating) => setSelectedRating(rating)}
            />
          </View>
          <View style={tw`absolute bottom-3 right-4`}>
            <Button title="Zgłoś" onPress={() => { }} />
          </View>
        </View>
      ))}
    </ScrollView>
    </View>
  );
};

export default Switalski;

function smsCalculateDangerLevel(smsMsg) {
  smsMsg.dangerLevel = Math.floor(Math.random() * 6); // Generates a random integer between 0 and 5
}

