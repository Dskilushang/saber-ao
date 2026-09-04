import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function AccueilScreen({ navigation }) {
  return (
    <View style={styles.container}>

      <View style={styles.navbar}>
        <Text style={styles.navTitre}>SABER AO</Text>
      </View>

      <Text style={styles.emoji}>🦁</Text>

      <Text style={styles.titre}>Bem-vindo ao{'\n'}SABER AO !</Text>
      <Text style={styles.sousTitre}>
        Testa os teus conhecimentos{'\n'}sobre Angola em 6 categorias
      </Text>

      <TouchableOpacity
        style={styles.btnJouer}
        onPress={() => navigation.navigate('Categories')}
      >
        <Text style={styles.btnJouerText}>🎮 JOGAR AGORA</Text>
      </TouchableOpacity>

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
  navTitre: {
    color: '#FFD700',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 3,
  },
  emoji: {
    fontSize: 100,
    marginVertical: 20,
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
