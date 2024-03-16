import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Kozakowski from './Components/Kozakowski';
import Jacoszek from './Components/Jacoszek';
import Kordella from './Components/Kordella';
import Switalski from './Components/Switalski';
import Zelazkiewicz from './Components/Zelazkiewicz';
import Mrowinski from './Components/Mrowinski';
import HomeScreen from './Components/HomeScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
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
