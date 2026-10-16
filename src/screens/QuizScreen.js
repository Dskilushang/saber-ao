import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Animated,
  Alert,
} from 'react-native';

import {
  getRandomQuizQuestions,
} from '../questions';

import Mascotte, {
  MASCOTTE_STATES,
} from '../components/Mascotte';

import SoundManager from '../utils/soundManager';


// ============================================================
// CONFIGURATION DU JEU
// ============================================================

const TOTAL_QUESTIONS = 10;

const DIFFICULTY_CONFIG = {
  1: {
    name: 'FACILE',
    time: 20,
    points: 100,
  },

  2: {
    name: 'INTERMÉDIAIRE',
    time: 20,
    points: 200,
  },

  3: {
    name: 'DIFFICILE',
    time: 20,
    points: 300,
  },

  4: {
    name: 'EXPERT',
    time: 25,
    points: 500,
  },
};


// ============================================================
// LETTRES DES RÉPONSES
// ============================================================

const ANSWER_LETTERS = ['A', 'B', 'C', 'D'];


// ============================================================
// ÉCRAN QUIZ
// ============================================================

export default function QuizScreen({ navigation, route }) {

  const lang = route?.params?.lang || 'pt';


  // ----------------------------------------------------------
  // QUESTIONS
  // ----------------------------------------------------------
  // IMPORTANT :
  // Les questions sont générées UNE SEULE FOIS au démarrage.
  // Le timer ne régénère donc jamais les questions.
  // ----------------------------------------------------------

  const [questions, setQuestions] = useState(() =>
    getRandomQuizQuestions(TOTAL_QUESTIONS, lang)
  );


  // ----------------------------------------------------------
  // ÉTAT DU JEU
  // ----------------------------------------------------------

  const [questionIndex, setQuestionIndex] = useState(0);

  const [questionVersion, setQuestionVersion] = useState(0);

  const [score, setScore] = useState(0);

  const [correctAnswers, setCorrectAnswers] = useState(0);

  const [timeLeft, setTimeLeft] = useState(20);

  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const [answerStatus, setAnswerStatus] = useState(null);
  // null       = aucune réponse
  // correct    = bonne réponse
  // wrong      = mauvaise réponse
  // timeout    = temps écoulé

  const [processing, setProcessing] = useState(false);

  const [mascotState, setMascotState] = useState(
    MASCOTTE_STATES.QUESTION
  );

  // hiddenOptions now contains indices of options to hide (for 50/50)
  const [hiddenOptions, setHiddenOptions] = useState([]);

  // jokers: 50/50, audience (PÚBLICO), phoneFriend (AMIGO), pass/trocar
  const [jokers, setJokers] = useState({
    fiftyFifty: true,
    audience: true,
    phoneFriend: true,
    pass: true,
  });


  // ----------------------------------------------------------
  // REFS
  // ----------------------------------------------------------

  const timerRef = useRef(null);

  const mascotTimeoutRef = useRef(null);

  const processingRef = useRef(false);

  const timerAnimation = useRef(
    new Animated.Value(1)
  ).current;


  // ----------------------------------------------------------
  // QUESTION ACTUELLE
  // ----------------------------------------------------------

  const currentQuestion = questions[questionIndex];


  // ----------------------------------------------------------
  // CONFIGURATION DE LA QUESTION
  // ----------------------------------------------------------

  const currentDifficulty =
    Number(currentQuestion?.difficulty) || 1;

  const difficulty =
    DIFFICULTY_CONFIG[currentDifficulty] ||
    DIFFICULTY_CONFIG[1];


  const currentTime =
    Number(currentQuestion?.timeLimit) ||
    difficulty.time;


  const currentPoints =
    Number(currentQuestion?.points) ||
    difficulty.points;


  // ----------------------------------------------------------
  // RÉPONSE CORRECTE
  // ----------------------------------------------------------

  const correctAnswer =
    currentQuestion?.correct ??
    currentQuestion?.correctAnswer ??
    null;


  // ----------------------------------------------------------
  // OPTIONS
  // ----------------------------------------------------------

  const options =
    Array.isArray(currentQuestion?.options)
      ? currentQuestion.options
      : [];


  // ==========================================================
  // NETTOYAGE
  // ==========================================================

  useEffect(() => {
    return () => {

      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      if (mascotTimeoutRef.current) {
        clearTimeout(mascotTimeoutRef.current);
      }

      timerAnimation.stopAnimation();
    };
  }, []);


  // ==========================================================
  // INITIALISATION DE SOUND MANAGER
  // ==========================================================

  useEffect(() => {

    const initializeSounds = async () => {
      try {
        await SoundManager.loadAll();
      } catch (error) {
        console.log(
          'SoundManager load error:',
          error
        );
      }
    };

    initializeSounds();

  }, []);


  // ==========================================================
  // SON / MASCOTTE TEMPORAIRE
  // ==========================================================

  const changeMascotTemporarily = (
    state,
    duration = 1500
  ) => {

    if (mascotTimeoutRef.current) {
      clearTimeout(mascotTimeoutRef.current);
    }

    setMascotState(state);

    mascotTimeoutRef.current = setTimeout(() => {
      setMascotState(
        MASCOTTE_STATES.QUESTION
      );
    }, duration);
  };


  // ==========================================================
  // DÉMARRAGE DU TIMER
  // ==========================================================

  const startTimer = () => {

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerAnimation.stopAnimation();

    timerAnimation.setValue(1);

    Animated.timing(timerAnimation, {
      toValue: 0,
      duration: currentTime * 1000,
      useNativeDriver: false,
    }).start();


    timerRef.current = setInterval(() => {

      setTimeLeft(previousTime => {

        if (previousTime <= 1) {

          clearInterval(timerRef.current);
          timerRef.current = null;

          handleTimeout();

          return 0;
        }

        return previousTime - 1;
      });

    }, 1000);
  };


  // ==========================================================
  // NOUVELLE QUESTION
  // ==========================================================

  useEffect(() => {

    if (!currentQuestion) {
      return;
    }

    setSelectedAnswer(null);
    setAnswerStatus(null);
    setHiddenOptions([]);
    setProcessing(false);

    processingRef.current = false;

    setTimeLeft(currentTime);

    setMascotState(
      MASCOTTE_STATES.QUESTION
    );

    startTimer();

  }, [questionIndex, questionVersion]);


  // ==========================================================
  // ARRÊTER LE TIMER
  // ==========================================================

  const stopTimer = () => {

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    timerAnimation.stopAnimation();
  };


  // ==========================================================
  // CALCUL DES POINTS
  // ==========================================================

  const calculatePoints = () => {

    if (!currentQuestion) {
      return 0;
    }

    return currentPoints;
  };


  // ==========================================================
  // FIN DE PARTIE
  // ==========================================================

  const finishGame = (
    finalScore,
    finalCorrectAnswers
  ) => {

    stopTimer();

    setProcessing(false);

    processingRef.current = false;

    changeMascotTemporarily(
      MASCOTTE_STATES.CELEBRATION,
      2000
    );

    try {
      SoundManager.onVictory();
    } catch (error) {
      console.log(
        'Victory sound error:',
        error
      );
    }

    setTimeout(() => {

      navigation.replace(
        'Resultat',
        {
          score: finalScore,
          correctAnswers: finalCorrectAnswers,
          totalQuestions: questions.length,
          lang,
        }
      );

    }, 1800);
  };


  // ==========================================================
  // PASSAGE À LA QUESTION SUIVANTE
  // ==========================================================

  const nextQuestion = (
    earnedPoints = 0,
    wasCorrect = false
  ) => {

    stopTimer();

    const newScore =
      score + earnedPoints;

    const newCorrectAnswers =
      correctAnswers +
      (wasCorrect ? 1 : 0);


    if (
      questionIndex >= questions.length - 1
    ) {

      finishGame(
        newScore,
        newCorrectAnswers
      );

      return;
    }


    setTimeout(() => {

      setQuestionIndex(
        previousIndex =>
          previousIndex + 1
      );

    }, 1200);
  };


  // ==========================================================
  // RÉPONSE DU JOUEUR
  // ==========================================================

  const handleAnswer = (answer) => {

    if (
      processingRef.current ||
      !currentQuestion ||
      answerStatus !== null
    ) {
      return;
    }

    processingRef.current = true;

    setProcessing(true);

    stopTimer();

    setSelectedAnswer(answer);


    const isCorrect =
      answer === correctAnswer;


    if (isCorrect) {

      const earnedPoints =
        calculatePoints();

      setAnswerStatus('correct');

      setScore(
        previousScore =>
          previousScore + earnedPoints
      );

      setCorrectAnswers(
        previousCorrect =>
          previousCorrect + 1
      );

      changeMascotTemporarily(
        MASCOTTE_STATES.BONNE_REPONSE,
        1500
      );

      try {
        SoundManager.onCorrect();
      } catch (error) {
        console.log(
          'Correct sound error:',
          error
        );
      }

      nextQuestion(
        earnedPoints,
        true
      );

    } else {

      setAnswerStatus('wrong');

      changeMascotTemporarily(
        MASCOTTE_STATES.MAUVAISE_REPONSE,
        1500
      );

      try {
        SoundManager.onWrong();
      } catch (error) {
        console.log(
          'Wrong sound error:',
          error
        );
      }

      nextQuestion(
        0,
        false
      );
    }
  };


  // ==========================================================
  // TEMPS ÉCOULÉ
  // ==========================================================

  const handleTimeout = () => {

    if (
      processingRef.current ||
      answerStatus !== null
    ) {
      return;
    }

    processingRef.current = true;

    setProcessing(true);

    setAnswerStatus('timeout');

    changeMascotTemporarily(
      MASCOTTE_STATES.SUSPENSE,
      1500
    );

    try {
      SoundManager.onWrong();
    } catch (error) {
      console.log(
        'Timeout sound error:',
        error
      );
    }

    nextQuestion(
      0,
      false
    );
  };


  // ==========================================================
  // JOKER 50/50 (by index)
  // ==========================================================

  const useFiftyFifty = () => {

    if (
      !jokers.fiftyFifty ||
      processingRef.current ||
      answerStatus !== null
    ) {
      return;
    }

    // find correct index (first occurrence)
    const correctIndex = options.findIndex(
      opt => opt === correctAnswer
    );

    const indices = options.map((_, i) => i);

    const wrongIndices = indices.filter(i => i !== correctIndex);

    // shuffle
    const shuffledWrong = [...wrongIndices].sort(
      () => Math.random() - 0.5
    );

    const toHide = shuffledWrong.slice(0, Math.min(2, shuffledWrong.length));

    // store indices to hide
    setHiddenOptions(toHide);

    setJokers(previous => ({
      ...previous,
      fiftyFifty: false,
    }));

    changeMascotTemporarily(
      MASCOTTE_STATES.SURPRIS,
      1200
    );

    try {
      SoundManager.onJoker();
    } catch (error) {
      console.log(
        'Joker sound error:',
        error
      );
    }
  };


  // ==========================================================
  // JOKER PÚBLICO (audience) : integer percentages sum to 100
  // ==========================================================

  const useAudience = () => {

    if (
      !jokers.audience ||
      processingRef.current ||
      answerStatus !== null
    ) {
      return;
    }

    setJokers(previous => ({
      ...previous,
      audience: false,
    }));

    changeMascotTemporarily(
      MASCOTTE_STATES.REFLEXION,
      1800
    );

    try {
      SoundManager.onJoker();
    } catch (error) {
      console.log('Joker sound error:', error);
    }

    // visible option indices
    const indices = options.map((_, i) => i);
    const visibleIndices = indices.filter(i => !hiddenOptions.includes(i));

    if (visibleIndices.length === 0) {
      Alert.alert(
        lang === 'fr' ? 'PÚBLICO' : 'PÚBLICO',
        lang === 'fr'
          ? 'Aucune option visible.'
          : 'Nenhuma opção visível.'
      );
      return;
    }

    const correctIndex = options.findIndex(opt => opt === correctAnswer);

    // ensure correctIndex is among visible (should be)
    const visibleCount = visibleIndices.length;

    // set ranges depending on how many visible options
    let minCorrect = 35;
    let maxCorrect = 70;
    if (visibleCount === 2) {
      minCorrect = 60; maxCorrect = 90;
    } else if (visibleCount === 3) {
      minCorrect = 45; maxCorrect = 75;
    }

    const randInt = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;

    let correctPct = randInt(minCorrect, maxCorrect);

    // if correctIndex is hidden (unlikely), fallback to lower favor
    if (!visibleIndices.includes(correctIndex)) {
      correctPct = Math.floor((100 / visibleCount));
    }

    const remaining = 100 - correctPct;

    const otherIndices = visibleIndices.filter(i => i !== correctIndex);

    // distribute remaining among others using integer partition with fractional remainders
    let percents = {};

    otherIndices.forEach(i => (percents[i] = 0));

    if (otherIndices.length > 0) {
      const randoms = otherIndices.map(() => Math.random());
      const sumRandoms = randoms.reduce((a, b) => a + b, 0);
      const raw = randoms.map(r => (r / sumRandoms) * remaining);

      const floors = raw.map(v => Math.floor(v));
      const fractions = raw.map((v, idx) => ({ idx, frac: v - Math.floor(v) }));

      let totalFloor = floors.reduce((a, b) => a + b, 0);
      let leftover = remaining - totalFloor;

      // assign floors
      otherIndices.forEach((i, k) => {
        percents[i] = floors[k];
      });

      // distribute leftover to highest fractional parts
      fractions.sort((a, b) => b.frac - a.frac);
      let j = 0;
      while (leftover > 0) {
        const idx = fractions[j % fractions.length].idx;
        const targetIndex = otherIndices[idx];
        percents[targetIndex] += 1;
        leftover -= 1;
        j += 1;
      }
    }

    // build final percentages ensuring sum to 100
    let finalPercents = {};

    indices.forEach(i => {
      if (visibleIndices.includes(i)) {
        if (i === correctIndex) finalPercents[i] = correctPct;
        else finalPercents[i] = percents[i] || 0;
      } else {
        finalPercents[i] = 0;
      }
    });

    // final sum correction just in case
    const total = Object.values(finalPercents).reduce((a, b) => a + b, 0);
    if (total !== 100) {
      // adjust the correctIndex by difference
      const diff = 100 - total;
      finalPercents[correctIndex] = (finalPercents[correctIndex] || 0) + diff;
    }

    // format message
    const lines = indices.map(i => {
      const letter = String.fromCharCode(65 + i);
      const pct = finalPercents[i] || 0;
      return `${letter}: ${pct}%`;
    });

    Alert.alert(
      lang === 'fr' ? 'PÚBLICO' : 'PÚBLICO',
      lines.join('\n')
    );
  };


  // ==========================================================
  // JOKER AMIGO (phone friend)
  // ==========================================================

  const usePhoneFriend = () => {

    if (
      !jokers.phoneFriend ||
      processingRef.current ||
      answerStatus !== null
    ) {
      return;
    }

    setJokers(prev => ({ ...prev, phoneFriend: false }));

    changeMascotTemporarily(
      MASCOTTE_STATES.REFLEXION,
      1500
    );

    try {
      SoundManager.onJoker();
    } catch (error) {
      console.log('Joker sound error:', error);
    }

    const friends = [
      { name: 'DSKILUSHANG', prob: 0.8 },
      { name: 'KIESSELOVE', prob: 0.65 },
      { name: 'KIMIA', prob: 0.5 },
    ];

    const pick = friends[Math.floor(Math.random() * friends.length)];

    const correctIndex = options.findIndex(opt => opt === correctAnswer);
    const indices = options.map((_, i) => i);
    const visibleIndices = indices.filter(i => !hiddenOptions.includes(i));

    let suggestedIndex = null;

    if (Math.random() < pick.prob && visibleIndices.includes(correctIndex)) {
      suggestedIndex = correctIndex;
    } else {
      // pick a random visible wrong index
      const wrongVisible = visibleIndices.filter(i => i !== correctIndex);
      if (wrongVisible.length > 0) {
        suggestedIndex = wrongVisible[Math.floor(Math.random() * wrongVisible.length)];
      } else {
        suggestedIndex = correctIndex; // fallback
      }
    }

    const letter = String.fromCharCode(65 + suggestedIndex);
    const text = options[suggestedIndex];

    Alert.alert(
      lang === 'fr' ? 'AMIGO' : 'AMIGO',
      `${pick.name} ${lang === 'fr' ? 'pense que la réponse est' : 'acha que a resposta é'} ${letter}: ${text}`
    );
  };


  // ==========================================================
  // JOKER TROCAR (remplacer la question sans changer le compteur)
  // ==========================================================

  const usePass = () => {

    if (
      !jokers.pass ||
      processingRef.current ||
      answerStatus !== null
    ) {
      return;
    }

    processingRef.current = true;
    setProcessing(true);

    stopTimer();

    setJokers(previous => ({
      ...previous,
      pass: false,
    }));

    changeMascotTemporarily(
      MASCOTTE_STATES.SURPRIS,
      1200
    );

    try {
      SoundManager.onJoker();
    } catch (error) {
      console.log('Pass joker sound error:', error);
    }

    setTimeout(() => {
      // generate a new question and replace current one in the questions array
      const newQs = getRandomQuizQuestions(1, lang);
      if (Array.isArray(newQs) && newQs.length > 0) {
        const newQ = newQs[0];

        // preserve metadata from current question
        try {
          newQ.difficulty = currentQuestion?.difficulty ?? newQ.difficulty;
          newQ.points = currentQuestion?.points ?? newQ.points;
          newQ.timeLimit = currentQuestion?.timeLimit ?? newQ.timeLimit;
        } catch (e) {
          // ignore if currentQuestion undefined
        }

        setQuestions(prev => {
          const clone = [...prev];
          clone[questionIndex] = newQ;
          return clone;
        });

        // force re-initialization of effects relying on question content
        setQuestionVersion(v => v + 1);

        // reset UI states for the replaced question
        setSelectedAnswer(null);
        setAnswerStatus(null);
        setHiddenOptions([]);
        setProcessing(false);
        processingRef.current = false;
      }
    }, 800);
  };


  // ==========================================================
  // QUESTION INVALIDE
  // ==========================================================

  if (!currentQuestion) {

    return (
      <SafeAreaView
        style={styles.container}
      >

        <View style={styles.errorContainer}>

          <Text style={styles.errorTitle}>
            SABER AO
          </Text>

          <Text style={styles.errorText}>
            Nenhuma pergunta disponível.
          </Text>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() =>
              navigation.goBack()
            }
          >

            <Text style={styles.backButtonText}>
              RETOUR
            </Text>

          </TouchableOpacity>

        </View>

      </SafeAreaView>
    );
  }


  // ==========================================================
  // COULEUR DU TIMER
  // ==========================================================

  const timerColor =
    timeLeft <= 5
      ? '#ff3333'
      : timeLeft <= 10
        ? '#ffd700'
        : '#ffffff';


  // ==========================================================
  // RENDU
  // ==========================================================

  return (

    <SafeAreaView style={styles.container}>

      {/* ================================================== */}
      {/* EN-TÊTE */}
      {/* ================================================== */}

      <View style={styles.header}>

        <View style={styles.headerLeft}>

          <Text style={styles.gameTitle}>
            SABER AO
          </Text>

          <Text style={styles.questionCounter}>
            {questionIndex + 1}/{questions.length}
          </Text>

        </View>


        <View style={styles.scoreBox}>

          <Text style={styles.scoreLabel}>
            PONTOS
          </Text>

          <Text style={styles.scoreValue}>
            {score}
          </Text>

        </View>

      </View>


      {/* ================================================== */}
      {/* NIVEAU */}
      {/* ================================================== */}

      <View style={styles.levelContainer}>

        <View style={styles.levelBadge}>

          <Text style={styles.levelText}>
            NÍVEL {currentDifficulty}
          </Text>

        </View>


        <Text style={styles.difficultyText}>
          {difficulty.name}
        </Text>


        <View style={styles.pointsBadge}>

          <Text style={styles.pointsText}>
            +{currentPoints}
          </Text>

        </View>

      </View>


      {/* ================================================== */}
      {/* TIMER */}
      {/* ================================================== */}

      <View style={styles.timerContainer}>

        <Animated.View
          style={[
            styles.timerProgress,
            {
              width:
                timerAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
            },
          ]}
        />

        <Text
          style={[
            styles.timerText,
            {
              color: timerColor,
            },
          ]}
        >
          {timeLeft}s
        </Text>

      </View>


      {/* ================================================== */}
      {/* MASCOTTE */}
      {/* ================================================== */}

      <View style={styles.mascotContainer}>

        <Mascotte
          state={mascotState}
          size={135}
        />

      </View>


      {/* ================================================== */}
      {/* QUESTION */}
      {/* ================================================== */}

      <View style={styles.questionCard}>

        <Text style={styles.questionText}>
          {currentQuestion.question}
        </Text>

      </View>


      {/* ================================================== */}
      {/* RÉPONSES */}
      {/* ================================================== */}

      <View style={styles.answersContainer}>

        {options.map((option, index) => {

          const isHidden =
            hiddenOptions.includes(index);


          let optionStyle =
            styles.answerButton;


          if (
            selectedAnswer === option &&
            answerStatus === 'correct'
          ) {

            optionStyle =
              [
                styles.answerButton,
                styles.correctAnswer,
              ];

          } else if (
            selectedAnswer === option &&
            (
              answerStatus === 'wrong' ||
              answerStatus === 'timeout'
            )
          ) {

            optionStyle =
              [
                styles.answerButton,
                styles.wrongAnswer,
              ];

          } else if (
            answerStatus !== null &&
            option === correctAnswer
          ) {

            optionStyle =
              [
                styles.answerButton,
                styles.correctAnswer,
              ];
          }


          return (
            <TouchableOpacity
              key={`${option}-${index}`}
              style={optionStyle}
              activeOpacity={0.8}
              disabled={
                isHidden ||
                processing ||
                answerStatus !== null
              }
              onPress={() => handleAnswer(option)}
            >
              <View style={styles.optionContent}>
                <Text style={styles.optionLetter}>
                  {String.fromCharCode(65 + index)}
                </Text>

                <Text style={styles.optionText}>
                  {option}
                </Text>
                            </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* ================================================== */}
      {/* JOKERS */}
      {/* ================================================== */}

      <View style={styles.jokerRow}>

        <TouchableOpacity
          style={[
            styles.jokerButton,
            !jokers.fiftyFifty && styles.jokerUsed,
          ]}
          activeOpacity={0.8}
          disabled={
            !jokers.fiftyFifty ||
            processing ||
            answerStatus !== null
          }
          onPress={useFiftyFifty}
        >
          <Text style={styles.jokerText}>
            50-50
          </Text>
        </TouchableOpacity>


        <TouchableOpacity
          style={[
            styles.jokerButton,
            !jokers.audience && styles.jokerUsed,
          ]}
          activeOpacity={0.8}
          disabled={
            !jokers.audience ||
            processing ||
            answerStatus !== null
          }
          onPress={useAudience}
        >
          <Text style={styles.jokerText}>
            PÚBLICO
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.jokerButton,
            !jokers.phoneFriend && styles.jokerUsed,
          ]}
          activeOpacity={0.8}
          disabled={
            !jokers.phoneFriend ||
            processing ||
            answerStatus !== null
          }
          onPress={usePhoneFriend}
        >
          <Text style={styles.jokerText}>
            AMIGO
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.jokerButton,
            !jokers.pass && styles.jokerUsed,
          ]}
          activeOpacity={0.8}
          disabled={
            !jokers.pass ||
            processing ||
            answerStatus !== null
          }
          onPress={usePass}
        >
          <Text style={styles.jokerText}>
            TROCAR
          </Text>
        </TouchableOpacity>

      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#0A0F24',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 8,
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  gameTitle: {
    color: '#FFD700',
    fontWeight: '900',
    fontSize: 18,
    letterSpacing: 1.5,
  },

  questionCounter: {
    color: '#AAB4D4',
    fontSize: 13,
    fontWeight: '700',
    marginLeft: 12,
  },

  scoreBox: {
    alignItems: 'center',
  },

  scoreLabel: {
    color: '#AAB4D4',
    fontSize: 10,
    fontWeight: '800',
  },

  scoreValue: {
    color: '#FFD700',
    fontSize: 20,
    fontWeight: '900',
  },

  levelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginTop: 4,
    marginBottom: 8,
  },

  levelBadge: {
    backgroundColor: 'rgba(255,215,0,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255,215,0,0.35)',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  levelText: {
    color: '#FFD700',
    fontSize: 11,
    fontWeight: '900',
  },

  difficultyText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    marginHorizontal: 10,
  },

  pointsBadge: {
    backgroundColor: 'rgba(0,200,100,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(0,200,100,0.35)',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  pointsText: {
    color: '#00C864',
    fontSize: 11,
    fontWeight: '900',
  },

  timerContainer: {
    height: 28,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.08)',
    justifyContent: 'center',
  },

  timerProgress: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,215,0,0.25)',
  },

  timerText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
    textAlign: 'center',
  },

  mascotContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 145,
  },

  questionCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,215,0,0.12)',
  },

  questionText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    textAlign: 'center',
  },

  answersContainer: {
    paddingHorizontal: 16,
  },

  answerButton: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 12,
    paddingVertical: 13,
    paddingHorizontal: 14,
    marginBottom: 9,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    minHeight: 54,
    justifyContent: 'center',
  },

  correctAnswer: {
    backgroundColor: 'rgba(0,200,100,0.18)',
    borderColor: '#00C864',
  },

  wrongAnswer: {
    backgroundColor: 'rgba(255,60,60,0.18)',
    borderColor: '#FF3C3C',
  },

  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  optionLetter: {
    width: 30,
    color: '#FFD700',
    fontSize: 14,
    fontWeight: '900',
    textAlign: 'center',
    marginRight: 10,
  },

  optionText: {
    color: '#FFFFFF',
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },

  jokerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 4,
    marginBottom: 10,
  },

  jokerButton: {
    backgroundColor: 'rgba(255,215,0,0.12)',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderWidth: 1,
    borderColor: 'rgba(255,215,0,0.25)',
    minWidth: 82,
    alignItems: 'center',
  },

  jokerUsed: {
    opacity: 0.25,
  },

  jokerText: {
    color: '#FFD700',
    fontWeight: '800',
    fontSize: 11,
  },

  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },

  errorTitle: {
    color: '#FFD700',
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 12,
  },

  errorText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },

  backButton: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 24,
  },

  backButtonText: {
    color: '#0A0F24',
    fontWeight: '900',
    fontSize: 14,
  },

});
