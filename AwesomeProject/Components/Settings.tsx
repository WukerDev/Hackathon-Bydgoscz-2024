import React, { useState } from 'react';
import { View, Text, useColorScheme, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import tw from 'twrnc';
import { CustomDarkTheme, CustomLightTheme } from './Theme';
import Icon from 'react-native-vector-icons/Ionicons';

const userAvatar = require('./Settings/avatar.png');

const settingsOptions = [
  {
    id: '1',
    label: 'Konto',
    icon: 'person-circle-outline',
    subOptions: [
      { id: '1-1', label: 'Edytuj profil', icon: 'create-outline' },
      { id: '1-2', label: 'Bezpieczeństwo', icon: 'shield-checkmark-outline' },
      { id: '1-3', label: 'Wyloguj się', icon: 'log-out-outline' },
      { id: '1-4', label: 'Przełącz konto', icon: 'swap-horizontal-outline' },
    ],
  },
  {
    id: '2',
    label: 'Powiadomienia',
    icon: 'notifications-outline',
    subOptions: [
      { id: '2-1', label: 'Alarmy email', icon: 'mail-outline' },
      { id: '2-2', label: 'Powiadomienia push', icon: 'notifications-circle-outline' },
      { id: '2-3', label: 'Dźwięki powiadomień', icon: 'musical-notes-outline' },
    ],
  },
  {
    id: '3',
    label: 'Nadzorowane Aplikacje',
    icon: 'apps-outline',
    subOptions: [
      { id: '3-1', label: 'Połączone Konta', icon: 'download-outline' },
      { id: '3-2', label: 'Połączone Aplikacje', icon: 'cloud-download-outline' },
    ],
  },
  {
    id: '4',
    label: 'Język',
    icon: 'language-outline',
    subOptions: [
      { id: '4-1', label: 'Język aplikacji', icon: 'globe-outline' },
    ],
  },
  {
    id: '5',
    label: 'Prywatność',
    icon: 'lock-closed-outline',
    subOptions: [
      { id: '5-1', label: 'Blokady', icon: 'person-add-outline' },
      { id: '5-2', label: 'Prywatność', icon: 'eye-off-outline' },
      { id: '5-3', label: 'Historia', icon: 'time-outline' },
    ],
  },
  {
    id: '6',
    label: 'Pomoc i wsparcie',
    icon: 'help-circle-outline',
    subOptions: [
      { id: '6-1', label: 'Centrum pomocy', icon: 'information-circle-outline' },
      { id: '6-2', label: 'Zgłoś problem', icon: 'bug-outline' },
    ],
  },
  // Add more options here as needed
];

function Settings() {
  const [expandedOption, setExpandedOption] = useState(null);
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
        <React.Fragment key={option.id}>
          <TouchableOpacity 
            style={[styles.optionContainer, {backgroundColor: "#2b2b2b"}]}
            onPress={() => setExpandedOption(expandedOption === option.id ? null : option.id)}
          >
            <Icon name={option.icon} size={24} color={theme.colors.text} style={tw`mr-4`} />
            <Text style={[styles.optionText, { color: theme.colors.text }]}>{option.label}</Text>
          </TouchableOpacity>
          {expandedOption === option.id && option.subOptions && option.subOptions.map((subOption) => (
            <View key={subOption.id} style={[styles.optionContainer, {backgroundColor: "#3c3c3c", paddingLeft: 40}]}>
              <Icon name={subOption.icon} size={20} color={theme.colors.text} style={tw`mr-4`} />
              <Text style={[styles.optionText, { color: theme.colors.text }]}>{subOption.label}</Text>
            </View>
          ))}
        </React.Fragment>
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
