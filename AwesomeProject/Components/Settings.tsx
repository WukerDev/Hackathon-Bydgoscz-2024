import React, { useState } from 'react';
import { View, Text, useColorScheme, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import tw from 'twrnc';
import { CustomDarkTheme, CustomLightTheme } from './Theme';
import Icon from 'react-native-vector-icons/Ionicons';

import { NavigationProp } from '@react-navigation/native';

const userAvatar = require('./Settings/avatar.png');

type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
  EditProfile: undefined;
  Security: undefined;
  Logout: undefined;
  SwitchAccount: undefined;
  Messages: undefined;
  
};

type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, 'Settings'>;

type Props = {
  navigation: SettingsScreenNavigationProp;
};

type subOption = {
  id: string;
  label: string;
  icon: string;
  screenName: keyof RootStackParamList;
};

type option = {
  id: string;
  label: string;
  icon: string;
  subOptions: subOption[];
};

const settingsOptions: option[] = [
  {
    id: '1',
    label: 'Konto',
    icon: 'person-circle-outline',
    subOptions: [
      { id: '1-1', label: 'Edytuj profil', icon: 'create-outline', screenName: 'EditProfile'},
      { id: '1-2', label: 'Bezpieczeństwo', icon: 'shield-checkmark-outline', screenName: 'Security'},
      { id: '1-3', label: 'Wyloguj się', icon: 'log-out-outline', screenName: 'Logout'},
      { id: '1-4', label: 'Przełącz konto', icon: 'swap-horizontal-outline', screenName: 'SwitchAccount'},
    ],
  },
  {
    id: '2',
    label: 'Powiadomienia',
    icon: 'notifications-outline',
    subOptions: [
      { id: '2-1', label: 'Alarmy email', icon: 'mail-outline', screenName: 'Messages'},
      { id: '2-2', label: 'Powiadomienia push', icon: 'notifications-circle-outline', screenName: 'Messages'},
      { id: '2-3', label: 'Dźwięki powiadomień', icon: 'musical-notes-outline', screenName: 'Messages'},
    ],
  },
  {
    id: '3',
    label: 'Nadzorowane Aplikacje',
    icon: 'apps-outline',
    subOptions: [
      { id: '3-1', label: 'Połączone Konta', icon: 'download-outline', screenName: 'Messages'},
      { id: '3-2', label: 'Połączone Aplikacje', icon: 'cloud-download-outline', screenName: 'Messages'},
    ],
  },
  {
    id: '4',
    label: 'Język',
    icon: 'language-outline',
    subOptions: [
      { id: '4-1', label: 'Język aplikacji', icon: 'globe-outline', screenName: 'Messages'},
    ],
  },
  {
    id: '5',
    label: 'Prywatność',
    icon: 'lock-closed-outline',
    subOptions: [
      { id: '5-1', label: 'Blokady', icon: 'person-add-outline', screenName: 'Messages'},
      { id: '5-2', label: 'Prywatność', icon: 'eye-off-outline', screenName: 'Messages'},
      { id: '5-3', label: 'Historia', icon: 'time-outline', screenName: 'Messages'},
    ],
  },
  {
    id: '6',
    label: 'Pomoc i wsparcie',
    icon: 'help-circle-outline',
    subOptions: [
      { id: '6-1', label: 'Centrum pomocy', icon: 'information-circle-outline', screenName: 'Messages'},
      { id: '6-2', label: 'Zgłoś problem', icon: 'bug-outline', screenName: 'Messages'},
    ],
  },
  // Add more options here as needed
];
const Settings: React.FC<Props> = ({ navigation }) => {
  const [expandedOption, setExpandedOption] = useState(null);
  const theme = useColorScheme() === 'dark' ? CustomDarkTheme : CustomLightTheme;

  const toggleExpandOption = (optionId: any) => {
    setExpandedOption(expandedOption === optionId ? null : optionId);
  };
  const handleNavigation = (screenName: keyof RootStackParamList) => {
    navigation.navigate(screenName);
  };

  return (
    <ScrollView style={[styles.scrollView, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.PageTitle,{color: theme.colors.text}]}>Ustawienia</Text>
      <View style={[styles.profileContainer, { backgroundColor: theme.colors.subTile, margin: 14, marginBottom: 50 }]}>
        <View style={styles.userNameContainer}>
          <Text style={[styles.userNameText, { color: theme.colors.text }]}>_super_creeper_0783</Text>
          <Text style={[styles.userDetailText, { color: theme.colors.text }]}>Profil</Text>
        </View>
        <Image
          style={styles.avatar}
          source={userAvatar}
        />
      </View>

      {settingsOptions.map((option) => (
        <React.Fragment key={option.id}>
          <TouchableOpacity 
            style={[styles.optionContainer, {backgroundColor: "#2b2b2b", marginHorizontal: 14}]}
            onPress={() => toggleExpandOption(option.id)}
          >
            <Icon name={option.icon} size={24} color={theme.colors.text} style={tw`mr-4`} />
            <Text style={[styles.optionText, { color: theme.colors.text }]}>{option.label}</Text>
          </TouchableOpacity>
          {expandedOption === option.id && option.subOptions && option.subOptions.map((subOption) => (
            <TouchableOpacity key={subOption.id}
            onPress={() => handleNavigation(subOption.screenName as keyof RootStackParamList)}
            style={[styles.optionSubContainer, {backgroundColor: "#3c3c3c", paddingLeft: 14}]}>
              <Icon name={subOption.icon} size={20} color={theme.colors.text} style={tw`mr-4`} />
              <Text style={[styles.optionText, { color: theme.colors.text }]}>{subOption.label}</Text>
            </TouchableOpacity>
          ))}
        </React.Fragment>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Adjusted for spacing
    paddingHorizontal: 20,
    paddingTop: 10, // Adjusted for a bit of top spacing
    paddingBottom: 20, // More padding at the bottom
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  userNameContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  userNameText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userDetailText: {
    fontSize: 16,
    marginTop: 4,
  },
  avatar: {
    position: 'absolute',
    right: 20,
    bottom: 5,
    width: 90,
    height: 90,
    borderRadius: 40, // Half of the width/height to make it round
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  optionSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginLeft: 20,
    marginRight: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  optionText: {
    fontSize: 18,
    color: CustomDarkTheme.colors.text,
    marginLeft: 12, // Adjust as necessary
  },
  PageTitle: {
    fontSize: 24,
    textAlign: 'left',
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 10,
  },
  // ... (add any other necessary styles)
});

export default Settings;