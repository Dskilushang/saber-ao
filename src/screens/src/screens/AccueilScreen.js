// src/screens/AccueilScreen.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function AccueilScreen({ navigation }) {
  return (
    <View style={styles.container}>

      {/* Logo navbar */}
      <View style={styles.navbar}>
        <Image
          source={require('../../assets/mascottes-optimized/00_logo_saber_ao.png')}
          style={styles.navLogo}
          resizeMode="contain"
        />
        <Text style={styles.navTitre}>SABER AO</Text>
      </View>

      {/* Mascotte accueil */}
      <Image
        source={require('../../assets/mascottes-optimized/mascotte_bienvenue.png')}
        style={styles.mascotte}
        resizeMode="contain"
      />

      <Text style={styles.titre}>Bem-vindo ao{'\n'}SABER AO !</Text>
      <Text style={styles.sousTitre}>
        Testa os teus conhecimentos{'\n'}sobre Angola em 3 categorias
      </Text>

      {/* Bouton jouer */}
      <TouchableOpacity
        style={styles.btnJouer}
        onPress={() => navigation.navigate('Categories')}
      >
        <Text style={styles.btnJouerText}>🎮 JOGAR AGORA</Text>
      </TouchableOpacity>

      {/* Bouton règles */}
      <TouchableOpacity style={styles.btnRegles}>
        <Text style={styles.btnReglesText}>📖 Como jogar</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F24',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 24,
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  navLogo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  navTitre: {
    color: '#FFD700',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 3,
  },
  mascotte: {
    width: 180,
    height: 180,
    marginVertical: 10,
  },
  titre: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 1,
    marginBottom: 10,
  },
  sousTitre: {
    fontSize: 14,
    color: '#6F80A5',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
  },
  btnJouer: {
    backgroundColor: '#FFD700',
    paddingVertical: 18,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginBottom: 14,
    width: '100%',
    alignItems: 'center',
  },
  btnJouerText: {
    color: '#0A0F24',
    fontWeight: '900',
    fontSize: 17,
    letterSpacing: 1,
  },
  btnRegles: {
    borderWidth: 1,
    borderColor: '#FFD700',
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
  },
  btnReglesText: {
    color: '#FFD700',
    fontWeight: '700',
    fontSize: 15,
  },
});
