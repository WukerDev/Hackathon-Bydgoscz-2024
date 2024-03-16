import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { CustomDarkTheme, CustomLightTheme } from '../../Theme';
import { useColorScheme } from 'react-native';

const packetsData = [
  { id: '1', name: 'Pakiet Bezpieczny Senior', description: 'Specjalny pakiet posiadający wszystkie funkcje do ochrony osób starszych', price: '200zł', special: true },
];

const Packets: React.FC = () => {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? CustomDarkTheme : CustomLightTheme;

  return (
    <ScrollView style={[styles.container, { }]}>
      {packetsData.map((packet) => (
        <View key={packet.id} style={[
          styles.packetItem, 
          packet.special ? styles.specialPacketItem : {}, 
          { borderColor: theme.colors.primary }
        ]}>
          <Text style={[styles.packetName, { color: theme.colors.text }]}>{packet.name}</Text>
          <Text style={[styles.description, { color: theme.colors.text }]}>{packet.description}</Text>
          <Text style={[styles.price, { color: theme.colors.primary }]}>{packet.price}</Text>
          {packet.special && <View style={styles.specialBadge}><Text style={styles.badgeText}>Dla Seniorów</Text></View>}
          <TouchableOpacity style={[styles.subscribeButton, { backgroundColor: theme.colors.accent }]}>
            <Text style={styles.buttonText}>Subscribe</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  packetItem: {
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
  },
  specialPacketItem: {
  },
  packetName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  subscribeButton: {
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
  specialBadge: {
    position: 'absolute',
    top: -10,
    right: 10,
    backgroundColor: 'orange',
    padding: 5,
    borderRadius: 5,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
  },
});

export default Packets;
