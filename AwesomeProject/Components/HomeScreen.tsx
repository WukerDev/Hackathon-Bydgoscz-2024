import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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

const IconButton: React.FC<IconButtonProps> = ({ title, iconName, onPress }) => (
  <TouchableOpacity style={[styles.button, { height: buttonSize - 10 }]} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
    <Icon name={iconName} size={60} color="#fff" />
  </TouchableOpacity>
);

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const buttons: IconButtonProps[] = [
    { title: 'One', iconName: 'home', onPress: () => console.log('Pressed One') },
    { title: 'Two', iconName: 'account', onPress: () => console.log('Pressed Two') },
    { title: 'Three', iconName: 'bell', onPress: () => console.log('Pressed Three') },
    { title: 'Four', iconName: 'camera', onPress: () => console.log('Pressed Four') },
    { title: 'Five', iconName: 'card', onPress: () => console.log('Pressed Five') },
    { title: 'Six', iconName: 'email', onPress: () => console.log('Pressed Six') },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {buttons.slice(0, 2).map((button, index) => (
          <IconButton key={index} {...button} />
        ))}
      </View>
      <View style={styles.row}>
        {buttons.slice(2, 4).map((button, index) => (
          <IconButton key={index} {...button} />
        ))}
      </View>
      <View style={styles.row}>
        {buttons.slice(4, 6).map((button, index) => (
          <IconButton key={index} {...button} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column-reverse', // Reverse column order
    alignItems: 'center',
    justifyContent: 'space-around', // Evenly space out the rows
  },
  row: {
    flexDirection: 'row-reverse', // Reverse row order
    justifyContent: 'space-around', // Evenly space out the buttons
    width: '100%',
  },
  button: {
    width: buttonSize - 10, // Subtracting 10 for some padding
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007bff',
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
