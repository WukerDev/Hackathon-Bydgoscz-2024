import React from 'react';
import { View, Text, useColorScheme, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import tw from 'twrnc';
import { CustomDarkTheme, CustomLightTheme } from './Theme';
import Icon from 'react-native-vector-icons/Ionicons';

const userAvatar = require('./OptionsMenu/avatar.png');

const settingsOptions = [
  { id: '1', label: 'Account', icon: 'person-circle-outline' },
  { id: '2', label: 'Notifications', icon: 'notifications-outline' },
  { id: '3', label: 'Privacy', icon: 'lock-closed-outline' },
  { id: '4', label: 'Help & Support', icon: 'help-circle-outline' },
  // Add more options here as needed
];

function Settings() {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? CustomDarkTheme : CustomLightTheme;

  return (
    <ScrollView style={[styles.scrollView, { backgroundColor: theme.colors.background }]}>
      <TouchableOpacity style={styles.profileContainer}>
        <Image
          style={styles.avatar}
          source={userAvatar}
        />
        <View style={styles.userNameContainer}>
          <Text style={[styles.userNameText, { color: "#333" }]}>User Name</Text>
          <Text style={[styles.userDetailText, { color: "#333" }]}>Profile, Account & Everything else</Text>
        </View>
        <Icon name="chevron-forward-outline" size={20} color="#C7C7CC" />
      </TouchableOpacity>

      {settingsOptions.map((option) => (
        <TouchableOpacity key={option.id} style={styles.optionContainer}>
          <Icon name={option.icon} size={24} color="#333" style={tw`mr-4`} />
          <Text style={[styles.optionText, { color: "#333" }]}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: tw`flex-1`,
  profileContainer: {
    ...tw`flex-row items-center p-4`,
    backgroundColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#111',
  },
  avatar: {
    ...tw`w-16 h-16 rounded-full mr-4`,
    borderWidth: 2,
    borderColor: 'white',
  },
  userNameContainer: tw`flex-1`,
  userNameText: {
    ...tw`text-lg font-bold`,
    marginBottom: 2,
    color: '#333',
  },
  userDetailText: {
    ...tw`text-sm`,
    color: '#333',
  },
  optionContainer: {
    ...tw`flex-row items-center p-4`,
    backgroundColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#C6C6C8',
  },
  optionText:{
    ...tw`text-lg`,
    color: '#000',
  } 

});

export default Settings;
