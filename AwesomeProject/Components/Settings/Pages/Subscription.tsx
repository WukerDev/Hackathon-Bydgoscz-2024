import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CustomDarkTheme, CustomLightTheme } from '../../Theme';
import { useColorScheme } from 'react-native';

const subscriptionData = [
  { id: '1', title: 'Standard', description: 'Dobry początek w celu poprawienia bezpieczeństwa', price: '15zł/miesięcznie', isBestValue: false },
  { id: '2', title: 'Premium', description: 'Najbardzie popularny, zwiera dodatkowe funkcje filtracji i asystenta', price: '120zł/rocznie', isBestValue: true },
  { id: '3', title: 'Lifetime', description: 'Permanętny pakiet naszych usług, zawiera wszystkie dodatkowe funkcje', price: '400zł', isBestValue: false },
];

const Subscription: React.FC = () => {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? CustomDarkTheme : CustomLightTheme;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {subscriptionData.map((tier) => (
        <View key={tier.id} style={[
          styles.tier, 
          tier.isBestValue ? styles.bestValueTier : {}, 
          { borderColor: theme.colors.primary }
        ]}>
          {tier.isBestValue && <Text style={styles.bestValueBadge}>OKAZJA</Text>}
          <Text style={[styles.title, { color: theme.colors.text }]}>{tier.title}</Text>
          <Text style={[styles.description, { color: theme.colors.text }]}>{tier.description}</Text>
          <Text style={[styles.price, { color: theme.colors.primary }]}>{tier.price}</Text>
          <TouchableOpacity style={[styles.buyButton, { backgroundColor: theme.colors.accent }]}>
            <Text style={styles.buttonText}>Kup</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tier: {
    width: '80%',
    padding: 20,
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  bestValueTier: {

  },
  bestValueBadge: {
    position: 'absolute',
    top: -10,
    right: 10,
    backgroundColor: 'orange',
    color: 'white',
    padding: 5,
    borderRadius: 5,
    fontSize: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 5,
  },
  description: {
    fontSize: 16,
    margin: 5,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 15,
  },
  buyButton: {
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
});

export default Subscription;
