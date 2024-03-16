import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

function Messages() {
  return (
    <View style={tw`pt-6 bg-blue-100`}>
      <Text>Component 1</Text>
    </View>
  );
}

export default Messages;