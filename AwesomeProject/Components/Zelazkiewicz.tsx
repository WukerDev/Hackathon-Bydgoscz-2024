import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, useColorScheme } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { SHA512 } from 'crypto-js';
import Icon from 'react-native-vector-icons/Ionicons';
import { CustomDarkTheme, CustomLightTheme } from './Theme';
import tw from 'twrnc';

GoogleSignin.configure({
  webClientId: '737570657274-f089gc9a0j6qoi6ki8upek9g80qoif6c.apps.googleusercontent.com', // Zastąp swoim rzeczywistym identyfikatorem klienta web
});

const baseURL = 'http://192.168.35.175:5000'; // Zastąp swoim rzeczywistym adresem API

interface UserCredentials {
  userName: string;
  password: string;
}

const checkUser = async (username: string): Promise<boolean> => {
  try {
    const response = await fetch('http://192.168.35.175:5000/checkIfExist', {
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
    const response = await fetch('http://192.168.35.175:5000/addUser', {
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

async function login({ userName, password }: UserCredentials): Promise<void> {
  try {
    const hashedPassword = hashPassword(password);
    const response = await fetch(`${baseURL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userName: userName, password: hashedPassword }),
    });
    const data = await response.json();
    if (data['login']) {
      Alert.alert('Logowanie zakończone sukcesem', 'Zalogowałeś się pomyślnie.');
    } else {
      Alert.alert('Logowanie nieudane', 'Niepoprawny email lub hasło.');
    }
  } catch (error) {
    console.error('Błąd logowania:', error);
    Alert.alert('Logowanie nieudane', 'Wystąpił błąd podczas próby logowania.');
  }
}

const Zelaskiewicz: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>(''); // Przeniesiono do wnętrza komponentu
  const [showLoginForm, setShowLoginForm] = useState<boolean>(true);
  const [showRegistrationForm, setShowRegistrationForm] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false); // New state for toggling password visibility
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState<boolean>(false); // For the confirm password field
  const [showRegistrationCheckForm, setShowRegistrationCheckForm] = useState<boolean>(false);

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
    <View style={styles.container}>
      {showLoginForm && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Adres e-mail"
            onChangeText={setEmail}
            value={email}
            placeholderTextColor="black"
          />
          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.input, {flex: 1}]}
              placeholder="Hasło"
              secureTextEntry={!passwordVisible} // Toggle based on state
              onChangeText={setPassword}
              value={password}
              placeholderTextColor="black"
            />
            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.visibilityToggle}>
              <Icon name={passwordVisible ? 'eye-off' : 'eye'} size={24} color="black" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleManualLogin}>
            <Text style={styles.buttonText}>Kontynuuj</Text>
          </TouchableOpacity>
          <Text
            style={styles.registerText}
            onPress={toggleForms}
          >
            Nie masz konta? Zarejestruj się
          </Text>
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.orText}>LUB</Text>
            <View style={styles.divider} />
          </View>
          <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
            <Text style={styles.buttonText}>Kontynuuj z Google</Text>
          </TouchableOpacity>
        </>
      )}
      {showRegistrationCheckForm && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Adres e-mail"
            onChangeText={setEmail}
            value={email}
            placeholderTextColor="black"
          />
          <TouchableOpacity style={styles.button} onPress={handleRegisterCheck}>
            <Text style={styles.buttonText}>Kontynuuj</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={toggleForms}>
            <Text style={styles.buttonText}>Wróć</Text>
          </TouchableOpacity>
        </>
      )}
      {showRegistrationForm && (
  <>
    <TextInput
      style={styles.input}
      placeholder="Adres e-mail"
      onChangeText={setEmail}
      value={email}
      placeholderTextColor="black"
    />
    <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.input, {flex: 1}]}
              placeholder="Hasło"
              secureTextEntry={!passwordVisible} // Toggle based on state
              onChangeText={setPassword}
              value={password}
              placeholderTextColor="black"
            />
            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.visibilityToggle}>
            <Icon name={passwordVisible ? 'eye-off' : 'eye'} size={24} color="black" />
</TouchableOpacity>

          </View>
          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.input, {flex: 1}]}
              placeholder="Potwierdź hasło"
              secureTextEntry={!confirmPasswordVisible} // Toggle based on state
              onChangeText={setConfirmPassword}
              value={confirmPassword}
              placeholderTextColor="black"
            />
            <TouchableOpacity onPress={toggleConfirmPasswordVisibility} style={styles.visibilityToggle}>
            <Icon name={confirmPasswordVisible ? 'eye-off' : 'eye'} size={24} color="black" />
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
    backgroundColor: '#fff',
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
    color: 'black', // Dodana właściwość color
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
    backgroundColor: 'green',
    width: '100%',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerText: {
    color: 'blue',
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
    backgroundColor: 'gray',
  },
  orText: {
    marginHorizontal: 10,
  },
  googleButton: {
    // Styles for Google button, if needed
  },
});

export default Zelaskiewicz;
