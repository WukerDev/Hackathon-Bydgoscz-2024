import * as React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import HomeScreen from './Components/HomeScreen';
import Settings from './Components/Settings';
import Messages from './Components/Messages';
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
         <Tab.Screen name="Messeges" component={Settings} options={{ title: 'Messeges',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="messages" color={color} size={size} />
            ), }} />
        <Tab.Screen name="Options" component={Settings} options={{ title: 'Settings',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="settings" color={color} size={size} />
            ), }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
