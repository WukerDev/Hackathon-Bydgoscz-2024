import React, { useRef, useEffect, useState } from 'react';
import { Animated, View, StyleSheet } from 'react-native';

const logoImage = require('../shared/logo_alpha.png');

const Kordella = () => {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current; // Assuming you start from the original scale
  const borderScale = useRef(new Animated.Value(0)).current;
  const imageOpacity = useRef(new Animated.Value(0)).current;
  const [textWidth, setTextWidth] = useState(0);
  const imageY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start opacity and scale animations together for the text
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 2, // Adjust as necessary for the desired scale effect
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // After text animations, start the border animation
      Animated.timing(borderScale, {
        toValue: textWidth, // Ensure this animates to the text width
        duration: 1000,
        useNativeDriver: false, // Note: width animation requires useNativeDriver to be false
      }).start(() => {
        // Only after border animation, start the image opacity and movement animations
        Animated.parallel([
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
        ]).start();
      });
    });
  }, [textWidth]);

  const imageAnimatedStyle = {
    opacity: imageY.interpolate({
      inputRange: [0, 0.5, 1], // Mapping the animation progress to 0%, 50%, and 100%
      outputRange: [0, 0.2, 1], // Corresponding opacity values at each stage
    }),
    transform: [
      {
        translateY: imageY.interpolate({
          inputRange: [0, 1],
          outputRange: [-50, 20], // Adjust based on desired final position
        }),
      },
    ],
  };

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
            if (textWidth === 0) setTextWidth(width * 2); // Measure text width only once
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
                outputRange: [-50, 20], // Adjust based on desired final position
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
    fontSize: 32, // Set your base font size here
  },
  border: {
    height: 15,
    backgroundColor: '#EEE',
    marginTop: 35,
  },
  logoImage: {
    width: 150,
    height: 150,
    marginTop: 2,
  },
});

export default Kordella;
