import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet } from 'react-native';

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

export default function Mascotte({ state = 'bienvenue', size = 120, style }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    scaleAnim.setValue(1);
    bounceAnim.setValue(0);

    if (state === 'bonne_reponse') {
      Animated.loop(
        Animated.sequence([
          Animated.timing(bounceAnim, { toValue: -22, duration: 250, useNativeDriver: true }),
          Animated.timing(bounceAnim, { toValue: 0, duration: 250, useNativeDriver: true }),
        ]),
        { iterations: 3 }
      ).start();
    } else if (state === 'celebration') {
      Animated.sequence([
        Animated.spring(scaleAnim, { toValue: 1.15, friction: 3, useNativeDriver: true }),
        Animated.loop(
          Animated.sequence([
            Animated.timing(bounceAnim, { toValue: -18, duration: 300, useNativeDriver: true }),
            Animated.timing(bounceAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
          ]),
          { iterations: 4 }
        ),
      ]).start();
    } else if (state === 'mauvaise_reponse') {
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 1.12, duration: 70, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 0.88, duration: 70, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1.09, duration: 70, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 0.91, duration: 70, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1.0, duration: 70, useNativeDriver: true }),
      ]).start();
    } else if (state === 'surpris') {
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 1.35, duration: 180, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 0.92, duration: 140, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1.0, duration: 140, useNativeDriver: true }),
      ]).start();
    } else if (state === 'suspense') {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, { toValue: 1.05, duration: 600, useNativeDriver: true }),
          Animated.timing(scaleAnim, { toValue: 0.95, duration: 600, useNativeDriver: true }),
        ])
      ).start();
    }
  }, [state]);

  const emoji = {
    bienvenue: '🦁',
    question: '🤔',
    invitation: '👋',
    reflexion: '💭',
    bonne_reponse: '😄',
    mauvaise_reponse: '😢',
    surpris: '😮',
    suspense: '😰',
    celebration: '🏆',
    encerramento: '👏',
  }[state] || '🦁';

  return (
    <Animated.View
      style={[
        styles.container,
        style,
        {
          transform: [
            { scale: scaleAnim },
            { translateY: bounceAnim },
          ],
          width: size,
          height: size,
        },
      ]}
    >
      <View style={[styles.circle, { width: size, height: size, borderRadius: size / 2 }]}>
        <Animated.Text style={[styles.emoji, { fontSize: size * 0.6 }]}>
          {emoji}
        </Animated.Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  emoji: {
    textAlign: 'center',
  },
});
