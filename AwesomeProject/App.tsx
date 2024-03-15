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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Tab = createBottomTabNavigator();

function App() {
  const scheme = useColorScheme();
  return (
    <NavigationContainer theme={scheme === 'dark' ? CustomDarkTheme : CustomLightTheme}>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Welcome' }} />
        <Tab.Screen name="Kozakowski" component={Kozakowski} options={{ title: 'Kozakowski' }} />
        <Tab.Screen name="Jacoszek" component={Jacoszek} options={{ title: 'Jacoszek' }} />
        <Tab.Screen name="Kordella" component={Kordella} options={{ title: 'Kordella' }} />
        <Tab.Screen name="Switalski" component={Switalski} options={{ title: 'Switalski' }} />
        <Tab.Screen name="Zelazkiewicz" component={Zelazkiewicz} options={{ title: 'Zelazkiewicz' }} />
        <Tab.Screen name="Mrowinski" component={Mrowinski} options={{ title: 'Mrowinski' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
