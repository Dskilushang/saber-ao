import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';

export default function App() {
  // L'application commence sur l'écran 'splash'
  const [screen, setScreen] = useState('splash'); 

  if (screen === 'splash') {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.heroContainer}>
          <Text style={styles.logoIcon}>⚔️</Text>
          <Text style={styles.titleSplash}>SABER AO</Text>
          <Text style={styles.subtitleSplash}>ARENA AI • QUIZ EDITION</Text>
        </View>
        <TouchableOpacity style={styles.btnStart} onPress={() => alert('Le jeu va commencer !')}>
          <Text style={styles.btnStartText}>ENTRER DANS L'ARÈNE</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F24',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  heroContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logoIcon: {
    fontSize: 70,
    marginBottom: 15,
  },
  titleSplash: {
    fontSize: 38,
    fontWeight: '900',
    color: '#FFF',
    letterSpacing: 2,
    textAlign: 'center',
  },
  subtitleSplash: {
    fontSize: 14,
    color: '#6F80A5',
    marginTop: 8,
    letterSpacing: 4,
    textAlign: 'center',
  },
  btnStart: {
    backgroundColor: '#FFD700',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  btnStartText: {
    color: '#0A0F24',
    fontWeight: '800',
    fontSize: 16,
    letterSpacing: 1,
  },
});
