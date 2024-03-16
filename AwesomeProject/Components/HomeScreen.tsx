import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useColorScheme } from 'react-native';
import { CustomDarkTheme, CustomLightTheme } from './Theme';

const { width } = Dimensions.get('window');
const buttonSize = width / 2; // To make them square and fit 2 per row.

type HomeScreenNavigationProp = any; // Simplified for demonstration. Replace with your actual navigation type.

interface Props {
  navigation: HomeScreenNavigationProp;
}

interface IconButtonProps {
  title: string;
  iconName: string;
  onPress: () => void; // Simplified onPress type for demonstration
}

const IconButton: React.FC<IconButtonProps> = ({ title, iconName, onPress }) => {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? CustomDarkTheme : CustomLightTheme;

  return (
    <TouchableOpacity
      style={[
        b_styles.button,
        { backgroundColor: theme.colors.buttonBackground, height: buttonSize - 10 },
      ]}
      onPress={onPress}
    >
      <Text style={[b_styles.buttonText, { color: theme.colors.text }]}>{title}</Text>
      <Icon name={iconName} size={60} color={theme.colors.primary} />
    </TouchableOpacity>
  );
};


const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useColorScheme();
  const styles = theme === 'dark' ? CustomDarkTheme : CustomLightTheme;
  const buttons: IconButtonProps[] = [
    { title: 'Ostatnio wykryte', iconName: 'message', onPress: () => console.log('Pressed One') },
    { title: 'Ważne', iconName: 'alert', onPress: () => console.log('Pressed Two') },
    { title: 'FAQ', iconName: 'head-question', onPress: () => console.log('Pressed Three') },
    { title: 'Zablokowane', iconName: 'block-helper', onPress: () => console.log('Pressed Four') },
    { title: 'Aktualizacje', iconName: 'download', onPress: () => console.log('Pressed Five') },
    { title: 'Konto premium', iconName: 'key-variant', onPress: () => console.log('Pressed Six') },
  ];

  return (
    <View style={b_styles.container}>
      <View style={b_styles.row}>
        {buttons.slice(0, 2).map((button, index) => (
          <IconButton key={index} {...button} />
        ))}
      </View>
      <View style={b_styles.row}>
        {buttons.slice(2, 4).map((button, index) => (
          <IconButton key={index} {...button} />
        ))}
      </View>
      <View style={b_styles.row}>
        {buttons.slice(4, 6).map((button, index) => (
          <IconButton key={index} {...button} />
        ))}
      </View>
    </View>
  );
};

const b_styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column', // Reverse column order
    alignItems: 'center',
    justifyContent: 'space-around', // Evenly space out the rows
  },
  row: {
    flexDirection: 'row', // Reverse row order
    justifyContent: 'space-around', // Evenly space out the buttons
    width: '100%',
  },
  button: {
    width: buttonSize - 10, // Subtracting 10 for some padding
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    marginBottom: 10, // Space between text and icon
    fontSize: 16,
  },
});

export default HomeScreen;
