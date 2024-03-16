import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CustomDarkTheme,CustomLightTheme } from '../../../Theme';
import { useColorScheme } from 'react-native';
import { StyleSheet } from 'react-native';

const Push_notif: React.FC = () => {
    const scheme = useColorScheme();
    const theme = scheme === 'dark' ? CustomDarkTheme : CustomLightTheme;
    return (
        <View style={[style.ViewMain]}>
            <Icon name="bell" size={80} color={theme.colors.primary} />
            <Text style={{color: theme.colors.text, fontSize: 30}}>Nie działa!</Text>
            <Text style={{color: theme.colors.text, fontSize: 20}}>Spokojnie, już nie długo...</Text>
        </View>
    );
};


const style = StyleSheet.create({
    ViewMain: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default Push_notif;