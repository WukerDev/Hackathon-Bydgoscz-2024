import { DefaultTheme, DarkTheme } from '@react-navigation/native';

// Customizing the DarkTheme
export const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#121212',
    card: '#232323',
    text: '#FFF',
    accent: '#CC2020',
    tile: '#1E1E1E',
    subTile: '#2B2B2B',
    icon: '#FFF',
    primary: '#EEE',
    buttonBackground: '#292929',
    secondary: '#FFA500',
    green: '#00FF00',
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
    accent: '#FF0000',
    tile: '#FFFFFF',
    subTile: '#F5F5F5',
    icon: '#343434',
    primary: '#343434',
    buttonBackground: '#E8E6E4',
    secondary: '#FFA500',
    greed: '#00FF00',

    // Add or override other color properties as needed
  },
};