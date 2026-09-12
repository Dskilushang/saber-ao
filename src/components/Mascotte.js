import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';

export const MASCOTTE_STATES = {
  BIENVENUE: 'bienvenue',
  QUESTION: 'question',
  INVITATION: 'invitation',
  REFLEXION: 'reflexion',
  BONNE_REPONSE: 'bonne_reponse',
  MAUVAISE_REPONSE: 'mauvaise_reponse',
  SURPRIS: 'surpris',
  SUSPENSE: 'suspense',
  CELEBRATION: 'celebration',
  ENCERRAMENTO: 'encerramento',
};

// Vraies mascottes SABER AO
const MASCOTTE_IMAGES = {
  bienvenue: require('../../assets/mascottes-optimized/mascotte_bienvenue_anim.webp'),
  question: require('../../assets/mascottes-optimized/mascotte_pergunta.png'),
  invitation: require('../../assets/mascottes-optimized/mascotte_convite_resposta.png'),
  reflexion: require('../../assets/mascottes-optimized/mascotte_a_penser_anim.webp'),
  bonne_reponse: require('../../assets/mascottes-optimized/mascotte_bonne_reponse_anim.webp'),
  mauvaise_reponse: require('../../assets/mascottes-optimized/mascotte_mauvaise_reponse.png'),
  surpris: require('../../assets/mascottes-optimized/mascotte_surpris_anim.webp'),
  suspense: require('../../assets/mascottes-optimized/mascotte_suspense_anim.webp'),
  celebration: require('../../assets/mascottes-optimized/mascotte_celebration_anim.webp'),
  encerramento: require('../../assets/mascottes-optimized/mascotte_encerramento_anim.webp'),
};

export default function Mascotte({
  state = MASCOTTE_STATES.BIENVENUE,
  size = 120,
  style,
}) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Arrête l'animation précédente lors d'un changement d'état
    scaleAnim.stopAnimation();
    bounceAnim.stopAnimation();

    scaleAnim.setValue(1);
    bounceAnim.setValue(0);

    if (state === MASCOTTE_STATES.BONNE_REPONSE) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(bounceAnim, {
            toValue: -22,
            duration: 250,
            useNativeDriver: true,
          }),
          Animated.timing(bounceAnim, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
          }),
        ]),
        { iterations: 3 }
      ).start();
    }

    else if (state === MASCOTTE_STATES.CELEBRATION) {
      Animated.sequence([
        Animated.spring(scaleAnim, {
          toValue: 1.15,
          friction: 3,
          useNativeDriver: true,
        }),
        Animated.loop(
          Animated.sequence([
            Animated.timing(bounceAnim, {
              toValue: -18,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(bounceAnim, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }),
          ]),
          { iterations: 4 }
        ),
      ]).start();
    }

    else if (state === MASCOTTE_STATES.MAUVAISE_REPONSE) {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.12,
          duration: 70,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.88,
          duration: 70,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1.09,
          duration: 70,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.91,
          duration: 70,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 70,
          useNativeDriver: true,
        }),
      ]).start();
    }

    else if (state === MASCOTTE_STATES.SURPRIS) {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.35,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.92,
          duration: 140,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 140,
          useNativeDriver: true,
        }),
      ]).start();
    }

    else if (state === MASCOTTE_STATES.SUSPENSE) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.05,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 0.95,
            duration: 600,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }

    return () => {
      scaleAnim.stopAnimation();
      bounceAnim.stopAnimation();
    };
  }, [state, scaleAnim, bounceAnim]);

  const imageSource =
    MASCOTTE_IMAGES[state] || MASCOTTE_IMAGES[MASCOTTE_STATES.BIENVENUE];

  return (
    <Animated.View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          transform: [
            { scale: scaleAnim },
            { translateY: bounceAnim },
          ],
        },
        style,
      ]}
    >
      <Animated.Image
        source={imageSource}
        resizeMode="contain"
        style={{
          width: size,
          height: size,
        }}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
