// src/screens/ResultatScreen.js
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';

export default function ResultatScreen({ route, navigation }) {
  // On récupère le score envoyé par l'écran de Quiz
  const { finalScore, totalQ } = route.params || { finalScore: 0, totalQ: 7 };

  // Calcul du message personnalisé selon le score
  const getMessage = () => {
    const scoreMax = totalQ * 1000;
    if (finalScore === scoreMax) return "Tu es un vrai fils du pays ! 🎉🇦🇴";
    if (finalScore >= scoreMax * 0.7) return "Bravo — tu connais très bien l'Angola ! 🔥";
    return "Pas mal — continue d'apprendre sur ton pays ! 📚";
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <Text style={styles.trophy}>🏆</Text>
      <Text style={styles.title}>FIN DU COMBAT</Text>
      
      <View style={styles.cardResultat}>
        <Text style={styles.label}>CAGNOTTE FINALE</Text>
        <Text style={styles.scoreText}>{finalScore} PTS</Text>
        <Text style={styles.messageText}>{getMessage()}</Text>
      </View>

      {/* Bouton Rejouer */}
      <TouchableOpacity 
        style={styles.btnRejouer} 
        onPress={() => navigation.replace('Accueil')}
      >
        <Text style={styles.btnRejouerText}>RETOURNER À L'ACCUEIL</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F24',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  trophy: { fontSize: 80, marginBottom: 10 },
  title: { fontSize: 32, fontWeight: '900', color: '#FFF', letterSpacing: 2, marginBottom: 30 },
  cardResultat: {
    backgroundColor: 'rgba(20, 30, 65, 0.5)',
    width: '100%',
    padding: 30,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    marginBottom: 40,
  },
  label: { color: '#6F80A5', fontSize: 12, fontWeight: '700', letterSpacing: 1, marginBottom: 10 },
  scoreText: { fontSize: 42, fontWeight: '900', color: '#FFD700', marginBottom: 15 },
  messageText: { color: '#FFF', fontSize: 16, fontWeight: '600', textAlign: 'center', lineHeight: 22 },
  btnRejouer: {
    backgroundColor: '#FFD700',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 99,
    width: '100%',
    alignItems: 'center',
  },
  btnRejouerText: { color: '#0A0F24', fontWeight: '900', fontSize: 16, letterSpacing: 1 },
});
    
