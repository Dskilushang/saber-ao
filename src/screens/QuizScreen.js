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

  const [questions, setQuestions] = useState(() =>
    getRandomQuizQuestions(TOTAL_QUESTIONS, lang)
  );

  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [mascotState, setMascotState] = useState(
    MASCOTTE_STATES.QUESTION
  );
  const [hiddenOptions, setHiddenOptions] = useState([]);
  const [jokers, setJokers] = useState({
    fiftyFifty: true,
    audience: true,
    phoneFriend: true,
    pass: true,
  });

  const timerRef = useRef(null);
  const mascotTimeoutRef = useRef(null);
  const processingRef = useRef(false);
  const timerAnimation = useRef(new Animated.Value(1)).current;

  const currentQuestion = questions[questionIndex];
  const currentDifficulty = Number(currentQuestion?.difficulty) || 1;
  const difficulty = DIFFICULTY_CONFIG[currentDifficulty] || DIFFICULTY_CONFIG[1];
  const currentTime = Number(currentQuestion?.timeLimit) || difficulty.time;
  const currentPoints = Number(currentQuestion?.points) || difficulty.points;
  const correctAnswer = currentQuestion?.correct ?? currentQuestion?.correctAnswer ?? null;
  const options = Array.isArray(currentQuestion?.options) ? currentQuestion.options : [];

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
  }, [timerAnimation]);

  useEffect(() => {
    const initializeSounds = async () => {
      try {
        await SoundManager.loadAll();
      } catch (error) {
        console.log('SoundManager load error:', error);
      }
    };

    initializeSounds();
  }, []);

  const changeMascotTemporarily = (state, duration = 1500) => {
    if (mascotTimeoutRef.current) {
      clearTimeout(mascotTimeoutRef.current);
    }

    setMascotState(state);

    mascotTimeoutRef.current = setTimeout(() => {
      setMascotState(MASCOTTE_STATES.QUESTION);
    }, duration);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    timerAnimation.stopAnimation();
  };

  const finishGame = (finalScore, finalCorrectAnswers) => {
    stopTimer();
    setProcessing(false);
    processingRef.current = false;

    changeMascotTemporarily(MASCOTTE_STATES.CELEBRATION, 2000);

    try {
      SoundManager.onVictory();
    } catch (error) {
      console.log('Victory sound error:', error);
    }

    setTimeout(() => {
      navigation.replace('Resultat', {
        score: finalScore,
        correctAnswers: finalCorrectAnswers,
        totalQuestions: questions.length,
        lang,
      });
    }, 1800);
  };

  const startTimer = () => {
    stopTimer();
    timerAnimation.setValue(1);

    Animated.timing(timerAnimation, {
      toValue: 0,
      duration: currentTime * 1000,
      useNativeDriver: false,
    }).start();

    timerRef.current = setInterval(() => {
      setTimeLeft((previousTime) => {
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

  const nextQuestion = (earnedPoints = 0, wasCorrect = false) => {
    stopTimer();

    const newScore = score + earnedPoints;
    const newCorrectAnswers = correctAnswers + (wasCorrect ? 1 : 0);

    if (questionIndex >= questions.length - 1) {
      finishGame(newScore, newCorrectAnswers);
      return;
    }

    setTimeout(() => {
      setScore(newScore);
      setCorrectAnswers(newCorrectAnswers);
      setQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setAnswerStatus(null);
      setHiddenOptions([]);
      setProcessing(false);
      processingRef.current = false;
      setTimeLeft(currentTime);
      setMascotState(MASCOTTE_STATES.QUESTION);
    }, 800);
  };

  const handleTimeout = () => {
    if (processingRef.current) {
      return;
    }

    processingRef.current = true;
    setProcessing(true);
    setAnswerStatus('timeout');

    setTimeout(() => {
      nextQuestion(0, false);
    }, 1200);
  };

  const handleAnswer = (optionIndex) => {
    if (processing || !currentQuestion || selectedAnswer !== null) {
      return;
    }

    const isCorrect = Number(optionIndex) === Number(correctAnswer);

    processingRef.current = true;
    setProcessing(true);
    setSelectedAnswer(optionIndex);
    setAnswerStatus(isCorrect ? 'correct' : 'wrong');

    setTimeout(() => {
      nextQuestion(isCorrect ? currentPoints : 0, isCorrect);
    }, 1200);
  };

  const handleUseJoker = (jokerType) => {
    if (!jokers[jokerType] || processing) {
      return;
    }

    if (jokerType === 'fiftyFifty' && Array.isArray(options)) {
      const wrongIndexes = options
        .map((_, index) => index)
        .filter((index) => index !== Number(correctAnswer));

      const shuffled = [...wrongIndexes].sort(() => Math.random() - 0.5);
      const toHide = shuffled.slice(0, 2);
      setHiddenOptions(toHide);
    }

    setJokers((prev) => ({
      ...prev,
      [jokerType]: false,
    }));
  };

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
    setMascotState(MASCOTTE_STATES.QUESTION);
    startTimer();
  }, [questionIndex, currentQuestion, currentTime]);

  if (!currentQuestion) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Chargement...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>Question {questionIndex + 1}/{questions.length}</Text>
        <Text style={styles.headerText}>Temps: {timeLeft}s</Text>
        <Text style={styles.headerText}>Score: {score}</Text>
      </View>

      <View style={styles.mascotWrapper}>
        <Mascotte state={mascotState} />
      </View>

      <Text style={styles.questionText}>{currentQuestion.question}</Text>

      <View style={styles.optionsContainer}>
        {options.map((option, index) => {
          const hidden = hiddenOptions.includes(index);
          if (hidden) {
            return null;
          }

          const isSelected = selectedAnswer === index;
          const isCorrect = answerStatus === 'correct' && index === Number(correctAnswer);
          const isWrong = answerStatus === 'wrong' && selectedAnswer === index && index !== Number(correctAnswer);

          return (
            <TouchableOpacity
              key={index}
              activeOpacity={0.8}
              style={[
                styles.optionButton,
                isSelected && styles.optionSelected,
                isCorrect && styles.optionCorrect,
                isWrong && styles.optionWrong,
              ]}
              onPress={() => handleAnswer(index)}
              disabled={processing}
            >
              <Text style={styles.optionText}>
                {ANSWER_LETTERS[index]}. {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.jokerRow}>
        <TouchableOpacity
          style={[styles.jokerButton, !jokers.fiftyFifty && styles.jokerDisabled]}
          onPress={() => handleUseJoker('fiftyFifty')}
          disabled={!jokers.fiftyFifty || processing}
        >
          <Text style={styles.jokerText}>50/50</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.jokerButton, !jokers.audience && styles.jokerDisabled]}
          onPress={() => handleUseJoker('audience')}
          disabled={!jokers.audience || processing}
        >
          <Text style={styles.jokerText}>Public</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.jokerButton, !jokers.phoneFriend && styles.jokerDisabled]}
          onPress={() => handleUseJoker('phoneFriend')}
          disabled={!jokers.phoneFriend || processing}
        >
          <Text style={styles.jokerText}>Ami</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#10182a',
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  headerText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  mascotWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  questionText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: '#182642',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#2a3f66',
  },
  optionSelected: {
    borderColor: '#78a6ff',
    backgroundColor: '#1f355e',
  },
  optionCorrect: {
    borderColor: '#2ecc71',
    backgroundColor: '#173c2d',
  },
  optionWrong: {
    borderColor: '#ff5d5d',
    backgroundColor: '#4b2028',
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  jokerRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 24,
  },
  jokerButton: {
    backgroundColor: '#f5a623',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  jokerDisabled: {
    opacity: 0.4,
  },
  jokerText: {
    color: '#111',
    fontWeight: '700',
  },
  loadingText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 18,
  },
});
