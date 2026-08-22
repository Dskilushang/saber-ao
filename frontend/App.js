import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);

  // Récupérer les questions depuis l'API Backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // Remplacez 'localhost' par l'IP de votre serveur si vous testez sur un vrai téléphone
        const response = await axios.get('http://localhost:3000/api/questions');
        setQuestions(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des questions :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // Vérification de la réponse sélectionnée
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
        <Text style={styles.loadingText}>Chargement du jeu SABER AO...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>Jeu SABER AO</Text>
      <Text style={styles.score}>Score : {score}</Text>

      <FlatList
        data={questions}
        keyExtractor={(item) => item._id}
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
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
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
    color: '#222',
    marginBottom: 5
  },
  score: {
    fontSize: 18,
    textAlign: 'center',
    color: '#0066cc',
    fontWeight: '600',
    marginBottom: 20
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5
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
    textAlign: 'center',
    fontWeight: '500'
  }
});

export default App;
