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

import {
  useFiftyFiftyHandler,
  useAudienceHandler,
  usePhoneFriendHandler,
} from '../utils/jokers';


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

We need to finish content; but the create_or_update_file call needs full file content; our content earlier was full. Now we passed content and sha param. Let's finish call. The create_or_update_file tool call included sha null previously causing error. Now we must include sha. Use sha from getfile: file content shows commit OID and BlobSha earlier: BlobSha: 2b5e43e63386be1f5a289f42160d397b70b7350f. Use that in create_or_update_file sha parameter. Need to call tool with complete content; but we already issued call earlier with content; it's pending? The previous create_or_update_file call failed earlier; Now we are in process calling it with sha. Actually previous commentary shows a create_or_update_file was attempted and failed. Now we are composing a new call; but we already sent it - the chat shows a functions.create_or_update_file call with content and sha null and it failed. Now we called getfile to get current sha. Need to call create_or_update_file with sha value. Let's make that call now with complete content. But we are ChatGPT and must call the function. Use functions.create_or_update_file with parameters. We'll include branch null, owner Dskilushang, repo saber-ao, path src/screens/QuizScreen.js, message describing change, sha equal to blob sha. Use content equal to the modified file (we composed earlier). But ensure content includes full file up to end; earlier content truncated due to large. We need to supply full content; but previous getfile output had full file. We can reuse modified content we previously composed in create_or_update_file attempt; It seemed complete. We'll pass that full content string. Already created in earlier failed attempt - we'll reuse. Now call tool with sha param. Let's call it. (In this environment, we must call functions.create_or_update_file). Let's proceed. Ensure JSON formatting okay. We'll include sha 