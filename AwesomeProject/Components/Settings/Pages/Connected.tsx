import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CustomDarkTheme, CustomLightTheme } from '../../Theme';
import { useColorScheme } from 'react-native';

const appsData = [
  { id: '1', name: 'Discord', iconName: 'discord' },
  { id: '2', name: 'Teams', iconName: 'microsoft-teams' },
  { id: '3', name: 'Skype', iconName: 'skype' },
  { id: '4', name: 'WhatsApp', iconName: 'whatsapp' },
];

const Connect: React.FC = () => {
  const [connected, setConnected] = useState<Record<string, boolean>>({});
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? CustomDarkTheme : CustomLightTheme;

  const connectApp = (appId: string) => {
    setConnected((prevState) => ({
      ...prevState,
      [appId]: !prevState[appId],
    }));
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={appsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.appItem}>
            <Icon name={item.iconName} size={50} color={theme.colors.primary} />
            <Text style={[styles.appText, { color: theme.colors.text }]}>{item.name}</Text>
            <TouchableOpacity
              style={[styles.connectButton, { backgroundColor: connected[item.id] ? theme.colors.secondary : theme.colors.accent }]}
              onPress={() => connectApp(item.id)}
            >
              <Text style={styles.buttonText}>{connected[item.id] ? 'Połączone' : 'Połącz'}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  appText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 20,
  },
  connectButton: {
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
  },
});

export default Connect;
