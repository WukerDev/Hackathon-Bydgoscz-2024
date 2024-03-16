import React from 'react';
import { View, Text, useColorScheme, ScrollView, Image, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { NavigationContainer } from '@react-navigation/native';
import { CustomDarkTheme, CustomLightTheme } from './Theme';

const userAvatar = require('./OptionsMenu/avatar.png');

const settingsOptions = [
  { id: '1', label: 'Account' },
  { id: '2', label: 'Notifications' },
  { id: '3', label: 'Privacy' },
  { id: '4', label: 'Help & Support' },
  // Add more options here as needed
];

function Settings() {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? CustomDarkTheme : CustomLightTheme;

  return (
    <ScrollView style={[{ backgroundColor: theme.colors.background }, tw`flex-1`]}>
      <View style={tw`items-center p-4`}>
        <Image
          style={tw`w-24 h-24 rounded-full`}
          source={userAvatar} // Replace with actual image source
        />
        <Text style={[{ color: theme.colors.text }, tw`mt-4 text-lg font-bold`]}>User Name</Text>
      </View>
      <View>
        {settingsOptions.map((option) => (
          <TouchableOpacity key={option.id} style={tw`p-4 border-b border-gray-200`}>
            <Text style={[{ color: theme.colors.text }, tw`text-lg`]}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

export default Settings;
