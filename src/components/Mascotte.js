import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet } from 'react-native';

export const MASCOTTE_STATES = {
  BIENVENUE:        'bienvenue',
  QUESTION:         'question',
  INVITATION:       'invitation',
  REFLEXION:        'reflexion',
  BONNE_REPONSE:    'bonne_reponse',
  MAUVAISE_REPONSE: 'mauvaise_reponse',
  SURPRIS:          'surpris',
  SUSPENSE:         'suspense',
  CELEBRATION:      'celebration',
  ENCERRAMENTO:     'encerramento',
};

const MASCOTTE_IMAGES = {
  bienvenue:        require('../../assets/mascottes-optimized/mascotte_bienvenue_anim.webp'),
  question:         require('../../assets/mascottes-optimized/mascotte_pergunta.png'),
  invitation:       require('../../assets/mascottes-optimized/mascotte_convite_resposta.png'),
  reflexion:        require('../../assets/mascottes-optimized/mascotte_a_penser_anim.webp'),
  bonne_reponse:    require('../../assets/mascottes-optimized/mascotte_bonne_reponse_anim.webp'),
  mauvaise_reponse: require('../../assets/mascottes-optimized/mascotte_mauvaise_reponse.png'),
  surpris:          require('../../assets/mascottes-optimized/mascotte_surpris_anim.webp'),
  suspense:         require('../../assets/mascottes-optimized/mascotte_suspense_anim.webp'),
  celebration:      require('../../assets/mascottes-optimized/mascotte_celebration_anim.webp'),
  encerramento:     require('../../assets/mascottes-optimized/mascotte_encerramento_anim.webp'),
};

export default function Mascotte({ state = 'bienvenue', size = 120, style }) {
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim  = useRef(new Animated.Value(1)).current;
  const shakeAnim  = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    bounceAnim.setValue(0);
    scaleAnim.setValue(1);
    shakeAnim.setValue(0);
    rotateAnim.setValue(0);

    let anim;

    if (state === 'bonne_reponse') {
      anim = Animated.loop(
        Animated.sequence([
          Animated.timing(bounceAnim, { toValue: -22, duration: 250, useNativeDriver: true }),
          Animated.timing(bounceAnim, { toValue: 0,   duration: 250, useNativeDriver: true }),
        ]),
        { iterations: 3 }
      );
    } else if (state === 'celebration') {
      anim = Animated.sequence([
        Animated.spring(scaleAnim, { toValue: 1.15, friction: 3, useNativeDriver: true }),
        Animated.loop(
          Animated.sequence([
            Animated.timing(bounceAnim, { toValue: -18, duration: 300, useNativeDriver: true }),
            Animated.timing(bounceAnim, { toValue: 0,   duration: 300, useNativeDriver: true }),
          ]),
          { iterations: 4 }
        ),
      ]);
    } else if (state === 'mauvaise_reponse') {
      anim = Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 12,  duration: 70, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -12, duration: 70, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 9,   duration: 70, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -9,  duration: 70, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0,   duration: 70, useNativeDriver: true }),
      ]);
    } else if (state === 'surpris') {
      anim = Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 1.35, duration: 180, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 0.92, duration: 140, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1.0,  duration: 140, useNativeDriver: true }),
      ]);
    } else if (state === 'suspense') {
      anim = Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, { toValue: 1.04, duration: 600, useNativeDriver: true }),
          Animated.timing(scaleAnim, { toValue: 0.97, duration: 600, useNativeDriver: true }),
        ])
      );
    } else if (state === 'reflexion') {
      anim = Animated.loop(
        Animated.sequence([
          Animated.timing(rotateAnim, { toValue: 1,  duration: 700, useNativeDriver: true }),
          Animated.timing(rotateAnim, { toValue: -1, duration: 700, useNativeDriver: true }),
          Animated.timing(rotateAnim, { toValue: 0,  duration: 700, useNativeDriver: true }),
        ])
      );
    } else {
      anim = Animated.loop(
        Animated.sequence([
          Animated.timing(bounceAnim, { toValue: -6, duration: 900, useNativeDriver: true }),
          Animated.timing(bounceAnim, { toValue: 0,  d
