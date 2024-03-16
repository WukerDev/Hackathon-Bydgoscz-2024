import React from 'react';
import { View, Text, useColorScheme, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import tw from 'twrnc';
import { CustomDarkTheme, CustomLightTheme } from './Theme';
import Icon from 'react-native-vector-icons/Ionicons';

const userAvatar = require('./OptionsMenu/avatar.png');

const settingsOptions = [
  { id: '1', label: 'Konto', icon: 'person-circle-outline' },
  { id: '2', label: 'Powiadomienia', icon: 'notifications-outline' },
  { id: '3', label: 'Nadzorowane Aplikacje', icon: 'apps-outline' },
  { id: '4', label: 'Język', icon: 'language-outline' },  
  { id: '5', label: 'Prywatność', icon: 'lock-closed-outline' },
  { id: '6', label: 'Pomoc i wsparcie', icon: 'help-circle-outline' },
  // Add more options here as needed
];

function Settings() {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? CustomDarkTheme : CustomLightTheme;

  return (
    <ScrollView style={[styles.scrollView, { backgroundColor: theme.colors.background }, {padding: 12}]}>
      <TouchableOpacity style={[styles.profileContainer, {backgroundColor: "#2b2b2b"}]}>
        <Image
          style={styles.avatar}
          source={userAvatar}
        />
        <View style={styles.userNameContainer}>
          <Text style={[styles.userNameText, { color: theme.colors.text }]}>_super_creeper_0783</Text>
          <Text style={[styles.userDetailText, { color: theme.colors.text }]}>Profil </Text>
        </View>
        <Icon name="chevron-forward-outline" size={20} color="#C7C7CC" />
      </TouchableOpacity>

      {settingsOptions.map((option) => (
        <TouchableOpacity key={option.id} style={[styles.optionContainer, {backgroundColor: "#2b2b2b"}]}>
          <Icon name={option.icon} size={24} color={theme.colors.text} style={tw`mr-4`} />
          <Text style={[styles.optionText, { color: theme.colors.text }]}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: tw`flex-1`,
  profileContainer: {
    ...tw`flex-row items-center p-4`,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  avatar: {
    ...tw`w-16 h-16 rounded-full mr-4`,
    borderWidth: 2,
    borderColor: '#FF5',
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
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText:{
    ...tw`text-lg`,
    color: '#000',
  } 

});

export default Settings;
