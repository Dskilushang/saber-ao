import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator, Alert, Modal, Button } from 'react-native';
import axios from 'axios';

// Langues disponibles
const LANGUES = [
  { code: 'fr', label: 'Français' },
  { code: 'pt', label: 'Português' },
  { code: 'en', label: 'English' },
  { code: 'kg', label: 'Kikongo' },
  { code: 'ln', label: 'Lingála' },
  { code: 'kj', label: 'Kimbundu' },
  { code: 'umb', label: 'Umbundu' }
];

// Questions locales par défaut (pour chaque langue si besoin)
const QUESTIONS_OFFLINE = {
  fr: [/*...*/], // Vous pouvez ajouter des questions offline en français
  pt: [/*...*/], // ... et en portugais
  // Ajoutez les autres langues selon votre besoin
};

const App = () => {
  const [langueSelectionnee, setLangueSelectionnee] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(0);
  const [isOfflineMode, setIsOfflineMode] = useState(false);

  useEffect(() => {
    if (!langueSelectionnee) return;
    chargerQuestions();
  }, [langueSelectionnee]);

  const chargerQuestions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/api/questions?lang=${langueSelectionnee.code}`);
      setQuestions(response.data);
      setIsOfflineMode(false);
    } catch (error) {
      console.log("Mode Hors-Ligne activé.");
      setQuestions(QUESTIONS_OFFLINE[langueSelectionnee.code] || []);
      setIsOfflineMode(true);
    } finally {
      setLoading(false);
    }
  };

  const verifierReponse = (indexChoisi, indexCorrect) => {
    if (indexChoisi === indexCorrect) {
      setScore(score + 1);
      Alert.alert("Bravo !", "Bonne réponse ! 🎉");
    } else {
      Alert.alert("Oups...", "Mauvaise réponse ! ❌");
    }
  };

  if (!langueSelectionnee) {
    return (
      <View style={styles.center}>
        <Text style={styles.titre}>SABER AO - Jeu Multilingue</Text>
        <Text style={styles.subtitle}>Choisissez votre langue :</Text>
        {LANGUES.map((lang) => (
          <TouchableOpacity
            key={lang.code}
            style={styles.langButton}
            onPress={() => setLangueSelectionnee(lang)}
          >
            <Text style={styles.langButtonText}>{lang.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0066cc" />
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>Jeu SABER AO</Text>
      <View style={[styles.badgeMode, isOfflineMode ? styles.badgeOffline : styles.badgeOnline]}>
        <Text style={styles.badgeText}>
          {isOfflineMode ? "🌐 Mode Hors-Ligne" : "🤖 Mode En Ligne"}
        </Text>
      </View>
      <Text style={styles.score}>Score : {score}</Text>
      <FlatList
        data={questions}
        keyExtractor={(item, index) => item._id || index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.questionText}>{item.text}</Text>
            {item.answers.map((answer, index) => (
              <TouchableOpacity
                key={index}
                style={styles.button}
                onPress={() => verifierReponse(index, item.correctAnswerIndex)}
              >
                <Text style={styles.buttonText}>{answer}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', paddingTop: 45, paddingHorizontal: 20 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  titre: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', color: '#222', marginBottom: 20 },
  subtitle: { fontSize: 18, textAlign: 'center', marginBottom: 20, color: '#555' },
  langButton: { backgroundColor: '#0066cc', padding: 15, borderRadius: 8, marginVertical: 5, width: '100%' },
  langButtonText: { color: '#fff', fontSize: 18, textAlign: 'center' },
  badgeMode: { paddingVertical: 5, paddingHorizontal: 10, borderRadius: 15, alignSelf: 'center', marginVertical: 8 },
  badgeOnline: { backgroundColor: '#e6f4ea' },
  badgeOffline: { backgroundColor: '#fff3e0' },
  badgeText: { fontSize: 12, fontWeight: 'bold', color: '#333' },
  score: { fontSize: 18, textAlign: 'center', color: '#0066cc', fontWeight: '600', marginBottom: 15 },
  card: { backgroundColor: '#ffffff', borderRadius: 10, padding: 15, marginBottom: 15, elevation: 3 },
  questionText: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#333' },
  button: { backgroundColor: '#0066cc', paddingVertical: 12, paddingHorizontal: 15, borderRadius: 8, marginVertical: 5 },
  buttonText: { color: '#ffffff', fontSize: 16, textAlign: 'center' }
});

export default App;
