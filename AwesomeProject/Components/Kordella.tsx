import React, { useRef, useEffect, useState } from 'react';
import { Animated, View, StyleSheet } from 'react-native';

const logoImage = require('../shared/logo_alpha.png');

const Kordella = () => {
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
      useNativeDriver: false, // Note: useNativeDriver should be false for non-transform properties.
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

    // Sequence the animations
    Animated.sequence([
      textAnimations, // Start text animations immediately
      borderAnimation, // Then start the border animation
      //Animated.delay(500), // Wait for the border animation to complete
      imageAnimations, // Finally, start the image animations
    ]).start();
  }, [textWidth]);

  const textStyle = {
    opacity,
    transform: [{ scale }],
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Animated.Text
          style={[styles.logoText, textStyle]}
          onLayout={(event) => {
            const { width } = event.nativeEvent.layout;
            if (textWidth === 0) setTextWidth(width*2); // Correctly set the width for borderScale
          }}
        >
          OwlGuard
        </Animated.Text>
        <Animated.View style={[styles.border, { width: borderScale }]} />
        <Animated.Image
          source={logoImage}
          resizeMode="contain"
          style={[styles.logoImage, {
            opacity: imageOpacity,
            transform: [{ translateY: imageY.interpolate({
                inputRange: [0, 1],
                outputRange: [-50, 0], // Adjust based on desired final position
              }) 
            }]
          }]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logoText: {
    color: '#EEE',
    fontWeight: 'bold',
    fontSize: 32,
  },
  border: {
    height: 15,
    backgroundColor: '#EEE',
    marginTop: 35,
  },
  logoImage: {
    width: 150,
    height: 150,
    marginTop: 20,
  },
});

export default Kordella;
