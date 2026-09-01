import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, StatusBar } from 'react-native';
import Mascotte, { MASCOTTE_STATES } from '../components/Mascotte';
import SoundManager from '../utils/soundManager';

export default function SplashScreen({ navigation }) {
  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    SoundManager.playIntro();
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue:1, duration:800, useNativeDriver:true }),
      Animated.spring(scaleAnim, { toValue:1, friction:4,   useNativeDriver:true }),
    ]).start();

    const t = setTimeout(() => {
      Animated.timing(fadeAnim, { toValue:0, duration:400, useNativeDriver:true }).start(() => {
        navigation.replace('Categories');
      });
    }, 2800);

    return () => clearTimeout(t);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0F24" />
      <Animated.View style={{
        opacity: fadeAnim,
        transform: [{ scale: scaleAnim }],
        alignItems: 'center'
      }}>
        <Mascotte state={MASCOTTE_STATES.BIENVENUE} size={200} />
        <Text style={styles.title}>SABER AO</Text>
        <Text style={styles.sub}>Quiz Angola 🇦🇴</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F24',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 46,
    fontWeight: '900',
    color: '#FFD700',
    letterSpacing: 6,
    marginTop: 16,
  },
  sub: {
    fontSize: 15,
    color: '#AAB4D4',
    marginTop: 8,
    letterSpacing: 2,
  },
});
