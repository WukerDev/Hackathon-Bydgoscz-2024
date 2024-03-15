import React from 'react';
import { View, Button } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  Kozakowski: undefined;
  Jacoszek: undefined;
  Kordella: undefined;
  Switalski: undefined;
  Zelazkiewicz: undefined;
  Mrowinski: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Kozakowski'>;

type Props = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Go to Kozakowski"
        onPress={() => navigation.navigate('Kozakowski')}
      />
      <Button
        title="Go to Jacoszek"
        onPress={() => navigation.navigate('Jacoszek')}
      />
      <Button
        title="Go to Kordella"
        onPress={() => navigation.navigate('Kordella')}
      />
      <Button
        title="Go to Switalski"
        onPress={() => navigation.navigate('Switalski')}
      />
      <Button
        title="Go to Zelazkiewicz"
        onPress={() => navigation.navigate('Zelazkiewicz')}
      />
      <Button
        title="Go to Mrowinski"
        onPress={() => navigation.navigate('Mrowinski')}
      />
    </View>
  );
}

export default HomeScreen;
