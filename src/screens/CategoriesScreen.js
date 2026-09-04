import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  FlatList, StatusBar, Animated, Switch, SafeAreaView,
} from 'react-native';
import { CATEGORIES } from '../questions';
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
      </View>

      <FlatList
        data={CATEGORIES}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
        scrollEnabled={true}
        contentContainerStyle={styles.listContent}
      />

      <View style={styles.musicRow}>
        <Text style={styles.musicLabel}>{L.music}</Text>
        <Switch
          value={musicOn}
          onValueChange={toggleMusic}
          trackColor={{ false: '#444', true: '#4CAF50' }}
          thumbColor={musicOn ? '#8BC34A' : '#888'}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0F24' },
  header: { alignItems: 'center', marginVertical: 20 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#FFF', marginTop: 10 },
  subtitle: { fontSize: 16, color: '#AAA', marginTop: 8 },
  langRow: { flexDirection: 'row', justifyContent: 'center', gap: 10, marginVertical: 15 },
  langBtn: { paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20, backgroundColor: '#1A2340' },
  langBtnActive: { backgroundColor: '#4CAF50' },
  langBtnText: { color: '#AAA', fontWeight: '600' },
  langBtnTextActive: { color: '#FFF' },
  listContent: { paddingHorizontal: 10, paddingBottom: 80 },
  card: { marginVertical: 8, padding: 15, backgroundColor: '#1A2340', borderRadius: 10, flexDirection: 'row', alignItems: 'center' },
  cardIcon: { fontSize: 28, marginRight: 10 },
  cardLabel: { flex: 1, fontSize: 18, fontWeight: '600' },
  cardArrow: { fontSize: 24, color: '#888' },
  musicRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 15, borderTopColor: '#333', borderTopWidth: 1, backgroundColor: '#0A0F24' },
  musicLabel: { fontSize: 16, color: '#FFF', fontWeight: '600' },
});
