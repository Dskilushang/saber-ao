import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator, Alert, Vibration } from 'react-native';
import { Audio } from 'expo-av';
import Animated, { FadeIn } from 'react-native-reanimated';

// Langues gérées par l'application
const LANGUES = [
  { code: 'fr', label: 'Français' },
  { code: 'pt', label: 'Português' },
  { code: 'en', label: 'English' },
  { code: 'kg', label: 'Kikongo' },
  { code: 'ln', label: 'Lingála' },
  { code: 'kj', label: 'Kimbundu' },
  { code: 'umb', label: 'Umbundu' }
];

// Effets sonores
const SOUNDS = {
  tick: 'https://assets.mixkit.co/sfx/preview/mixkit-clock-ticking-397.mp3',
  correct: 'https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3',
  wrong: 'https://assets.mixkit.co/sfx/preview/mixkit-wrong-answer-fail-notification-946.mp3'
};

const App = () => {
  const [langueSelectionnee, setLangueSelectionnee] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [loading, setLoading] = useState(false);

  // Gadgets disponibles
  const [gadgets, setGadgets] = useState({ fiftyFifty: true, expertCall: true, timeFreeze: true });

  useEffect(() => {
    if (!langueSelectionnee) return;
    chargerQuestions();
    Audio.setAudioModeAsync({ allowsRecordingIOS: false, staysActiveInBackground: false });
  }, [langueSelectionnee]);

  // Chronomètre inversé de 30 secondes
  useEffect(() => {
    if (!langueSelectionnee || loading || questions.length === 0 || isPaused) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          tempsEcoule();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [langueSelectionnee, loading, questions, currentQuestionIndex, isPaused]);

  const chargerQuestions = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/questions?lang=${langueSelectionnee.code}`);
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        setQuestions(data);
      } else {
        lancerQuestionsLocales();
      }
    } catch (error) {
      console.log("Mode Offline activé.");
      lancerQuestionsLocales();
    } finally {
      setLoading(false);
      setTimeLeft(30);
      setCurrentQuestionIndex(0);
      setScore(0);
      setGadgets({ fiftyFifty: true, expertCall: true, timeFreeze: true });
    }
  };

  const lancerQuestionsLocales = () => {
    setQuestions([
      {
        type: 'text',
        text: "Quelle est la capitale de l'Angola ?",
        answers: ["Luanda", "Benguela", "Huambo", "Lubango"],
        correctAnswerIndex: 0
      },
      {
        type: 'image',
        text: "Quel est le drapeau officiel de l'Angola ?",
        answers: [
          "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Flag_of_Angola.svg/320px-Flag_of_Angola.svg.png",
          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Flag_of_Zambia.svg/320px-Flag_of_Zambia.svg.png"
        ],
        correctAnswerIndex: 0
      }
    ]);
  };

  const jouerSon = async (type) => {
    try {
      const { sound } = await Audio.Sound.createAsync({ uri: SOUNDS[type] });
      await sound.playAsync();
    } catch (e) {
      console.log("Son indisponible");
    }
  };

  const tempsEcoule = () => {
    jouerSon('wrong');
    Vibration.vibrate([0, 500]);
    Alert.alert("⏱️ Temps écoulé !", "Le chrono de 30s est terminé.");
    passerQuestionSuivante();
  };

  const verifierReponse = (indexChoisi) => {
    if (selectedAnswer !== null) return;

    const questionActuelle = questions[currentQuestionIndex];
    setSelectedAnswer(indexChoisi);

    if (indexChoisi === questionActuelle.correctAnswerIndex) {
      jouerSon('correct');
      Vibration.vibrate([0, 150, 100, 150]);
      setScore((prev) => prev + (timeLeft * 10) + 100);
    } else {
      jouerSon('wrong');
      Vibration.vibrate([0, 400]);
    }

    setTimeout(() => {
      setSelectedAnswer(null);
      passerQuestionSuivante();
    }, 1500);
  };

  const passerQuestionSuivante = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimeLeft(30);
    } else {
      Alert.alert("🏆 Partie Terminée !", `Votre score final : ${score} points`);
      setLangueSelectionnee(null);
    }
  };

  const utiliserGadget = (type) => {
    if (!gadgets[type]) return;

    if (type === 'fiftyFifty') {
      const currentQ = questions[currentQuestionIndex];
      if (currentQ.answers.length > 2) {
        const mauvaises = currentQ.answers
          .map((_, i) => i)
          .filter((i) => i !== currentQ.correctAnswerIndex);
        const aSupprimer = mauvaises.slice(0, 2);

        const nouvellesReponses = currentQ.answers.map((ans, i) =>
          aSupprimer.includes(i) ? "---" : ans
        );

        const majQuestions = [...questions];
        majQuestions[currentQuestionIndex].answers = nouvellesReponses;
        setQuestions(majQuestions);
      }
    } else if (type === 'expertCall') {
      const reponseCorrecte = questions[currentQuestionIndex].correctAnswerIndex;
      Alert.alert("🧞‍♂️ Conseil du Génie", `Le Génie pense que la bonne réponse est la réponse ${reponseCorrecte + 1} !`);
    } else if (type === 'timeFreeze') {
      setIsPaused(true);
      setTimeout(() => setIsPaused(false), 10000);
      Alert.alert("⏸️ Temps congelé !", "Le chrono est arrêté pendant 10 secondes.");
    }

    setGadgets((prev) => ({ ...prev, [type]: false }));
  };

  // Écran 1 : Sélection de la langue
  if (!langueSelectionnee) {
    return (
      <View style={styles.center}>
        <Text style={styles.titreApp}>🇦🇴 SABER AO</Text>
        <Text style={styles.sousTitre}>Choisissez votre langue / Escolha o idioma :</Text>
        {LANGUES.map((lang) => (
          <TouchableOpacity
            key={lang.code}
            style={styles.btnLangue}
            onPress={() => setLangueSelectionnee(lang)}
          >
            <Text style={styles.btnLangueText}>{lang.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  if (loading || questions.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#ffd24d" />
        <Text style={styles.textChargement}>Préparation du plateau de jeu...</Text>
      </View>
    );
  }

  const q = questions[currentQuestionIndex];

  return (
    <View style={styles.container}>
      {/* Barre supérieure : Score & Chrono */}
      <View style={styles.topBar}>
        <View style={styles.boxInfo}>
          <Text style={styles.labelInfo}>SCORE</Text>
          <Text style={styles.valeurScore}>{score}</Text>
        </View>

        <View style={[styles.boxInfo, timeLeft <= 10 && styles.boxChronoAlerte]}>
          <Text style={styles.labelInfo}>CHRONO</Text>
          <Text style={styles.valeurChrono}>{timeLeft}s</Text>
        </View>
      </View>

      {/* Carte de la Question */}
      <Animated.View entering={FadeIn.duration(400)} style={styles.cardQuestion}>
        <Text style={styles.numQuestion}>Question {currentQuestionIndex + 1}/{questions.length}</Text>
        <Text style={styles.questionText}>{q.text}</Text>
      </Animated.View>

      {/* Réponses : Soit Mode Images (A/B), soit Mode Texte (1/2/3/4) */}
      <View style={styles.responsesContainer}>
        {q.type === 'image' ? (
          <View style={styles.gridImages}>
            {q.answers.map((url, index) => (
              <TouchableOpacity
                key={index}
                disabled={selectedAnswer !== null || url === "---"}
                style={[
                  styles.cardImage,
                  selectedAnswer === index && (index === q.correctAnswerIndex ? styles.btnCorrect : styles.btnFaux)
                ]}
                onPress={() => verifierReponse(index)}
              >
                {url !== "---" ? (
                  <Image source={{ uri: url }} style={styles.imgOption} />
                ) : (
                  <Text style={styles.textElimine}>❌</Text>
                )}
                <Text style={styles.badgeImage}>Option {index === 0 ? 'A' : 'B'}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          q.answers.map((reponse, index) => {
            let styleBouton = styles.btnReponse;
            if (selectedAnswer === index) {
              styleBouton = index === q.correctAnswerIndex ? styles.btnCorrect : styles.btnFaux;
            }

            return (
              <TouchableOpacity
                key={index}
                disabled={selectedAnswer !== null || reponse === "---"}
                style={[styleBouton, reponse === "---" && styles.btnDesactive]}
                onPress={() => verifierReponse(index)}
              >
                <Text style={styles.btnReponseText}>{reponse}</Text>
              </TouchableOpacity>
            );
          })
        )}
      </View>

      {/* Barre des Gadgets / Jokers */}
      <View style={styles.barreGadgets}>
        <TouchableOpacity
          style={[styles.btnGadget, !gadgets.fiftyFifty && styles.gadgetInactif]}
          disabled={!gadgets.fiftyFifty}
          onPress={() => utiliserGadget('fiftyFifty')}
        >
          <Text style={styles.textGadget}>50/50</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btnGadget, !gadgets.expertCall && styles.gadgetInactif]}
          disabled={!gadgets.expertCall}
          onPress={() => utiliserGadget('expertCall')}
        >
          <Text style={styles.textGadget}>🧞‍♂️ Génie</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btnGadget, !gadgets.timeFreeze && styles.gadgetInactif]}
          disabled={!gadgets.timeFreeze}
          onPress={() => utiliserGadget('timeFreeze')}
        >
          <Text style={styles.textGadget}>⏸️ +10s</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b1220', paddingTop: 45, paddingHorizontal: 15 },
  center: { flex: 1, backgroundColor: '#0b1220', justifyContent: 'center', alignItems: 'center', padding: 20 },
  titreApp: { fontSize: 34, fontWeight: 'bold', color: '#ffd24d', marginBottom: 10, textAlign: 'center' },
  sousTitre: { fontSize: 16, color: '#ccc', marginBottom: 25, textAlign: 'center' },
  textChargement: { color: '#fff', marginTop: 15, fontSize: 16 },
  btnLangue: { backgroundColor: '#162238', padding: 15, borderRadius: 12, marginVertical: 6, width: '100%', borderWidth: 1, borderColor: '#ffd24d' },
  btnLangueText: { color: '#fff', fontSize: 18, textAlign: 'center', fontWeight: 'bold' },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  boxInfo: { backgroundColor: '#162238', padding: 10, borderRadius: 10, minWidth: 100, alignItems: 'center', borderWidth: 1, borderColor: '#233554' },
  boxChronoAlerte: { borderColor: '#dc3545', backgroundColor: '#3d1217' },
  labelInfo: { color: '#8892b0', fontSize: 11, fontWeight: 'bold' },
  valeurScore: { color: '#ffd24d', fontSize: 22, fontWeight: 'bold' },
  valeurChrono: { color: '#00f2fe', fontSize: 22, fontWeight: 'bold' },
  cardQuestion: { backgroundColor: '#162238', borderRadius: 15, padding: 20, marginBottom: 15, borderLeftWidth: 5, borderLeftColor: '#ffd24d' },
  numQuestion: { color: '#8892b0', fontSize: 12, fontWeight: 'bold', marginBottom: 5 },
  questionText: { color: '#fff', fontSize: 19, fontWeight: 'bold', textAlign: 'center' },
  responsesContainer: { flex: 1, justifyContent: 'center' },
  btnReponse: { backgroundColor: '#1e2d4a', padding: 16, borderRadius: 12, marginVertical: 6, borderWidth: 1, borderColor: '#233554' },
  btnReponseText: { color: '#fff', fontSize: 16, textAlign: 'center', fontWeight: '600' },
  btnCorrect: { backgroundColor: '#28a745', borderColor: '#1e7e34' },
  btnFaux: { backgroundColor: '#dc3545', borderColor: '#bd2130' },
  btnDesactive: { opacity: 0.2 },
  gridImages: { flexDirection: 'row', justifyContent: 'space-between' },
  cardImage: { backgroundColor: '#1e2d4a', padding: 8, borderRadius: 12, width: '48%', alignItems: 'center', borderWidth: 2, borderColor: '#233554' },
  imgOption: { width: '100%', height: 110, borderRadius: 8, resizeMode: 'cover' },
  badgeImage: { color: '#ffd24d', marginTop: 8, fontWeight: 'bold' },
  textElimine: { fontSize: 40, marginVertical: 30 },
  barreGadgets: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 15, borderTopWidth: 1, borderTopColor: '#162238' },
  btnGadget: { backgroundColor: '#ffd24d', paddingVertical: 10, paddingHorizontal: 18, borderRadius: 20 },
  gadgetInactif: { backgroundColor: '#333', opacity: 0.4 },
  textGadget: { color: '#0b1220', fontWeight: 'bold', fontSize: 14 }
});

export default App;
