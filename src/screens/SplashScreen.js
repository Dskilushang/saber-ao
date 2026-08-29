
import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';

export default function SplashScreen({ navigation }) {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    // Fade in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();

    // Après 3 secondes → Accueil automatiquement
    const timer = setTimeout(() => {
      navigation.replace('Accueil');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim, alignItems: 'center' }}>
        <Image
          source={require('../assets/mascottes-optimized/00_logo_saber_ao.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.titre}>SABER AO</Text>
        <Text style={styles.sousTitre}>ARENA AI • QUIZ EDITION</Text>
        <Image
          source={require('../assets/mascottes-optimized/mascotte_bienvenue.png')}
          style={styles.mascotte}
          resizeMode="contain"
        />
        <Text style={styles.loading}>A carregar...</Text>
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
  logo: {
    width: 160,
    height: 160,
    marginBottom: 12,
  },
  titre: {
    fontSize: 42,
    fontWeight: '900',
    color: '#FFD700',
    letterSpacing: 4,
  },
  sousTitre: {
    fontSize: 13,
    color: '#6F80A5',
    letterSpacing: 5,
    marginTop: 6,
    marginBottom: 30,
  },
  mascotte: {
    width: 200,
    height: 200,
  },
  loading: {
    color: '#6F80A5',
    fontSize: 13,
    marginTop: 20,
    letterSpacing: 2,
  },
});
