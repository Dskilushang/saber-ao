import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  StatusBar,
  Dimensions,
  Easing,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const GOLD = '#FFD36A';
const DARK_GOLD = '#A66B16';

// --------------------------------------------------
// PARTICULES EN ORBITE
// --------------------------------------------------

function GoldOrbit({ rotation }) {
  const particles = [
    { left: '0%', top: '48%' },
    { left: '18%', top: '5%' },
    { left: '48%', top: '0%' },
    { left: '82%', top: '12%' },
    { left: '100%', top: '50%' },
    { left: '75%', top: '90%' },
    { left: '25%', top: '92%' },
  ];

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.orbit,
        { transform: [{ rotate: rotation }] },
      ]}
    >
      {particles.map((particle, index) => (
        <View
          key={index}
          style={[
            styles.orbitParticle,
            particle,
            { opacity: index % 2 === 0 ? 1 : 0.65 },
          ]}
        />
      ))}
    </Animated.View>
  );
}

// --------------------------------------------------
// MÉTÉORITES
// --------------------------------------------------

function Meteor({ delay = 0, duration = 2600, top = 100 }) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(progress, {
          toValue: 1,
          duration,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(progress, {
          toValue: 0,
          duration: 1,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();

    return () => animation.stop();
  }, []);

  const opacity = progress.interpolate({
    inputRange: [0, 0.12, 0.75, 1],
    outputRange: [0, 1, 0.8, 0],
  });

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.meteor,
        {
          top,
          opacity,
          transform: [
            {
              translateX: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [-width * 0.35, width * 1.3],
              }),
            },
            {
              translateY: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [-30, height * 0.45],
              }),
            },
            { rotate: '35deg' },
          ],
        },
      ]}
    >
      <View style={styles.meteorTail} />
      <View style={styles.meteorHead} />
    </Animated.View>
  );
}

// --------------------------------------------------
// TISSUS ROUGE ET NOIR STYLISÉS
// --------------------------------------------------

function FabricWave({ color, top, bottom, reverse = false }) {
  const wave = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(wave, {
          toValue: 1,
          duration: 2800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(wave, {
          toValue: 0,
          duration: 2800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();

    return () => animation.stop();
  }, []);

  const position = wave.interpolate({
    inputRange: [0, 1],
    outputRange: reverse ? [18, -18] : [-18, 18],
  });

  const angle = wave.interpolate({
    inputRange: [0, 1],
    outputRange: reverse ? ['5deg', '-5deg'] : ['-5deg', '5deg'],
  });

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.fabric,
        {
          backgroundColor: color,
          top,
          bottom,
          transform: [
            { translateX: position },
            { rotate: angle },
            { skewX: '-16deg' },
          ],
        },
      ]}
    />
  );
}

// --------------------------------------------------
// ÉCRAN SPLASH
// --------------------------------------------------

export default function SplashScreen({ navigation }) {
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.88)).current;

  const sloganOpacity = useRef(new Animated.Value(0)).current;
  const glowScale = useRef(new Animated.Value(0.75)).current;
  const glowOpacity = useRef(new Animated.Value(0.15)).current;

  const orbitRotation = useRef(new Animated.Value(0)).current;
  const progress = useRef(new Animated.Value(0)).current;
  const exitOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Apparition simple du logo
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 1100,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 7,
        tension: 35,
        useNativeDriver: true,
      }),
    ]).start();

    // Apparition discrète du slogan
    Animated.sequence([
      Animated.delay(900),
      Animated.timing(sloganOpacity, {
        toValue: 1,
        duration: 850,
        useNativeDriver: true,
      }),
    ]).start();

    // Diffusion des halos dorés
    const glowAnimation = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(glowScale, {
            toValue: 1.18,
            duration: 2300,
            useNativeDriver: true,
          }),
          Animated.timing(glowOpacity, {
            toValue: 0.42,
            duration: 2300,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(glowScale, {
            toValue: 0.85,
            duration: 2300,
            useNativeDriver: true,
          }),
          Animated.timing(glowOpacity, {
            toValue: 0.16,
            duration: 2300,
            useNativeDriver: true,
          }),
        ]),
      ])
    );

    // Rotation lente de l'orbite
    const orbitAnimation = Animated.loop(
      Animated.timing(orbitRotation, {
        toValue: 1,
        duration: 18000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    // Progression du chargement
    Animated.timing(progress, {
      toValue: 1,
      duration: 4800,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();

    glowAnimation.start();
    orbitAnimation.start();

    // Transition vers l'accueil
    const timer = setTimeout(() => {
      Animated.timing(exitOpacity, {
        toValue: 0,
        duration: 550,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished && navigation) {
          navigation.replace('Accueil');
        }
      });
    }, 5500);

    return () => {
      clearTimeout(timer);
      glowAnimation.stop();
      orbitAnimation.stop();
    };
  }, []);

  const rotation = orbitRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const progressScale = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <Animated.View style={[styles.container, { opacity: exitOpacity }]}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#050505"
      />

      {/* Fond sombre */}
      <View style={styles.background} />

      {/* Tissus animés */}
      <FabricWave color="#750016" top={height * 0.08} />
      <FabricWave color="#161616" bottom={height * 0.08} reverse />

      {/* Météorites */}
      <Meteor delay={200} duration={3000} top={height * 0.12} />
      <Meteor delay={1400} duration={3500} top={height * 0.3} />
      <Meteor delay={2600} duration={3200} top={height * 0.02} />

      {/* Halo doré autour du logo */}
      <Animated.View
        pointerEvents="none"
        style={[
          styles.goldGlow,
          {
            opacity: glowOpacity,
            transform: [{ scale: glowScale }],
          },
        ]}
      />

      <Animated.View
        pointerEvents="none"
        style={[
          styles.goldGlowInner,
          {
            opacity: glowOpacity,
            transform: [{ scale: glowScale }],
          },
        ]}
      />

      {/* Orbite de particules */}
      <GoldOrbit rotation={rotation} />

      {/* Contenu principal */}
      <View style={styles.content}>

        {/* Logo principal */}
        <Animated.View
          style={{
            opacity: logoOpacity,
            transform: [{ scale: logoScale }],
          }}
        >
          <Image
            source={require('../../Icône.png')}
            style={styles.logo}
            resizeMode="contain"
            accessibilityLabel="Logo SABER AO"
          />
        </Animated.View>

        {/* Slogan */}
        <Animated.View
          style={{
            opacity: sloganOpacity,
            alignItems: 'center',
          }}
        >
          <Text style={styles.slogan}>
            O GRANDE JOGO DE PERGUNTAS
          </Text>

          <View style={styles.sloganLine} />
        </Animated.View>

        {/* Chargement */}
        <View style={styles.loadingContainer}>
          <View style={styles.progressTrack}>
            <Animated.View
              style={[
                styles.progressFill,
                { transform: [{ scaleX: progressScale }] },
              ]}
            />
          </View>

          <Text style={styles.loadingText}>
            Carregando...
          </Text>
        </View>

      </View>
    </Animated.View>
  );
}

