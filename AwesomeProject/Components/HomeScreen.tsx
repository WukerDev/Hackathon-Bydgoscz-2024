import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, useColorScheme, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // Ensure you have this imported

import { CustomDarkTheme, CustomLightTheme } from './Theme';

import { NavigationProp } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const buttonSize = width / 2; // To make them square and fit 2 per row
var threadCount = 6; // Replace with actual thread count
const securityTips = [
  { text: "Włącz 2FA (uwierzytelnianie dwuskładnikowe) na wszystkich kontach, aby znacząco zwiększyć bezpieczeństwo.", link: "https://example.com/2fa" },
  { text: "Zmiana haseł na silne i unikatowe kombinacje może zwiększyć twoje bezpieczeństwo prawie 3 razy!", link: null },
  { text: "Regularne aktualizacje oprogramowania mogą chronić przed nowo odkrytymi lukami.", link: null },
  { text: "E-maile phishingowe są poważnym zagrożeniem; naucz się je rozpoznawać, aby chronić swoje informacje.", link: "https://example.com/phishing" },
  { text: "Zabezpieczanie domowej sieci Wi-Fi silnym hasłem zapobiega nieautoryzowanemu dostępowi.", link: null },
  { text: "Unikaj korzystania z publicznych sieci Wi-Fi podczas dokonywania wrażliwych transakcji, aby zachować bezpieczeństwo danych.", link: null },
  { text: "Używanie VPN może znacząco zwiększyć bezpieczeństwo przeglądania internetu.", link: "https://example.com/vpn" },
  { text: "Regularne przeglądanie uprawnień aplikacji może zapewnić, że nie uzyskują one dostępu do niepotrzebnych informacji.", link: null },
  { text: "Regularne tworzenie kopii zapasowych danych może chronić przed ransomware i utratą danych.", link: null },
  { text: "Implementacja zapory ogniowej zapewnia niezbędną warstwę obrony przed atakami sieciowymi.", link: null },
  { text: "Wyłączanie nieużywanych usług i portów na twoich urządzeniach minimalizuje podatności.", link: null },
  { text: "Szyfrowanie wrażliwych plików może chronić twoją prywatność w przypadku naruszeń danych.", link: null },
  { text: "Używaj funkcji bezpieczeństwa biometrycznego, takich jak odcisk palca lub rozpoznawanie twarzy, dla zwiększonego bezpieczeństwa.", link: null },
  { text: "Bądź ostrożny z informacjami, które udostępniasz w mediach społecznościowych, aby uniknąć kradzieży tożsamości.", link: "https://example.com/socialmedia" },
  { text: "Upewnij się, że twoje oprogramowanie antywirusowe jest aktualne, aby zapewnić kompleksową ochronę przed złośliwym oprogramowaniem.", link: null },
  { text: "Edukuj się na temat najnowszych zagrożeń cyberbezpieczeństwa, aby być o krok przed hakerami.", link: "https://example.com/cyberthreats" },
  { text: "Zabezpiecz swój smartfon, ustawiając blokadę ekranu i śledzenie na wypadek utraty lub kradzieży.", link: null },
  { text: "Regularnie monitoruj swoje transakcje finansowe, aby wcześnie wykryć jakiekolwiek nieautoryzowane działania.", link: null },
  { text: "Używanie wielowarstwowych strategii bezpieczeństwa może drastycznie poprawić twoją obronę przed cyberatakami.", link: null }

  // Add more as needed
];

const HomeScreen = ({ navigation }) => {
  const [currentTips, setCurrentTips] = useState([]);
  const [animation] = useState(new Animated.Value(0));
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? CustomDarkTheme : CustomLightTheme;

  useEffect(() => {
    const selectTips = () => {
      const shuffled = [...securityTips].sort(() => 0.5 - Math.random());
      setCurrentTips(shuffled.slice(0, 3));
    };

    selectTips();
    const animationLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    animationLoop.start();
    const interval = setInterval(selectTips, 15000);

    return () => {
      clearInterval(interval);
      animationLoop.stop();
    };
  }, [animation]);

  const getCircleColor = (count) => {
    if (count === 0) return 'green';
    if (count === 1) return 'blue';
    if (count >= 2 && count <= 5) return 'yellow';
    return 'red';
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.dangerText, { color: theme.colors.text }]}>ZAGROŻENIA:</Text>
      <Animated.View
        style={[
          styles.ring,
          {
            borderColor: getCircleColor(threadCount),
            transform: [{ scale: animation.interpolate({ inputRange: [0, 1], outputRange: [1, 1.05] }) }],
          },
        ]}
      >
        <Text style={{ color: getCircleColor(threadCount), fontSize: 50, marginBottom: 5 }}>{threadCount}</Text>
      </Animated.View>
      <LinearGradient start={{x: 1, y:0}} end={{x:0, y:0}} colors={['#252525', theme.colors.background]} style={styles.gradientBackground}>
      {currentTips.map((tip, index) => (
        <TouchableOpacity key={index} style={styles.tipButton} onPress={() => tip.link && console.log(`Opening link for: ${tip.text}`)}>
            <Text style={[styles.tipText, { color: theme.colors.text, textAlign: 'center' }]}>{tip.text}</Text>
        </TouchableOpacity>
      ))}
      </LinearGradient>
      <TouchableOpacity
        style={[styles.fixButton, { backgroundColor: theme.colors.accent}]}
        onPress={() => setThread(0)}
      >
        <Text style={[styles.fixButtonText, { color: theme.colors.text }]}>Napraw Wszystko</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    width: 120,
    height: 120,
    borderRadius: 75,
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  tipButton: {
    width: '90%',
    padding: 0, // Adjust padding in gradientBackground instead
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10, // Added to separate buttons
  },
  gradientBackground: {
    width: '100%',
    padding: 15,
    borderRadius: 5, // Apply borderRadius here for the gradient
    justifyContent: 'center',
    alignItems: 'center',
  },
  tipText: {
    fontSize: 16,
  },
  dangerText: {
    marginBottom: 40,
    fontSize: 20,
    fontWeight: 'bold',
  },
  fixButton: {
    width: '90%',
    borderRadius: 30,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  fixButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;

