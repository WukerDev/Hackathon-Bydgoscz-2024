import React, { useState } from 'react';
import { View, Text, PermissionsAndroid } from 'react-native';
import SmsListener from '@ernestbies/react-native-android-sms-listener'
import tw from 'twrnc';

interface SmsMessage {
  originatingAddress: string;
  body: string;
  timestamp: number;
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

  return (
    <View style={tw`flex-1 items-center justify-center `}>
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

export default Switalski;