import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Choose your preferred icon set

type HomeScreenNavigationProp = any; // Simplified for demonstration
type Props = {
  navigation: HomeScreenNavigationProp;
};

interface IconButtonProps {
  title: string;
  iconName: string;
  onPress: (event: GestureResponderEvent) => void;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const IconButton: React.FC<IconButtonProps> = ({ title, iconName, onPress }) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Icon name={iconName} size={20} color="#fff" />
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <IconButton
        title="Go to Kozakowski"
        iconName="account"
        onPress={() => navigation.navigate('Kozakowski')}
      />
      <IconButton
        title="Go to Jacoszek"
        iconName="account"
        onPress={() => navigation.navigate('Jacoszek')}
      />
      <IconButton
        title="Go to Kordella"
        iconName="account"
        onPress={() => navigation.navigate('Kordella')}
      />
      <IconButton
        title="Go to Switalski"
        iconName="account"
        onPress={() => navigation.navigate('Switalski')}
      />
      <IconButton
        title="Go to Zelazkiewicz"
        iconName="account"
        onPress={() => navigation.navigate('Zelazkiewicz')}
      />
      <IconButton
        title="Go to Mrowinski"
        iconName="account"
        onPress={() => navigation.navigate('Mrowinski')}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    width: 200
  },
  buttonText: {
    color: '#fff',
    marginLeft: 10,
  },
});


export default HomeScreen;
