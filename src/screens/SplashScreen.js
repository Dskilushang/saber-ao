import React, { useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, Animated,
  StatusBar, Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');

const Bulb = ({ delay = 0 }) => {
  const opacity = useRef(new Animated.Value(0.3)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(opacity, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.3, duration: 400, useNativeDriver: true }),
      ])
    ).start();
  }, []);
  return <Animated.View style={[styles.bulb, { opacity }]} />;
};

const BulbRow = ({ count = 8 }) => (
  <View style={styles.bulbRow}>
    {Array.from({ length: count }).map((_, i) => (
      <Bulb key={i} delay={i * 100} />
    ))}
  </View>
);

export default function SplashScreen({ navigation }) {
  const scaleAnim = useRef(new Animated.Value(0.7)).current;
  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const rayAnim   = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, friction: 5, useNativeDriver: true }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(rayAnim, { toValue: 1, duration: 2000, useNativeDriver: true }),
          Animated.timing(rayAnim, { toValue: 0.6, duration: 2000, useNativeDriver: true }),
        ])
      ),
    ]).start();

    const t = setTimeout(() => {
      Animated.timing(fadeAnim, { toValue: 0, duration: 400, useNativeDriver: true }).start(() => {
        navigation.replace('Accueil');
      });
    }, 3000);

    return () => clearTimeout(t);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0E1A" />

      {/* Rayons dorés */}
      <Animated.View style={[styles.rays, { opacity: rayAnim }]} />

      <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }], alignItems: 'center' }}>

        {/* Ampoules haut */}
        <BulbRow count={9} />

        {/* Cadre ovale */}
        <View style={styles.ovalFrame}>
          <View style={styles.ovalInner}>

            {/* Drapeau Angola */}
            <View style={styles.flagRow}>
              <View style={styles.flagMini}>
                <View style={styles.flagR} />
                <Vi