// --------------------------------------------------
// STYLES
// --------------------------------------------------

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050505',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },

  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#050505',
  },

  content: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
  },

  logo: {
    width: Math.min(width * 0.58, 250),
    height: Math.min(width * 0.58, 250),
  },

  // Halos dorés diffus
  goldGlow: {
    position: 'absolute',
    width: width * 0.8,
    height: width * 0.65,
    borderRadius: width,
    backgroundColor: 'rgba(255, 170, 35, 0.13)',
    zIndex: 1,
  },

  goldGlowInner: {
    position: 'absolute',
    width: width * 0.55,
    height: width * 0.45,
    borderRadius: width,
    backgroundColor: 'rgba(255, 205, 90, 0.10)',
    zIndex: 2,
  },

  // Orbite
  orbit: {
    position: 'absolute',
    width: width * 0.83,
    height: width * 0.56,
    borderRadius: width,
    borderWidth: 1,
    borderColor: 'rgba(255, 190, 70, 0.22)',
    zIndex: 3,
  },

  orbitParticle: {
    position: 'absolute',
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: GOLD,
    shadowColor: GOLD,
    shadowOpacity: 0.9,
    shadowRadius: 8,
    elevation: 5,
  },

  // Météorites
  meteor: {
    position: 'absolute',
    left: -100,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2,
  },

  meteorTail: {
    width: 75,
    height: 2,
    backgroundColor: DARK_GOLD,
    opacity: 0.75,
  },

  meteorHead: {
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: '#FFF1B5',
    shadowColor: GOLD,
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 5,
  },

  // Tissus stylisés
  fabric: {
    position: 'absolute',
    left: -width * 0.15,
    width: width * 1.3,
    height: height * 0.13,
    borderRadius: 100,
    opacity: 0.24,
    zIndex: 1,
  },

  // Slogan
  slogan: {
    color: GOLD,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 2.2,
    textAlign: 'center',
    marginTop: 12,
    textShadowColor: 'rgba(255, 180, 40, 0.6)',
    textShadowRadius: 8,
    textShadowOffset: { width: 0, height: 1 },
  },

  sloganLine: {
    width: 90,
    height: 2,
    backgroundColor: DARK_GOLD,
    marginTop: 12,
    borderRadius: 2,
  },

  // Barre de progression
  loadingContainer: {
    position: 'absolute',
    top: Math.min(height * 0.34, 260),
    width: width * 0.62,
    alignItems: 'center',
  },

  progressTrack: {
    width: '100%',
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 5,
    overflow: 'hidden',
  },

  progressFill: {
    width: '100%',
    height: '100%',
    backgroundColor: GOLD,
    borderRadius: 5,
    transformOrigin: 'left',
    shadowColor: GOLD,
    shadowOpacity: 1,
    shadowRadius: 5,
  },

  loadingText: {
    color: '#D8B76A',
    fontSize: 11,
    letterSpacing: 2,
    marginTop: 12,
    fontWeight: '600',
  },
});
