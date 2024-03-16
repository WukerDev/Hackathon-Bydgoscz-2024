/* eslint-disable no-useless-escape */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, useColorScheme } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { SHA512 } from 'crypto-js';
import Icon from 'react-native-vector-icons/Ionicons';
import { CustomDarkTheme, CustomLightTheme } from './Theme';
import AsyncStorage from '@react-native-async-storage/async-storage';


const signIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    console.log(userInfo);
  } catch (error) {
    console.log(error);
  }
};

GoogleSignin.configure({
  webClientId: '451172774503-f44ds1bpuj69mj4f5pcv080qhj7jsdda.apps.googleusercontent.com',
});



interface UserCredentials {
  userName: string;
  password: string;
}

const checkUser = async (username: string): Promise<boolean> => {
  try {
    const response = await fetch('http://192.168.217.175:31647/checkIfExist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userName: username })
    });
    const data = await response.json();
    console.log(data);
    return data['exists'];
  } catch (error) {
    console.error(error);
    return false;
  }
};

const hashPassword = (password: string) => {
  return SHA512(password).toString();
};
const isValidPassword = (password: string) => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return re.test(password);
};



const isValidEmail = (email: any) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
  return re.test(String(email).toLowerCase());
};
const addUser = async (username: string, password: string) => {
  const hashedPassword = hashPassword(password);
  try {
    const response = await fetch('http://192.168.217.175:31647/addUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userName: username, password: hashedPassword, platform: 'Owl', is_premium: "0"})
    });
    console.log(response);
    Alert.alert('Pomyślnie zarejestrowano.');
  } catch (error) {
    console.error(error);
  }
};


const handleGoogleLogin = async (): Promise<void> => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    // Tu można uzyskać token odświeżania jeśli jest potrzebny
    const tokens = await GoogleSignin.getTokens(); // Pobranie tokenów dostępu i odświeżania

    // Przykład użycia tokena dostępu do wykonania zapytania do Google API
    const response = await fetch('https://www.googleapis.com/drive/v3/about', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
    const data = await response.json();
    console.log(data);

    console.log(userInfo);
  } catch (error) {
    console.error(error);
  }
};

