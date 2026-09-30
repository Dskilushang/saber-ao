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

  const [questions] = useState(() =>
    getRandomQuizQuestions(TOTAL_QUESTIONS, lang)
  );


  // ----------------------------------------------------------
  // ÉTAT DU JEU
  // ----------------------------------------------------------

  const [questionIndex, setQuestionIndex] = useState(0);

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

  const [hiddenOptions, setHiddenOptions] = useState([]);

  const [jokers, setJokers] = useState({
    fiftyFifty: true,
    hint: true,
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

  }, [questionIndex]);


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

    /*
     * Pour l'instant :
     *
     * FACILE        = 100 points
     * INTERMÉDIAIRE = 200 points
     * DIFFICILE     = 300 points
     * EXPERT        = 500 points
     *
     * Le bonus de rapidité et la pénalité des jokers
     * pourront être ajoutés ensuite lorsque leur formule
     * définitive sera arrêtée.
     */

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
  // JOKER 50/50
  // ==========================================================

  const useFiftyFifty = () => {

    if (
      !jokers.fiftyFifty ||
      processingRef.current ||
      answerStatus !== null
    ) {
      return;
    }


    const wrongOptions =
      options.filter(
        option =>
          option !== correctAnswer
      );


    /*
     * On retire deux mauvaises réponses
     * maximum.
     */

    const shuffledWrong =
      [...wrongOptions].sort(
        () => Math.random() - 0.5
      );


    const toHide =
      shuffledWrong.slice(0, 2);


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
  // JOKER INDICE
  // ==========================================================

  const useHint = () => {

    if (
      !jokers.hint ||
      processingRef.current ||
      answerStatus !== null
    ) {
      return;
    }


    setJokers(previous => ({
      ...previous,
      hint: false,
    }));


    changeMascotTemporarily(
      MASCOTTE_STATES.REFLEXION,
      1800
    );


    try {
      SoundManager.onJoker();
    } catch (error) {
      console.log(
        'Hint sound error:',
        error
      );
    }


    const hint =
      currentQuestion?.hint;


    if (hint) {

      Alert.alert(
        lang === 'fr'
          ? 'INDICE'
          : 'DICA',
        hint
      );

    } else {

      /*
       * Si la banque de questions ne contient
       * pas encore de véritable indice, on informe
       * simplement le joueur.
       */

      Alert.alert(
        lang === 'fr'
          ? 'INDICE'
          : 'DICA',
        lang === 'fr'
          ? 'Aucun indice supplémentaire disponible pour cette question.'
          : 'Nenhuma dica adicional disponível para esta pergunta.'
      );
    }
  };


  // ==========================================================
  // JOKER PASSER / TROUVER UNE AUTRE QUESTION
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
      console.log(
        'Pass joker sound error:',
        error
      );
    }


    setTimeout(() => {

      if (
        questionIndex >=
        questions.length - 1
      ) {

        finishGame(
          score,
          correctAnswers
        );

        return;
      }


      setQuestionIndex(
        previousIndex =>
          previousIndex + 1
      );

    }, 1000);
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
            hiddenOptions.includes(option);


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
            !jokers.hint && styles.jokerUsed,
          ]}
          activeOpacity={0.8}
          disabled={
            !jokers.hint ||
            processing ||
            answerStatus !== null
          }
          onPress={useHint}
        >
          <Text style={styles.jokerText}>
            DICA
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
            PASSAR
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
