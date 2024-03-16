import { DefaultTheme, DarkTheme } from '@react-navigation/native';

// Customizing the DarkTheme
export const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#1A1A1A',
    card: '#121212',
    text: '#ffffff',
    primary: '#BB86FC',
    // Customize other colors as needed
  },
};

// Customizing the DefaultTheme (Light Theme)
export const CustomLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFFFFF',
    card: '#F8F9FA',
    text: '#333333',
    primary: '#6200EE',
    // Add or override other color properties as needed
  },
};