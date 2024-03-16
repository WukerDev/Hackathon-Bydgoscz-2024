import React, { useRef, useEffect, useState } from 'react';
import { Animated, View, StyleSheet, useColorScheme } from 'react-native';

import { CustomLightTheme, CustomDarkTheme } from './Theme';

const logoImage = require('../shared/logo_alpha.png');

const Kordella = () => {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? CustomDarkTheme : CustomLightTheme;
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const borderScale = useRef(new Animated.Value(0)).current;
  const imageOpacity = useRef(new Animated.Value(0)).current;
  const [textWidth, setTextWidth] = useState(0);
  const imageY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const textAnimations = Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 2,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]);

    const borderAnimation = Animated.timing(borderScale, {
      toValue: textWidth,
      duration: 1000,
      useNativeDriver: false,
    });

    const imageAnimations = Animated.parallel([
      Animated.timing(imageOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(imageY, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]);

    Animated.sequence([
      textAnimations,
      borderAnimation,
      imageAnimations,
    ]).start();
  }, [textWidth]);

  const textStyle = {
    opacity,
    transform: [{ scale }],
  };

  // Define styles here to access theme
  const dynamicStyles = getDynamicStyles(theme);

  return (
    <View style={dynamicStyles.container}>
      <View style={dynamicStyles.content}>
        <Animated.Text
          style={[dynamicStyles.logoText, textStyle]}
          onLayout={(event) => {
            const { width } = event.nativeEvent.layout;
            if (textWidth === 0) setTextWidth(width*2);
          }}
        >
          OwlGuard
        </Animated.Text>
        <Animated.View style={[dynamicStyles.border, { width: borderScale }]} />
        <Animated.Image
          source={logoImage}
          resizeMode="contain"
          style={[dynamicStyles.logoImage, {
            opacity: imageOpacity,
            transform: [{ translateY: imageY.interpolate({
                inputRange: [0, 1],
                outputRange: [-50, 0],
              }) 
            }]
          }]}
        />
      </View>
    </View>
  );
};

// Use a function to return styles that depend on the theme
function getDynamicStyles(theme: any) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background, // Example usage of theme
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      alignItems: 'center',
    },
    logoText: {
      color: theme.colors.text, // Accessing theme colors
      fontWeight: 'bold',
      fontSize: 32,
    },
    border: {
      height: 15,
      backgroundColor: theme.colors.primary,
      marginTop: 35,
    },
    logoImage: {
      width: 150,
      height: 150,
      marginTop: 20,
    },
  });
}

export default Kordella;
