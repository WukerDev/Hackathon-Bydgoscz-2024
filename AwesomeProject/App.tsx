import * as React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import HomeScreen from './Components/HomeScreen';
import Settings from './Components/Settings';
import Messages from './Components/Messages';
import Kozakowski from './Components/Kozakowski';
import Jacoszek from './Components/Jacoszek';
import Kordella from './Components/Kordella';
import Switalski from './Components/Switalski';
import Zelazkiewicz from './Components/Zelazkiewicz';
import Mrowinski from './Components/Mrowinski';

import { CustomDarkTheme, CustomLightTheme } from './Components/Theme'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const Tab = createBottomTabNavigator();

function App() {
  const scheme = useColorScheme();
  return (
    <NavigationContainer theme={scheme === 'dark' ? CustomDarkTheme : CustomLightTheme}>
      <Tab.Navigator initialRouteName="Home">
      <Tab.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="home" color={color} size={size} />
            ),
          }} 
        />
         <Tab.Screen name="Messages" component={Settings} options={{ title: 'Messages',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="message" color={color} size={size} />
            ), }} />
        <Tab.Screen name="Options" component={Settings} options={{ title: 'Settings',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="settings" color={color} size={size} />
            ), }} />
        <Tab.Screen name="Kozakowski" component={Kozakowski} />
        <Tab.Screen name="Jacoszek" component={Jacoszek} />
        <Tab.Screen name="Kordella" component={Kordella} />
        <Tab.Screen name="Switalski" component={Switalski} />
        <Tab.Screen name="Zelazkiewicz" component={Zelazkiewicz} />
        <Tab.Screen name="Mrowinski" component={Mrowinski} />


      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
