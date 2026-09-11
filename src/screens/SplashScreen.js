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
                <View style={styles.flagB} />
              </View>
            </View>

            {/* Logo SABER AO */}
            <Text style={styles.logoSaber}>SABER</Text>
            <View style={styles.logoAoRow}>
              <Text style={styles.logoAO}>AO</Text>
              <Text style={styles.logoQ}>?</Text>
            </View>

            {/* ABCD */}
            <View style={styles.abcdContainer}>
              <View style={[styles.abcdBtn, styles.abcdA]}>
                <Text style={styles.abcdTxt}>A</Text>
              </View>
              <View style={[styles.abcdBtn, styles.abcdB]}>
                <Text style={styles.abcdTxt}>B</Text>
              </View>
              <View style={[styles.abcdBtn, styles.abcdC]}>
                <Text style={[styles.abcdTxt, styles.abcdCText]}>C</Text>
              </View>
              <View style={[styles.abcdBtn, styles.abcdD]}>
                <Text style={styles.abcdTxt}>D</Text>
              </View>
            </View>

            {/* Micro */}
            <Text style={styles.micIcon}>🎙️</Text>
          </View>
        </View>

        {/* Ampoules bas */}
        <BulbRow count={9} />

        {/* Texte chargement */}
        <Text style={styles.loadingText}>Carregando...</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0E1A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rays: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    borderRadius: width,
  },
  bulbRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 8,
  },
  bulb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FFD700',
    marginHorizontal: 5,
  },
  ovalFrame: {
    width: width * 0.85,
    height: width * 0.85,
    borderRadius: width * 0.425,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 3,
    borderColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  ovalInner: {
    width: width * 0.75,
    height: width * 0.75,
    borderRadius: width * 0.375,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  flagRow: {
    marginBottom: 15,
  },
  flagMini: {
    width: 60,
    height: 40,
    borderRadius: 5,
    overflow: 'hidden',
  },
  flagR: {
    flex: 1,
    backgroundColor: '#CC092F',
  },
  flagB: {
    flex: 1,
    backgroundColor: '#000000',
  },
  logoSaber: {
    color: '#FFF',
    fontSize: 36,
    fontWeight: 'bold',
    letterSpacing: 3,
    marginBottom: 5,
  },
  logoAoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoAO: {
    color: '#FFD700',
    fontSize: 32,
    fontWeight: 'bold',
  },
  logoQ: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  abcdContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  abcdBtn: {
    width: 45,
    height: 45,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  abcdA: { backgroundColor: '#E53935' },
  abcdB: { backgroundColor: '#1E88E5' },
  abcdC: { backgroundColor: '#FFD700' },
  abcdD: { backgroundColor: '#43A047' },
  abcdTxt: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  abcdCText: {
    color: '#000',
  },
  micIcon: {
    fontSize: 32,
    marginTop: 10,
  },
  loadingText: {
    color: '#FFD700',
    fontSize: 16,
    marginTop: 20,
    fontWeight: '600',
  },
});
