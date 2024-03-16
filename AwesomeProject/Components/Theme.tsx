import { DefaultTheme, DarkTheme } from '@react-navigation/native';

// Customizing the DarkTheme
export const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#333',
    card: '#232323',
    text: '#EEE',
    primary: '#EEE',
    // Customize other colors as needed
  },
};

// Customizing the DefaultTheme (Light Theme)
export const CustomLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#CACACA',
    card: '#E8E6E4',
    text: '#343434',
    primary: '#343434',
    // Add or override other color properties as needed
  },
};