import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator, Alert, Vibration, ScrollView } from 'react-native';

// 🇦🇴 7 Langues avec Questions Hors-Ligne intégrées
const QUESTIONS_LOCALES = {
  fr: [
    { type: 'text', text: "Quelle est la capitale de l'Angola ?", answers: ["Luanda", "Benguela", "Huambo", "Lubango"], correctAnswerIndex: 0 },
    { type: 'text', text: "Quelle est la monnaie officielle d'Angola ?", answers: ["Kwanza", "Franc", "Real", "Dollar"], correctAnswerIndex: 0 },
    { type: 'image', text: "Quel est le drapeau officiel de l'Angola ?", answers: ["https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Flag_of_Angola.svg/320px-Flag_of_Angola.svg.png", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Flag_of_Zambia.svg/320px-Flag_of_Zambia.svg.png"], correctAnswerIndex: 0 },
    { type: 'text', text: "En quelle année l'Angola est-il devenu indépendant ?", answers: ["1975", "1960", "1990", "2002"], correctAnswerIndex: 0 },
    { type: 'text', text: "Quel style musical moderne est originaire d'Angola ?", answers: ["Kizomba", "Samba", "Reggae", "Salsa"], correctAnswerIndex: 0 }
  ],
  pt: [
    { type: 'text', text: "Qual é a capital de Angola?", answers: ["Luanda", "Benguela", "Huambo", "Lubango"], correctAnswerIndex: 0 },
    { type: 'text', text: "Qual é a moeda oficial de Angola?", answers: ["Kwanza", "Franco", "Real", "Dólar"], correctAnswerIndex: 0 },
    { type: 'image', text: "Qual é a bandeira oficial de Angola?", answers: ["https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Flag_of_Angola.svg/320px-Flag_of_Angola.svg.png", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Flag_of_Zambia.svg/320px-Flag_of_Zambia.svg.png"], correctAnswerIndex: 0 },
    { type: 'text', text: "Em que ano Angola tornou-se independente?", answers: ["1975", "1960", "1990", "2002"], correctAnswerIndex: 0 },
    { type: 'text', text: "Qual estilo musical é originário de Angola?", answers: ["Kizomba", "Samba", "Reggae", "Salsa"], correctAnswerIndex: 0 }
  ],
  en: [
    { type: 'text', text: "What is the capital of Angola?", answers: ["Luanda", "Benguela", "Huambo", "Lubango"], correctAnswerIndex: 0 },
    { type: 'text', text: "What is the official currency of Angola?", answers: ["Kwanza", "Franc", "Real", "Dollar"], correctAnswerIndex: 0 },
    { type: 'image', text: "Which is the official flag of Angola?", answers: ["https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Flag_of_Angola.svg/320px-Flag_of_Angola.svg.png", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Flag_of_Zambia.svg/320px-Flag_of_Zambia.svg.png"], correctAnswerIndex: 0 },
    { type: 'text', text: "In which year did Angola gain independence?", answers: ["1975", "1960", "1990", "2002"], correctAnswerIndex: 0 },
    { type: 'text', text: "Which music genre originates from Angola?", answers: ["Kizomba", "Samba", "Reggae", "Salsa"], correctAnswerIndex: 0 }
  ],
  kg: [
    { type: 'text', text: "Nki i mbanza ya ntotila ya Angola?", answers: ["Luanda", "Benguela", "Huambo", "Lubango"], correctAnswerIndex: 0 },
    { type: 'text', text: "Nki i nzimbu ya nsi ya Angola?", answers: ["Kwanza", "Franc", "Real", "Dollar"], correctAnswerIndex: 0 },
    { type: 'image', text: "Nki i dimbu (bandeira) ya Angola?", answers: ["https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Flag_of_Angola.svg/320px-Flag_of_Angola.svg.png", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Flag_of_Zambia.svg/320px-Flag_of_Zambia.svg.png"], correctAnswerIndex: 0 },
    { type: 'text', text: "Nki mvu Angola banzikisa kimpwanza?", answers: ["1975", "1960", "1990", "2002"], correctAnswerIndex: 0 },
    { type: 'text', text: "Nki mutindu ya miziki ukatuka mu Angola?", answers: ["Kizomba", "Samba", "Reggae", "Salsa"], correctAnswerIndex: 0 }
  ],
  ln: [
    { type: 'text', text: "Mbonge nini ezali engumba bokonzi ya Angola?", answers: ["Luanda", "Benguela", "Huambo", "Lubango"], correctAnswerIndex: 0 },
    { type: 'text', text: "Mbongo nini esalelamaka na Angola?", answers: ["Kwanza", "Franc", "Real", "Dollar"], correctAnswerIndex: 0 },
    { type: 'image', text: "Drapeau nini ezali ya mboka Angola?", answers: ["https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Flag_of_Angola.svg/320px-Flag_of_Angola.svg.png", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Flag_of_Zambia.svg/320px-Flag_of_Zambia.svg.png"], correctAnswerIndex: 0 },
    { type: 'text', text: "Mobu nini Angola ezwaki lipanda?", answers: ["1975", "1960", "1990", "2002"], correctAnswerIndex: 0 },
    { type: 'text', text: "Miziki nini eutaki na mboka Angola?", answers: ["Kizomba", "Samba", "Reggae", "Salsa"], correctAnswerIndex: 0 }
  ],
  kj: [
    { type: 'text', text: "Ihi i mbanza ia mbota ia Angola?", answers: ["Luanda", "Benguela", "Huambo", "Lubango"], correctAnswerIndex: 0 },
    { type: 'text', text: "Ihi i kitadi kia nsi ia Angola?", answers: ["Kwanza", "Franco", "Real", "Dólar"], correctAnswerIndex: 0 },
    { type: 'image', text: "Ihi i ndemba (bandeira) ia Angola?", answers: ["https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Flag_of_Angola.svg/320px-Flag_of_Angola.svg.png", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Flag_of_Zambia.svg/320px-Flag_of_Zambia.svg.png"], correctAnswerIndex: 0 },
    { type: 'text', text: "Mu muvu uhi Angola iatambula utuminu?", answers: ["1975", "1960", "1990", "2002"], correctAnswerIndex: 0 },
    { type: 'text', text: "Muzika uhi utunda mu Angola?", answers: ["Kizomba", "Samba", "Reggae", "Salsa"], correctAnswerIndex: 0 }
  ],
  umb: [
    { type: 'text', text: "Helie ofekalupale yo Angola?", answers: ["Luanda", "Benguela", "Huambo", "Lubango"], correctAnswerIndex: 0 },
    { type: 'text', text: "Orombongo ipi vielinga vokalunga ko Angola?", answers: ["Kwanza", "Franco", "Real", "Dólar"], correctAnswerIndex: 0 },
    { type: 'image', text: "Oependelo lipi lyo Angola?", answers: ["https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Flag_of_Angola.svg/320px-Flag_of_Angola.svg.png", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Flag_of_Zambia.svg/320px-Flag_of_Zambia.svg.png"], correctAnswerIndex: 0 },
    { type: 'text', text: "Ulimbo upi Angola viawile elianjo?", answers: ["1975", "1960", "1990", "2002"], correctAnswerIndex: 0 },
    { type: 'text', text: "Owisikihulo upi utunda ko Angola?", answers: ["Kizomba", "Samba", "Reggae", "Salsa"], correctAnswerIndex: 0 }
  ]
};

const LANGUES = [
  { code: 'fr', label: 'Français' },
  { code: 'pt', label: 'Português' },
  { code: 'en', label: 'English' },
  { code: 'kg', label: 'Kikongo' },
  { code: 'ln', label: 'Lingála' },
  { code: 'kj', label: 'Kimbundu' },
  { code: 'umb', label: 'Umbundu' }
];

const App = () => {
  const [langueSelectionnee, setLangueSelectionnee] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imgError, setImgError] = useState(false);

  const [gadgets, setGadgets] = useState({ fiftyFifty: true, expertCall: true, timeFreeze: true });

  useEffect(() => {
    if (!langueSelectionnee) return;
    chargerQuestions();
  }, [langueSelectionnee]);

  // Chronomètre 30s
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
    const code = langueSelectionnee.code;
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const response = await fetch(`https://saber-ao-backend.onrender.com/api/questions?lang=${code}`, { signal: controller.signal });
      const data = await response.json();
      clearTimeout(timeoutId);

      if (Array.isArray(data) && data.length > 0) {
        setQuestions(data);
      } else {
        setQuestions(QUESTIONS_LOCALES[code] || QUESTIONS_LOCALES['pt']);
      }
    } catch (error) {
      setQuestions(QUESTIONS_LOCALES[code] || QUESTIONS_LOCALES['pt']);
    } finally {
      setLoading(false);
      setTimeLeft(30);
      setCurrentQuestionIndex(0);
      setScore(0);
      setGadgets({ fiftyFifty: true, expertCall: true, timeFreeze: true });
    }
  };

  const tempsEcoule = () => {
    try { Vibration.vibrate([0, 500]); } catch(e){}
    Alert.alert("⏱️ Temps écoulé !", "Les 30 secondes sont terminées.");
    passerQuestionSuivante();
  };

  const verifierReponse = (indexChoisi) => {
    if (selectedAnswer !== null) return;

    const questionActuelle = questions[currentQuestionIndex];
    setSelectedAnswer(indexChoisi);

    if (indexChoisi === questionActuelle.correctAnswerIndex) {
      try { Vibration.vibrate([0, 150, 100, 150]); } catch(e){}
      setScore((prev) => prev + (timeLeft * 10) + 100);
    } else {
      try { Vibration.vibrate([0, 400]); } catch(e){}
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
      Alert.alert("🏆 PARTIE TERMINÉE !", `Votre score final : ${score} points`, [
        { text: "Rejouer", onPress: () => setLangueSelectionnee(null) }
      ]);
    }
  };

  const utiliserGadget = (type) => {
    if (!gadgets[type]) return;

    if (type === 'fiftyFifty') {
      const currentQ = questions[currentQuestionIndex];
      if (currentQ.answers.length > 2) {
        const mauvaises = currentQ.answers.map((_, i) => i).filter((i) => i !== currentQ.correctAnswerIndex);
        const aSupprimer = mauvaises.slice(0, 2);
        const nouvellesReponses = currentQ.answers.map((ans, i) => aSupprimer.includes(i) ? "---" : ans);
        const majQuestions = [...questions];
        majQuestions[currentQuestionIndex].answers = nouvellesReponses;
        setQuestions(majQuestions);
      }
    } else if (type === 'expertCall') {
      const reponseCorrecte = questions[currentQuestionIndex].correctAnswerIndex;
      Alert.alert("🧞‍♂️ Conseil du Génie", `Le Génie pense que la bonne réponse est la numéro ${reponseCorrecte + 1} !`);
    } else if (type === 'timeFreeze') {
      setIsPaused(true);
      setTimeout(() => setIsPaused(false), 10000);
      Alert.alert("⏸️ Temps gelé !", "Le chrono est arrêté pendant 10 secondes.");
    }

    setGadgets((prev) => ({ ...prev, [type]: false }));
  };

  // 1️⃣ ACCUEIL & SÉLECTION DE LA LANGUE
  if (!langueSelectionnee) {
    return (
      <ScrollView contentContainerStyle={styles.center}>
        <View style={styles.badgeLogo}>
          <Text style={{fontSize: 42}}>🇦🇴</Text>
        </View>
        <Text style={styles.titreApp}>SABER AO</Text>
        <Text style={styles.sousTitre}>Escolha o idioma / Choisissez la langue :</Text>
        {LANGUES.map((lang) => (
          <TouchableOpacity
            key={lang.code}
            style={styles.btnLangue}
            onPress={() => setLangueSelectionnee(lang)}
          >
            <Text style={styles.btnLangueText}>{lang.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }

  // 2️⃣ CHARGEMENT
  if (loading || questions.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={{fontSize: 50, marginBottom: 10}}>🦁</Text>
        <ActivityIndicator size="large" color="#ffd24d" />
        <Text style={styles.textChargement}>Préparation de l'arène SABER AO...</Text>
      </View>
    );
  }

  const q = questions[currentQuestionIndex];

  // 3️⃣ PLATEAU DE JEU
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* En-tête : Score, Mascotte & Chrono */}
      <View style={styles.topBar}>
        <View style={styles.boxInfo}>
          <Text style={styles.labelInfo}>SCORE</Text>
          <Text style={styles.valeurScore}>{score}</Text>
        </View>

        <View style={styles.mascotteBox}>
          <Text style={{fontSize: 32}}>🦁</Text>
          <Text style={{color: '#ffd24d', fontSize: 10, fontWeight: 'bold'}}>SABER AO</Text>
        </View>

        <View style={[styles.boxInfo, timeLeft <= 10 && styles.boxChronoAlerte]}>
          <Text style={styles.labelInfo}>CHRONO</Text>
          <Text style={[styles.valeurChrono, timeLeft <= 10 && {color:'#dc3545'}]}>{timeLeft}s</Text>
        </View>
      </View>

      {/* Carte Question */}
      <View style={styles.cardQuestion}>
        <Text style={styles.numQuestion}>Q{currentQuestionIndex + 1}/{questions.length}</Text>
        <Text style={styles.questionText}>{q.text}</Text>
      </View>

      {/* Zone des Réponses */}
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

      {/* Barre des Jokers / Gadgets */}
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#071026', paddingTop: 30, paddingHorizontal: 15, paddingBottom: 20 },
  center: { flexGrow: 1, backgroundColor: '#071026', justifyContent: 'center', alignItems: 'center', padding: 20 },
  
  badgeLogo: { backgroundColor: '#131e36', padding: 15, borderRadius: 50, borderWidth: 2, borderColor: '#ffd24d', marginBottom: 10 },
  titreApp: { fontSize: 32, fontWeight: 'bold', color: '#ffd24d', marginBottom: 5, textAlign: 'center' },
  sousTitre: { fontSize: 14, color: '#aaa', marginBottom: 20, textAlign: 'center' },
  btnLangue: { backgroundColor: '#131e36', padding: 14, borderRadius: 12, marginVertical: 5, width: '100%', borderWidth: 1, borderColor: '#ffd24d' },
  btnLangueText: { color: '#fff', fontSize: 16, textAlign: 'center', fontWeight: 'bold' },
  
  textChargement: { color: '#fff', marginTop: 15, fontSize: 16 },

  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  boxInfo: { backgroundColor: '#131e36', padding: 10, borderRadius: 12, minWidth: 85, alignItems: 'center', borderWidth: 1, borderColor: '#1f2d4a' },
  boxChronoAlerte: { borderColor: '#dc3545', backgroundColor: '#3d1217' },
  labelInfo: { color: '#8892b0', fontSize: 10, fontWeight: 'bold' },
  valeurScore: { color: '#ffd24d', fontSize: 18, fontWeight: 'bold' },
  valeurChrono: { color: '#00f2fe', fontSize: 18, fontWeight: 'bold' },
  mascotteBox: { alignItems: 'center' },

  cardQuestion: { backgroundColor: '#131e36', borderRadius: 15, padding: 18, marginBottom: 15, borderLeftWidth: 5, borderLeftColor: '#ffd24d' },
  numQuestion: { color: '#8892b0', fontSize: 11, fontWeight: 'bold', marginBottom: 4 },
  questionText: { color: '#fff', fontSize: 17, fontWeight: 'bold', textAlign: 'center' },

  responsesContainer: { marginVertical: 10 },
  btnReponse: { backgroundColor: '#131e36', padding: 15, borderRadius: 12, marginVertical: 6, borderWidth: 1, borderColor: '#1f2d4a' },
  btnReponseText: { color: '#fff', fontSize: 15, textAlign: 'center', fontWeight: '600' },
  btnCorrect: { backgroundColor: '#28a745', borderColor: '#1e7e34' },
  btnFaux: { backgroundColor: '#dc3545', borderColor: '#bd2130' },
  btnDesactive: { opacity: 0.2 },

  gridImages: { flexDirection: 'row', justifyContent: 'space-between' },
  cardImage: { backgroundColor: '#131e36', padding: 8, borderRadius: 12, width: '48%', alignItems: 'center', borderWidth: 2, borderColor: '#1f2d4a' },
  imgOption: { width: '100%', height: 110, borderRadius: 8, resizeMode: 'cover' },
  badgeImage: { color: '#ffd24d', marginTop: 8, fontWeight: 'bold' },
  textElimine: { fontSize: 40, marginVertical: 30 },

  barreGadgets: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 15, marginTop: 15, borderTopWidth: 1, borderTopColor: '#131e36' },
  btnGadget: { backgroundColor: '#ffd24d', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 20 },
  gadgetInactif: { backgroundColor: '#333', opacity: 0.4 },
  textGadget: { color: '#071026', fontWeight: 'bold', fontSize: 13 }
});

export default App;
