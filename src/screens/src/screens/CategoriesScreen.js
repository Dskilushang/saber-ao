import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  FlatList, StatusBar, Animated, Switch, SafeAreaView,
} from 'react-native';
import { CATEGORIES } from '../data/questions';
import Mascotte, { MASCOTTE_STATES } from '../components/Mascotte';
import SoundManager from '../utils/soundManager';

const LANG_OPTIONS = [
  { code: 'pt', label: 'PT 🇦🇴' },
  { code: 'fr', label: 'FR 🇫🇷' },
];

export default function CategoriesScreen({ navigation }) {
  const [lang, setLang] = useState('pt');
  const [musicOn, setMusicOn] = useState(true);

  const titleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnims = useRef(CATEGORIES.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    Animated.timing(titleAnim, {
      toValue: 1, duration: 600, useNativeDriver: true,
    }).start();

    Animated.stagger(80, fadeAnims.map((anim, i) =>
      Animated.timing(anim, {
        toValue: 1, duration: 400,
        delay: 150 + i * 100,
        useNativeDriver: true,
      })
    )).start();

    SoundManager.playBgMusic();
    return () => SoundManager.stopBgMusic();
  }, []);

  const toggleMusic = (val) => {
    setMusicOn(val);
    SoundManager.setMusicEnabled(val);
  };

  const selectCategory = async (cat) => {
    await SoundManager.onClick();
    navigation.navigate('Quiz', { categoryId: cat.id, lang });
  };

  const LABELS = {
    pt: { subtitle: 'Escolhe uma categoria', music: 'Música' },
    fr: { subtitle: 'Choisissez une catégorie', music: 'Musique' },
  };
  const L = LABELS[lang];

  const renderCategory = ({ item, index }) => {
    const anim = fadeAnims[index];
    const catLabel = lang === 'fr' ? item.label_fr : item.label_pt;
    return (
      <Animated.View style={{
        opacity: anim,
        transform: [{ translateY: anim.interpolate({
          inputRange: [0, 1], outputRange: [30, 0]
        })}]
      }}>
        <TouchableOpacity
          style={[styles.card, { borderLeftColor: item.color, borderLeftWidth: 5 }]}
          onPress={() => selectCategory(item)}
          activeOpacity={0.8}
        >
          <Text style={styles.cardIcon}>{item.icon}</Text>
          <Text style={[styles.cardLabel, { color: item.color }]}>{catLabel}</Text>
          <Text style={styles.cardArrow}>›</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0F24" />

      <Animated.View style={[styles.header, { opacity: titleAnim }]}>
        <Mascotte state={MASCOTTE_STATES.BIENVENUE} size={80} />
        <Text style={styles.title}>SABER AO</Text>
        <Text style={styles.subtitle}>{L.subtitle}</Text>
      </Animated.View>

      <View style={styles.langRow}>
        {LANG_OPTIONS.map((opt) => (
          <TouchableOpacity
            key={opt.code}
            style={[styles.langBtn, lang === opt.code && styles.langBtnActive]}
            onPress={() => setLang(opt.code)}
          >
            <Text style={[styles.langBtnText, lang === opt.code && styles.langBtnTextActive]}>
              {opt.label}
            </Text>
          </TouchableOpacity>
        ))}
