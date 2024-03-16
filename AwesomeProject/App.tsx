import * as React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import HomeScreen from './Components/HomeScreen';
import Settings from './Components/Settings';
import Messages from './Components/Messages';
import Jacoszek from './Components/Jacoszek';
import Kordella from './Components/Kordella';
import Zelazkiewicz from './Components/Zelazkiewicz';
import Mrowinski from './Components/Mrowinski';
import Switalski from './Components/Switalski';
import Kozakowski from './Components/Kozakowski';
import { CustomDarkTheme, CustomLightTheme } from './Components/Theme'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EditProfile from './Components/Settings/Pages/Account/EditProfile';
import Security from './Components/Settings/Pages/Account/Security';
import Logout from './Components/Settings/Pages/Account/Logout';
import SwitchAccount from './Components/Settings/Pages/Account/SwitchAccount';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const SettingsStack = createNativeStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="SettingsMain" component={Settings} options={{ headerShown: false }} />
      <SettingsStack.Screen name="EditProfile" component={EditProfile} />
      <SettingsStack.Screen name="Security" component={Security} />
      <SettingsStack.Screen name="Logout" component={Logout} />
      <SettingsStack.Screen name="SwitchAccount" component={SwitchAccount} />
    </SettingsStack.Navigator>
  );
}

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
         <Tab.Screen name="Messages" component={Switalski} options={{ title: 'Messages',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="message" color={color} size={size} />
            ), }} />
            <Tab.Screen name="Assistant" component={Jacoszek} options={{ title: 'Assistant',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="message" color={color} size={size} />
            ), }} />
<Tab.Screen name="Options" component={SettingsStackScreen} options={{ title: 'Settings',
    tabBarIcon: ({ color, size }) => (
      <MaterialIcons name="settings" color={color} size={size} />
    ), }} />
        <Tab.Screen name="Kordella" component={Kordella} />
        <Tab.Screen name="Zelazkiewicz" component={Zelazkiewicz} />
        <Tab.Screen name="Mrowinski" component={Mrowinski} />



      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
