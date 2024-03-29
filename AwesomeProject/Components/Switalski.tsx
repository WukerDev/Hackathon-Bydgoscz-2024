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
  originatingAddress: string;
  body: string;
  timestamp: number;
  dangerLevel: number;
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
                  resolve('Idź do ustawień');

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
  const [receivedMessage, setReceivedMessage] = useState<SmsAndroidMessage>(null);
  let initialButtonTitles;
  const [buttonTitles, setButtonTitles] = useState<string[]>([]);

  function fetchMsg() {
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
        const initialButtonTitles = arr.map(() => "Zgłoś");
        setButtonTitles(initialButtonTitles);
        setSmsList(arr);
      }
    );
  }

  useEffect(() => {
    const fetchData = async () => {
      // Request permission
      await requestReadSmsPermission();
      if (!shouldContinue) {
        return;
      }

      // Permission granted, continue with other operations
      const listener = SmsListener.addListener((message: SmsAndroidMessage) => {
        const newReceivedMessage = {
          originatingAddress: message.originatingAddress,
          body: message.body,
          timestamp: message.timestamp,
          dangerLevel: 0
        };


        // Update receivedMessage
        setReceivedMessage(newReceivedMessage);
        fetchMsg();

        // Perform analysis of the received message
      });

      // Fetching SMS messages
      fetchMsg();
    };

    fetchData();
  }, []);

  if (!shouldContinue) {
    return null;
  }
  const handleRatingChange = (rating: number, index: number) => {
    const updatedSmsList = smsList.map((sms, smsIndex) => {
      if (smsIndex === index) {
        return { ...sms, dangerLevel: rating };
      }
      return sms;
    });
    setSmsList(updatedSmsList);
  };
  const [selectedRating, setSelectedRating] = useState(2);
  return (
    <View style={tw`flex-1 items-center justify-center w-full`}>
     

      <ScrollView style={tw`w-full pb-4 pr-4 pl-4`}>
        {smsList.map((sms, index) => (
          <View key={index} style={[tw`mt-2 rounded p-4 flex-row justify-between relative`, { color: theme.colors.text, backgroundColor: theme.colors.buttonBackground }]}>

            <View style={tw`w-4/6`}>
              <Text style={tw`text-xl`}>{sms.address}</Text>
              <Text numberOfLines={2} ellipsizeMode="tail" style={tw`text-base`}>{sms.body}</Text>
              <Text style={tw`text-sm`}>{formatDate(sms.date)}</Text>
            </View>
            <View style={tw`absolute top-5 right-2`}>
              <StarRating
                rating={sms.dangerLevel}
                onRatingChange={(rating) => handleRatingChange(rating, index)}
              />
            </View>
            <View style={tw`absolute bottom-3 w-26 right-4`}>
              <Button title={buttonTitles[index]}
                disabled={buttonTitles[index] == "Zgłoszony"}
                onPress={() => {
                  const updatedButtonTitles = [...buttonTitles]; // Create a copy of buttonTitles
                  updatedButtonTitles[index] = "Zgłoszony"; // Update the title of the pressed button
                  setButtonTitles(updatedButtonTitles);
                  //add telephone number to suspicious link if phone exists in db increase number of reports (more reports more extra danger level)
                  //add suspicious element of message to db
                }} />
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

