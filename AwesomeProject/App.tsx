import * as React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useColorScheme } from 'react-native';
import Kozakowski from './Components/Kozakowski';
import Jacoszek from './Components/Jacoszek';
import Kordella from './Components/Kordella';
import Switalski from './Components/Switalski';
import Zelazkiewicz from './Components/Zelazkiewicz';
import Mrowinski from './Components/Mrowinski';
import HomeScreen from './Components/HomeScreen';
import { CustomDarkTheme, CustomLightTheme } from './Components/Theme'; 

const Stack = createNativeStackNavigator();



function App() {
  const scheme = useColorScheme();
  return (
    <NavigationContainer theme={scheme === 'dark' ? CustomDarkTheme : CustomLightTheme}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Welcome' }} />
        <Stack.Screen name="Kozakowski" component={Kozakowski} />
        <Stack.Screen name="Jacoszek" component={Jacoszek} />
        <Stack.Screen name="Kordella" component={Kordella} />
        <Stack.Screen name="Switalski" component={Switalski} />
        <Stack.Screen name="Zelazkiewicz" component={Zelazkiewicz} />
        <Stack.Screen name="Mrowinski" component={Mrowinski} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
