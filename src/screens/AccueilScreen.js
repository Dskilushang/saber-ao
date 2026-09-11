import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, StyleSheet, Animated,
  TouchableOpacity, StatusBar, ScrollView
} from 'react-native';

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

const BulbRow = ({ count = 6 }) => (
  <View style={styles.bulbRow}>
    {Array.from({ length: count }).map((_, i) => (
      <Bulb key={i} delay={i * 120} />
    ))}
  </View>
);

const LogoMini = () => (
  <View style={styles.logoOval}>
    <View style={styles.logoInner}>
      <Text style={styles.logoSaber}>SABER</Text>
      <View style={styles.logoAoRow}>
        <Text style={styles.logoAO}>AO</Text>
        <Text style={styles.logoQ}>?</Text>
        <View style={styles.flagMini}>
          <View style={styles.flagR} />
          <View style={styles.flagB} />
        </View>
      </View>
    </View>
    <View style={styles.logoAbcd}>
      {[['A','abcdA'],['B','abcdB'],['C','abcdC'],['D','abcdB']].map(([l, s]) => (
        <View key={l} style={[styles.abcdBtn, styles[s]]}>
          <Text style={[styles.abcdTxt, s === 'abcdC' && { color: '#000' }]}>{l}</Text>
        </View>
      ))}
    </View>
    <Text style={styles.logoMic}>🎙️</Text>
  </View>
);

const CATEGORIES = [
  { id: 'historia',  label_pt: 'História',  label_fr: 'Histoire',   icon: '🏛️', color: '#E53935' },
  { id: 'geografia', label_pt: 'Geografia', label_fr: 'Géographie', icon: '️', color: '#43A047' },
  { id: 'cultura',   label_pt: 'Cultura',   label_fr: 'Culture',    icon: '🎭', color: '#8E24AA' },
  { id: 'musica',    label_pt: 'Música',    label_fr: 'Musique',    icon: '🎵', color: '#FB8C00' },
  { id: 'ciencia',   label_pt: 'Ciência',   label_fr: 'Science',    icon: '🔬', color: '#1E88E5' },
  { id: 'desporto',  label_pt: 'Desporto',  label_fr: 'Sport',      icon: '⚽', color: '#16A085' },
];

export default function AccueilScreen({ navigation }) {
  const [lang, setLang] = useState('pt');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <BulbRow count={6} />
      <LogoMini />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {CATEGORIES.map((cat) => (
          <TouchableOpacity 
            key={cat.id} 
            style={[styles.categoryCard, { backgroundColor: cat.color }]}
            onPress={() => console.log(`Navigation vers ${cat.id}`)}
          >
            <Text style={styles.categoryIcon}>{cat.icon}</Text>
            <Text style={styles.categoryLabel}>
              {lang === 'pt' ? cat.label_pt : cat.label_fr}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#121212' 
  },
  bulbRow: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    marginVertical: 10 
  },
  bulb: { 
    width: 12, 
    height: 12, 
    borderRadius: 6, 
    backgroundColor: '#FFD700', 
    marginHorizontal: 4 
  },
  logoOval: { 
    alignItems: 'center', 
    marginVertical: 20 
  },
  logoInner: { 
    alignItems: 'center' 
  },
  logoSaber: { 
    color: '#FFF', 
    fontSize: 32, 
    fontWeight: 'bold' 
  },
  logoAoRow: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  logoAO: { 
    color: '#FFD700', 
    fontSize: 28, 
    fontWeight: 'bold' 
  },
  logoQ: { 
    color: '#FFF', 
    fontSize: 28, 
    fontWeight: 'bold', 
    marginHorizontal: 5 
  },
  flagMini: { 
    flexDirection: 'row', 
    width: 30, 
    height: 20, 
    borderRadius: 3, 
    overflow: 'hidden' 
  },
  flagR: { 
    flex: 1, 
    backgroundColor: '#FF0000' 
  },
  flagB: { 
    flex: 1, 
    backgroundColor: '#000000' 
  },
  logoAbcd: { 
    flexDirection: 'row', 
    marginTop: 15 
  },
  abcdBtn: { 
    width: 30, 
    height: 30, 
    borderRadius: 15, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginHorizontal: 5 
  },
  abcdA: { backgroundColor: '#E53935' },
  abcdB: { backgroundColor: '#1E88E5' },
  abcdC: { backgroundColor: '#FFD700' },
  abcdTxt: { 
    color: '#FFF', 
    fontWeight: 'bold' 
  },
  logoMic: { 
    fontSize: 24, 
    marginTop: 10 
  },
  scrollContent: { 
    padding: 20 
  },
  categoryCard: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 15, 
    borderRadius: 10, 
    marginBottom: 10 
  },
  categoryIcon: { 
    fontSize: 24, 
    marginRight: 15 
  },
  categoryLabel: { 
    color: '#FFF', 
    fontSize: 18, 
    fontWeight: 'bold' 
  }
});
