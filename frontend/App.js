import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';

// 🇦🇴 Banque de questions locale (Mode Hors-Ligne / Offline)
const QUESTIONS_OFFLINE = [
  {
    _id: "off_1",
    text: "Quelle est la capitale de l'Angola ?",
    answers: ["Luanda", "Huambo", "Benguela", "Lubango"],
    correctAnswerIndex: 0
  },
  {
    _id: "off_2",
    text: "Quelle est la monnaie officielle de l'Angola ?",
    answers: ["Franc CFA", "Kwanza", "Real", "Dollar"],
    correctAnswerIndex: 1
  },
  {
    _id: "off_3",
    text: "Quel style de musique et danse est originaire d'Angola ?",
    answers: ["Samba", "Kizomba", "Salsa", "Zouk"],
    correctAnswerIndex: 1
  },
  {
    _id: "off_4",
    text: "En quelle année l'Angola a-t-il obtenu son indépendance ?",
    answers: ["1960", "1975", "1988", "1992"],
    correctAnswerIndex: 1
  },
  {
    _id: "off_5",
    text: "Quel est le point le plus élevé d'Angola (Mont Moco) ?",
    answers: ["2 620 m", "1 800 m", "3 100 m", "2 100 m"],
    correctAnswerIndex: 0
  }
];

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [isOfflineMode, setIsOfflineMode] = useState(false);

  useEffect(() => {
    chargerQuestions();
  }, []);

  const chargerQuestions = async () => {
    setLoading(true);
    try {
      // Connexion au serveur Backend IA (Online)
      const response = await axios.get('http://localhost:3000/api/questions', { timeout: 4000 });
      setQuestions(response.data);
      setIsOfflineMode(false);
    } catch (error) {
      console.log("Mode Hors-Ligne (Offline) activé.");
      // Utilisation des questions locales si pas de réseau
      setQuestions(QUESTIONS_OFFLINE);
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

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0066cc" />
        <Text style={styles.loadingText}>Chargement de SABER AO...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>Jeu SABER AO</Text>
      
      <View style={[styles.badgeMode, isOfflineMode ? styles.badgeOffline : styles.badgeOnline]}>
        <Text style={styles.badgeText}>
          {isOfflineMode ? "🌐 Mode Hors-Ligne (Questions Locales)" : "🤖 Mode En Ligne (Généré par IA)"}
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

      <TouchableOpacity style={styles.reloadButton} onPress={chargerQuestions}>
        <Text style={styles.reloadButtonText}>🔄 Charger de nouvelles questions</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 45,
    paddingHorizontal: 20
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555'
  },
  titre: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#222'
  },
  badgeMode: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    alignSelf: 'center',
    marginVertical: 8
  },
  badgeOnline: {
    backgroundColor: '#e6f4ea'
  },
  badgeOffline: {
    backgroundColor: '#fff3e0'
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333'
  },
  score: {
    fontSize: 18,
    textAlign: 'center',
    color: '#0066cc',
    fontWeight: '600',
    marginBottom: 15
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333'
  },
  button: {
    backgroundColor: '#0066cc',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginVertical: 5
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center'
  },
  reloadButton: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20
  },
  reloadButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  }
});

export default App;