const Zelaskiewicz: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showLoginForm, setShowLoginForm] = useState<boolean>(true);
  const [showRegistrationForm, setShowRegistrationForm] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState<boolean>(false);
  const [showRegistrationCheckForm, setShowRegistrationCheckForm] = useState<boolean>(false);
  const [loggedInEmail, setLoggedInEmail] = useState<string>('');

  const login = async ({ userName, password }: UserCredentials): Promise<void> => {
    try {
      const hashedPassword = hashPassword(password);
      const response = await fetch(`http://192.168.217.175:31647/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName: userName, password: hashedPassword }),
      });
      const data = await response.json();
      if (data['login']) {
        Alert.alert('Logowanie zakończone sukcesem', 'Zalogowałeś się pomyślnie.');
        await AsyncStorage.setItem('loggedInEmail', userName); // Użyj await tutaj
        setLoggedInEmail(userName);
      } else {
        Alert.alert('Logowanie nieudane', 'Niepoprawny email lub hasło.');
      }
    } catch (error) {
      console.error('Błąd logowania:', error);
      Alert.alert('Logowanie nieudane', 'Wystąpił błąd podczas próby logowania.');
    }
  };
  useEffect(() => {
    // Initialize Google Sign-In
    GoogleSignin.configure({
      webClientId: '451172774503-f44ds1bpuj69mj4f5pcv080qhj7jsdda.apps.googleusercontent.com',
    });
  }, []);

  const handleGoogleLogin = async (): Promise<void> => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
    } catch (error) {
      console.error(error);
    }
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Toggle for confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };
  const handleManualLogin = async (): Promise<void> => {
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('Logowanie nieudane', 'Proszę wprowadzić zarówno email, jak i hasło.');
      return;
    }
    login({ userName: email, password });
  };

  
  const handleRegister = async (): Promise<void> => {
    if (!isValidEmail(email)) {
      Alert.alert('Niepoprawny Email', 'Proszę wprowadzić prawidłowy adres email.');
      return;
    }
    else if (!isValidPassword(password)) {
      Alert.alert('Hasło nie spełnia wymagań', 'Hasło musi zawierać co najmniej 8 znaków, w tym przynajmniej jedną dużą literę, jedną małą literę, jedną cyfrę i jeden znak specjalny.');
      return;
    }
    else if (password !== confirmPassword) {
      Alert.alert('Rejestracja nieudana', 'Hasła nie są zgodne.');
      return;
    }
    addUser(email, password);
  };
  
  

  const handleRegisterCheck = async (): Promise<void> => {
    if (!isValidEmail(email)) {
      Alert.alert('Niepoprawny Email', 'Proszę wprowadzić prawidłowy adres email.');
      return;
    }
    const userDoesNotExist = await checkUser(email);
     if (userDoesNotExist) {
      handleToRegistrationForm();
    } else {
      Alert.alert('Użytkownik już zarejestrowany', 'Podany adres email jest już powiązany z kontem.');
    }
  };
  
  const toggleForms = (): void => {
    setShowLoginForm(!showLoginForm);
    setShowRegistrationCheckForm(!showRegistrationCheckForm);
  };

  const handleToRegistrationForm = (): void => {
    setShowRegistrationCheckForm(false);
    setShowRegistrationForm(true);
  };
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? CustomDarkTheme : CustomLightTheme;
  return (
    
    <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
      {showLoginForm && (
        <>
          <TextInput
            style={[styles.input, {color:theme.colors.text}]}
            placeholder="Adres e-mail"
            onChangeText={setEmail}
            value={email}
            placeholderTextColor={theme.colors.text}
          />
          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.input, {flex: 1}]}
              placeholder="Hasło"
              secureTextEntry={!passwordVisible}
              onChangeText={setPassword}
              value={password}
              placeholderTextColor={theme.colors.text}
            />
            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.visibilityToggle}>
              <Icon name={passwordVisible ? 'eye-off' : 'eye'} size={24} color={theme.colors.text} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleManualLogin}>
            <Text style={styles.buttonText}>Kontynuuj</Text>
          </TouchableOpacity>
          <Text
            style={[styles.registerText,{color:theme.colors.text}]}
            onPress={toggleForms}
          >
            Nie masz konta? Zarejestruj się
          </Text>
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={[styles.orText,{color:theme.colors.text}]} id="orText">LUB</Text>
            <View style={styles.divider} />
          </View>
          <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
            <Text style={styles.buttonText}>Kontynuuj z Google</Text>
          </TouchableOpacity>
        </>
      )}
      {showRegistrationCheckForm && (
        <>
        <View style={{}}>

 
          <TextInput
            style={{borderColor: theme.colors.primary, borderWidth: 1, height: 50, width: 300, marginBottom: 10, color: theme.colors.text}}
            placeholder="Adres e-mail"
            onChangeText={setEmail}
            value={email}
            placeholderTextColor={theme.colors.text}
          />
          <TouchableOpacity style={styles.button} onPress={handleRegisterCheck}>
            <Text style={{color: theme.colors.text, fontSize: 20, width: 150, textAlign: 'center'}}>Kontynuuj</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={toggleForms}>
            <Text style={{color: theme.colors.text, fontSize: 20, width: 150, textAlign: 'center'}}>Wróć</Text>
          </TouchableOpacity>
          </View>
        </>
      )}
      {showRegistrationForm && (
  <>
      <View style={styles.passwordContainer}>
    <TextInput
      style={[styles.input,{color: theme.colors.text}]}
      placeholder="Adres e-mail"
      onChangeText={setEmail}
      value={email}
      placeholderTextColor={theme.colors.text}
    />
</View>
    <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.input, {flex: 1},{color: theme.colors.text},]}
              placeholder="Hasło"
              secureTextEntry={!passwordVisible}
              onChangeText={setPassword}
              value={password}
              placeholderTextColor={theme.colors.text}
            />
            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.visibilityToggle}>
            <Icon name={passwordVisible ? 'eye-off' : 'eye'} size={24} color="white" />
</TouchableOpacity>

          </View>
          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.input, {flex: 1}]}
              placeholder="Potwierdź hasło"
              secureTextEntry={!confirmPasswordVisible}
              onChangeText={setConfirmPassword}
              value={confirmPassword}
              placeholderTextColor="white"
            />
            <TouchableOpacity onPress={toggleConfirmPasswordVisibility} style={styles.visibilityToggle}>
            <Icon name={confirmPasswordVisible ? 'eye-off' : 'eye'} size={24} color="white" />
</TouchableOpacity>

          </View>
    <TouchableOpacity style={styles.button} onPress={handleRegister}>
      <Text style={styles.buttonText}>Zarejestruj</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={() => {
      setShowRegistrationForm(false);
      setShowRegistrationCheckForm(true);
    }}>
      <Text style={styles.buttonText}>Wróć</Text>
    </TouchableOpacity>
  </>
)}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  visibilityToggle: {
    marginLeft: 10,
    padding: 5,
  },
  button: {
    backgroundColor: '#ff3333',
    width: '100%',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerText: {
    marginBottom: 10,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  divider: {
    flex: 1,
    height: 1,
  },
  orText: {
    marginHorizontal: 10,

  },
  googleButton: {
    backgroundColor: '#4285F4', // Niebieski kolor Google
    flexDirection: 'row', // Ikona i tekst będą w linii
    justifyContent: 'center', // Centrowanie zawartości
    alignItems: 'center', // Wyśrodkowanie zawartości w pionie
    padding: 15, // Odpowiednie wypełnienie
    borderRadius: 5, // Zaokrąglenie krawędzi
    width: '100%', // Szerokość przycisku na całą dostępną szerokość
    marginBottom: 10, // Margines od dolu
  },
  googleButtonText: {
    color: '#ffffff', // Biały tekst
    fontSize: 18, // Rozmiar czcionki
    fontWeight: 'bold', // Pogrubienie tekstu
    marginLeft: 10, // Margines z lewej strony dla tekstu, aby zachować odstęp od ikony
  },
  
});

export default Zelaskiewicz;
