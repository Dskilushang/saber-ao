import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Animated,
} from 'react-native';

import Mascotte, {
  MASCOTTE_STATES,
} from '../components/Mascotte';

import SoundManager from '../utils/soundManager';
import { COLORS } from '../theme';

export default function AccueilScreen({ route, navigation }) {
  const { lang = 'pt' } = route.params || {};

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0.5)).current;

  const L = {
    pt: {
      subtitle: 'O grande jogo de perguntas',
      play: 'JOGAR',
      playSub: 'COMEÇAR O DESAFIO',
      rules: 'Como jogar',
      language: 'Português',
    },

    fr: {
      subtitle: 'Le grand jeu de questions',
      play: 'JOUER',
      playSub: 'COMMENCER LE DÉFI',
      rules: 'Comment jouer',
      language: 'Français',
    },
  }[lang] || {
    subtitle: 'O grande jogo de perguntas',
    play: 'JOGAR',
    playSub: 'COMEÇAR O DESAFIO',
    rules: 'Como jogar',
    language: 'Português',
  };

  useEffect(() => {
    SoundManager.init();
    SoundManager.playBgMusic();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.04,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.45,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    return () => {
      SoundManager.stopBgMusic();
    };
  }, []);

  const startGame = async () => {
    await SoundManager.onClick();

    navigation.navigate('Quiz', {
      lang,
    });
  };

  const showRules = () => {
    SoundManager.onClick();

    alert(
      lang === 'fr'
        ? 'Répondez aux questions avant la fin du temps. Utilisez vos jokers au bon moment !'
        : 'Responda às perguntas antes do fim do tempo. Use os seus jokers no momento certo!'
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.background}
      />

      {/* LUMIÈRES DÉCORATIVES */}
      <Animated.View
        style={[
          styles.lightLeft,
          { opacity: glowAnim },
        ]}
      />

      <Animated.View
        style={[
          styles.lightRight,
          { opacity: glowAnim },
        ]}
      />

      {/* EN-TÊTE */}
      <View style={styles.topBar}>
        <View style={styles.flagMark}>
          <View style={styles.flagRed} />
          <View style={styles.flagBlack} />
          <Text style={styles.flagStar}>★</Text>
        </View>

        <Text style={styles.topTitle}>
          SABER AO
        </Text>

        <TouchableOpacity
          style={styles.languageButton}
          onPress={() => {
            SoundManager.onClick();

            navigation.navigate('Accueil', {
              lang: lang === 'pt' ? 'fr' : 'pt',
            });
          }}
        >
          <Text style={styles.languageText}>
            {lang === 'pt' ? 'PT' : 'FR'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* LOGO */}
      <View style={styles.logoArea}>
        <Text style={styles.logoText}>
          SABER
        </Text>

        <Text style={styles.logoAO}>
          AO
        </Text>

        <View style={styles.logoLine} />

        <Text style={styles.subtitle}>
          {L.subtitle}
        </Text>
      </View>

      {/* MASCOTTE */}
      <Animated.View
        style={[
          styles.mascotteArea,
          {
            transform: [
              {
                scale: pulseAnim,
              },
            ],
          },
        ]}
      >
        <Mascotte
          state={MASCOTTE_STATES.BIENVENUE}
          size={180}
        />
      </Animated.View>

      {/* BOUTON PRINCIPAL */}
      <View style={styles.playArea}>
        <TouchableOpacity
          activeOpacity={0.82}
          style={styles.playButton}
          onPress={startGame}
        >
          <Text style={styles.playText}>
            {L.play}
          </Text>

          <Text style={styles.playSubText}>
            {L.playSub}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.rulesButton}
          onPress={showRules}
        >
          <Text style={styles.rulesText}>
            ℹ️ {L.rules}
          </Text>
        </TouchableOpacity>
      </View>

      {/* PIED DE PAGE */}
      <View style={styles.footer}>
        <View style={styles.footerLine} />

        <Text style={styles.footerText}>
          {L.language}
        </Text>

        <Text style={styles.version}>
          SABER AO • 1.0
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    overflow: 'hidden',
  },

  lightLeft: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: COLORS.red,
    left: -100,
    top: 120,
  },

  lightRight: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: COLORS.gold,
    right: -100,
    top: 260,
  },

  topBar: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    justifyContent: 'space-between',
  },

  flagMark: {
    width: 34,
    height: 26,
    borderRadius: 5,
    overflow: 'hidden',
    position: 'relative',
  },

  flagRed: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 13,
    backgroundColor: COLORS.red,
  },

  flagBlack: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 13,
    backgroundColor: '#050505',
  },

  flagStar: {
    position: 'absolute',
    alignSelf: 'center',
    top: 2,
    color: COLORS.gold,
    fontSize: 16,
  },

  topTitle: {
    color: COLORS.gold,
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: 3,
  },

  languageButton: {
    minWidth: 42,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,211,106,0.08)',
  },

  languageText: {
    color: COLORS.gold,
    fontSize: 12,
    fontWeight: '900',
  },

  logoArea: {
    alignItems: 'center',
    marginTop: 18,
  },

  logoText: {
    color: COLORS.text,
    fontSize: 44,
    fontWeight: '900',
    letterSpacing: 5,
  },

  logoAO: {
    color: COLORS.gold,
    fontSize: 46,
    fontWeight: '900',
    letterSpacing: 7,
    marginTop: -8,
  },

  logoLine: {
    width: 90,
    height: 3,
    backgroundColor: COLORS.gold,
    borderRadius: 2,
    marginTop: 5,
  },

  subtitle: {
    color: COLORS.textMuted,
    fontSize: 13,
    marginTop: 9,
    textAlign: 'center',
    letterSpacing: 0.5,
  },

  mascotteArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 210,
  },

  playArea: {
    alignItems: 'center',
    paddingHorizontal: 30,
    marginBottom: 18,
  },

  playButton: {
    width: '100%',
    maxWidth: 340,
    minHeight: 76,
    borderRadius: 18,
    backgroundColor: '#168A4A',
    borderWidth: 1,
    borderColor: '#6BE09A',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },

  playText: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: '900',
    letterSpacing: 3,
  },

  playSubText: {
    color: '#E9FFE9',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginTop: 2,
  },

  rulesButton: {
    marginTop: 13,
    paddingVertical: 8,
    paddingHorizontal: 18,
  },

  rulesText: {
    color: COLORS.gold,
    fontSize: 12,
    fontWeight: '700',
  },

  footer: {
    alignItems: 'center',
    paddingBottom: 12,
  },

  footerLine: {
    width: 45,
    height: 2,
    backgroundColor: 'rgba(255,211,106,0.42)',
    marginBottom: 6,
  },

  footerText: {
    color: COLORS.textMuted,
    fontSize: 10,
  },

  version: {
    color: '#75664B',
    fontSize: 9,
    marginTop: 3,
  },
});    
