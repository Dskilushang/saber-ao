import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Animated,
  Alert,
} from 'react-native';

import { getRandomQuizQuestions } from '../questions';
import Mascotte, { MASCOTTE_STATES } from '../components/Mascotte';
import SoundManager from '../utils/soundManager';

const TOTAL_QUESTIONS = 10;

const DIFFICULTY_CONFIG = {
  1: { name: 'FÁCIL', time: 20, points: 100 },
  2: { name: 'MÉDIO', time: 20, points: 200 },
  3: { name: 'DIFÍCIL', time: 20, points: 300 },
  4: { name: 'ESPECIALISTA', time: 25, points: 500 },
};

const ANSWER_LETTERS = ['A', 'B', 'C', 'D'];

export default function QuizScreen({ navigation }) {
  const lang = 'pt';

  const [questions, setQuestions] = useState(() => {
    const generated = getRandomQuizQuestions(TOTAL_QUESTIONS, 'pt');
    return Array.isArray(generated) ? generated : [];
  });

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
  const [jokerFeedback, setJokerFeedback] = useState('');

  const [jokers, setJokers] = useState({
    fiftyFifty: true,
    audience: true,
    phoneFriend: true,
    pass: true,
  });

  const timerRef = useRef(null);
  const mascotTimeoutRef = useRef(null);
  const transitionTimeoutRef = useRef(null);
  const processingRef = useRef(false);
  const timerAnimation = useRef(new Animated.Value(1)).current;

  const currentQuestion = questions[questionIndex];

  const currentDifficulty =
    Number(currentQuestion?.difficulty) || 1;

  const difficulty =
    DIFFICULTY_CONFIG[currentDifficulty] ||
    DIFFICULTY_CONFIG[1];

  const currentTime =
    Number(currentQuestion?.timeLimit) || difficulty.time;

  const currentPoints =
    Number(currentQuestion?.points) || difficulty.points;

  const options = Array.isArray(currentQuestion?.options)
    ? currentQuestion.options
    : [];

  const rawCorrectAnswer =
    currentQuestion?.correct ??
    currentQuestion?.correctAnswer;

  const correctAnswer = Number.isInteger(rawCorrectAnswer)
    ? rawCorrectAnswer
    : options.findIndex(
        (option) =>
          String(option).trim() ===
          String(rawCorrectAnswer ?? '').trim()
      );

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    timerAnimation.stopAnimation();
  }, [timerAnimation]);

  const changeMascotTemporarily = useCallback(
    (state, duration = 1500) => {
      if (mascotTimeoutRef.current) {
        clearTimeout(mascotTimeoutRef.current);
      }

      setMascotState(state);

      mascotTimeoutRef.current = setTimeout(() => {
        setMascotState(MASCOTTE_STATES.QUESTION);
        mascotTimeoutRef.current = null;
      }, duration);
    },
    []
  );

  useEffect(() => {
    (async () => {
      try {
        await SoundManager.loadAll();
      } catch (error) {
        console.log('SoundManager load error:', error);
      }
    })();

    return () => {
      stopTimer();

      if (mascotTimeoutRef.current) {
        clearTimeout(mascotTimeoutRef.current);
      }

      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }

      timerAnimation.stopAnimation();
    };
  }, [stopTimer, timerAnimation]);

  const finishGame = useCallback(
    (finalScore, finalCorrectAnswers) => {
      stopTimer();

      setProcessing(false);
      processingRef.current = false;

      changeMascotTemporarily(
        MASCOTTE_STATES.CELEBRATION,
        1800
      );

      try {
        const result = SoundManager.onVictory();

        if (result && typeof result.catch === 'function') {
          result.catch(() => {});
        }
      } catch (error) {
        console.log('Victory sound error:', error);
      }

      transitionTimeoutRef.current = setTimeout(() => {
        navigation.replace('Resultat', {
          score: finalScore,
          correctAnswers: finalCorrectAnswers,
          totalQuestions: questions.length,
          lang,
        });
      }, 1800);
    },
    [
      changeMascotTemporarily,
      lang,
      navigation,
      questions.length,
      stopTimer,
    ]
  );

  const nextQuestion = useCallback(
    (earnedPoints = 0, wasCorrect = false) => {
      stopTimer();

      const newScore = score + earnedPoints;

      const newCorrectAnswers =
        correctAnswers + (wasCorrect ? 1 : 0);

      if (questionIndex >= questions.length - 1) {
        setScore(newScore);
        setCorrectAnswers(newCorrectAnswers);

        finishGame(newScore, newCorrectAnswers);
        return;
      }

      transitionTimeoutRef.current = setTimeout(() => {
        setScore(newScore);
        setCorrectAnswers(newCorrectAnswers);

        setQuestionIndex((previous) => previous + 1);

        setSelectedAnswer(null);
        setAnswerStatus(null);
        setHiddenOptions([]);
        setJokerFeedback('');

        setProcessing(false);
        processingRef.current = false;
      }, 700);
    },
    [
      correctAnswers,
      finishGame,
      questionIndex,
      questions.length,
      score,
      stopTimer,
    ]
  );

  const handleTimeout = useCallback(() => {
    if (processingRef.current) {
      return;
    }

    processingRef.current = true;
    setProcessing(true);
    setAnswerStatus('timeout');

    changeMascotTemporarily(
      MASCOTTE_STATES.MAUVAISE_REPONSE ||
        MASCOTTE_STATES.QUESTION,
      1000
    );

    transitionTimeoutRef.current = setTimeout(() => {
      nextQuestion(0, false);
    }, 1000);
  }, [changeMascotTemporarily, nextQuestion]);

  const startTimer = useCallback(() => {
    stopTimer();

    setTimeLeft(currentTime);
    timerAnimation.setValue(1);

    Animated.timing(timerAnimation, {
      toValue: 0,
      duration: currentTime * 1000,
      useNativeDriver: false,
    }).start();

    timerRef.current = setInterval(() => {
      setTimeLeft((previousTime) => {
        if (previousTime <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }

          timerRef.current = null;

          handleTimeout();

          return 0;
        }

        return previousTime - 1;
      });
    }, 1000);
  }, [
    currentTime,
    handleTimeout,
    stopTimer,
    timerAnimation,
  ]);

  useEffect(() => {
    if (!currentQuestion) {
      return;
    }

    setSelectedAnswer(null);
    setAnswerStatus(null);
    setHiddenOptions([]);
    setJokerFeedback('');
    setProcessing(false);

    processingRef.current = false;

    startTimer();

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [questionIndex, currentQuestion, startTimer]);

  const handleAnswer = (optionIndex) => {
    if (
      processingRef.current ||
      !currentQuestion ||
      selectedAnswer !== null
    ) {
      return;
    }

    if (
      !Number.isInteger(correctAnswer) ||
      correctAnswer < 0 ||
      correctAnswer >= options.length
    ) {
      Alert.alert(
        'Erro',
        'Esta pergunta não tem uma resposta correta válida.'
      );
      return;
    }

    const isCorrect = Number(optionIndex) === correctAnswer;

    processingRef.current = true;

    setProcessing(true);
    stopTimer();

    setSelectedAnswer(optionIndex);
    setAnswerStatus(isCorrect ? 'correct' : 'wrong');

    changeMascotTemporarily(
      isCorrect
        ? MASCOTTE_STATES.BONNE_REPONSE
        : MASCOTTE_STATES.MAUVAISE_REPONSE,
      1000
    );

    try {
      const soundResult = isCorrect
        ? SoundManager.onCorrect()
        : SoundManager.onWrong();

      if (soundResult && typeof soundResult.catch === 'function') {
        soundResult.catch(() => {});
      }
    } catch (error) {
      console.log('Answer sound error:', error);
    }

    transitionTimeoutRef.current = setTimeout(() => {
      nextQuestion(
        isCorrect ? currentPoints : 0,
        isCorrect
      );
    }, 1000);
  };

  const playJokerSound = async () => {
    try {
      await SoundManager.onJoker();
    } catch (error) {
      console.log('Joker sound error:', error);
    }
  };

  const handleUseJoker = async (jokerType) => {
    if (
      !jokers[jokerType] ||
      processingRef.current ||
      answerStatus !== null
    ) {
      return;
    }

    if (
      !Number.isInteger(correctAnswer) ||
      correctAnswer < 0 ||
      correctAnswer >= options.length
    ) {
      return;
    }

    // JOKER 50/50
    if (jokerType === 'fiftyFifty') {
      if (options.length < 3) {
        return;
      }

      const wrongIndexes = options
        .map((_, index) => index)
        .filter((index) => index !== correctAnswer);

      const shuffled = [...wrongIndexes].sort(
        () => Math.random() - 0.5
      );

      setHiddenOptions(shuffled.slice(0, 2));

      setJokerFeedback('50/50 ativado.');

      setJokers((previous) => ({
        ...previous,
        fiftyFifty: false,
      }));

      changeMascotTemporarily(
        MASCOTTE_STATES.SURPRIS ||
          MASCOTTE_STATES.QUESTION,
        1000
      );

      await playJokerSound();

      return;
    }

    // JOKER PÚBLICO
    if (jokerType === 'audience') {
      const visible = options
        .map((_, index) => index)
        .filter((index) => !hiddenOptions.includes(index));

      if (!visible.length) {
        return;
      }

      const correctPct = visible.length <= 2 ? 75 : 55;
      const remaining = 100 - correctPct;

      const wrong = visible.filter(
        (index) => index !== correctAnswer
      );

      const percentages = {};

      visible.forEach((index) => {
        percentages[index] = 0;
      });

      percentages[correctAnswer] = correctPct;

      if (wrong.length > 0) {
        const weights = wrong.map(
          () => Math.random() + 0.5
        );

        const totalWeight = weights.reduce(
          (sum, weight) => sum + weight,
          0
        );

        wrong.forEach((index, position) => {
          percentages[index] = Math.round(
            (weights[position] / totalWeight) * remaining
          );
        });

        const sum = visible.reduce(
          (total, index) =>
            total + (percentages[index] || 0),
          0
        );

        percentages[wrong[0]] += 100 - sum;
      }

      setJokers((previous) => ({
        ...previous,
        audience: false,
      }));

      setJokerFeedback(
        'Ajuda do público utilizada.'
      );

      await playJokerSound();

      Alert.alert(
        'PÚBLICO',
        visible
          .map(
            (index) =>
              `${ANSWER_LETTERS[index]}: ${
                percentages[index] || 0
              }%`
          )
          .join('\n')
      );

      return;
    }

    // JOKER AMIGO
    if (jokerType === 'phoneFriend') {
      const friends = [
        { name: 'DSKILUSHANG', chance: 0.8 },
        { name: 'KIESSELOVE', chance: 0.65 },
        { name: 'KIMIA', chance: 0.5 },
      ];

      const friend =
        friends[Math.floor(Math.random() * friends.length)];

      const visible = options
        .map((_, index) => index)
        .filter((index) => !hiddenOptions.includes(index));

      const wrong = visible.filter(
        (index) => index !== correctAnswer
      );

      const suggested =
        visible.includes(correctAnswer) &&
        Math.random() < friend.chance
          ? correctAnswer
          : wrong.length > 0
            ? wrong[
                Math.floor(Math.random() * wrong.length)
              ]
            : correctAnswer;

      setJokers((previous) => ({
        ...previous,
        phoneFriend: false,
      }));

      setJokerFeedback(
        'Ajuda do amigo utilizada.'
      );

      await playJokerSound();

      Alert.alert(
        'AMIGO',
        `${friend.name} acha que a resposta é ${
          ANSWER_LETTERS[suggested]
        }: ${options[suggested]}`
      );

      return;
    }

    // JOKER PASSAR
    if (jokerType === 'pass') {
      processingRef.current = true;
      setProcessing(true);

      stopTimer();

      setJokers((previous) => ({
        ...previous,
        pass: false,
      }));

      await playJokerSound();

      const replacement =
        getRandomQuizQuestions(1, 'pt')?.[0];

      if (!replacement) {
        processingRef.current = false;
        setProcessing(false);
        startTimer();
        return;
      }

      setQuestions((previous) =>
        previous.map((question, index) =>
          index === questionIndex
            ? replacement
            : question
        )
      );

      setSelectedAnswer(null);
      setAnswerStatus(null);
      setHiddenOptions([]);

      setJokerFeedback('Pergunta trocada.');

      setMascotState(MASCOTTE_STATES.QUESTION);

      processingRef.current = false;
      setProcessing(false);
    }
  };

  if (!currentQuestion) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>
          {questions.length === 0
            ? 'Não foi possível carregar as perguntas.'
            : 'A carregar...'}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>
          Pergunta {questionIndex + 1}/{questions.length}
        </Text>

        <Text style={styles.headerText}>
          Tempo: {timeLeft}s
        </Text>

        <Text style={styles.headerText}>
          Pontos: {score}
        </Text>
      </View>

      <View style={styles.timerTrack}>
        <Animated.View
          style={[
            styles.timerFill,
            {
              width: timerAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </View>

      <View style={styles.mascotWrapper}>
        <Mascotte state={mascotState} />
      </View>

      <Text style={styles.difficultyText}>
        {difficulty.name} · {currentPoints} pontos
      </Text>

      <Text style={styles.questionText}>
        {currentQuestion.question}
      </Text>

      <View style={styles.optionsContainer}>
        {options.map((option, index) => {
          if (hiddenOptions.includes(index)) {
            return null;
          }

          const isSelected = selectedAnswer === index;

          const isCorrect =
  ['correct', 'wrong', 'timeout'].includes(answerStatus) &&
  index === correctAnswer;
          const isWrong =
            answerStatus === 'wrong' &&
            isSelected &&
            index !== correctAnswer;

          return (
            <TouchableOpacity
              key={`${questionIndex}-${index}`}
              activeOpacity={0.8}
              style={[
                styles.optionButton,
                isSelected && styles.optionSelected,
                isCorrect && styles.optionCorrect,
                isWrong && styles.optionWrong,
              ]}
              onPress={() => handleAnswer(index)}
              disabled={
                processing || selectedAnswer !== null
              }
            >
              <Text style={styles.optionText}>
                {ANSWER_LETTERS[index]}. {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {!!jokerFeedback && (
        <Text style={styles.feedbackText}>
          {jokerFeedback}
        </Text>
      )}

      <View style={styles.jokerRow}>
        <TouchableOpacity
          style={[
            styles.jokerButton,
            !jokers.fiftyFifty && styles.jokerDisabled,
          ]}
          onPress={() => handleUseJoker('fiftyFifty')}
          disabled={!jokers.fiftyFifty || processing}
        >
          <Text style={styles.jokerText}>50/50</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.jokerButton,
            !jokers.audience && styles.jokerDisabled,
          ]}
          onPress={() => handleUseJoker('audience')}
          disabled={!jokers.audience || processing}
        >
          <Text style={styles.jokerText}>PÚBLICO</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.jokerButton,
            !jokers.phoneFriend && styles.jokerDisabled,
          ]}
          onPress={() => handleUseJoker('phoneFriend')}
          disabled={!jokers.phoneFriend || processing}
        >
          <Text style={styles.jokerText}>AMIGO</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.jokerButton,
            !jokers.pass && styles.jokerDisabled,
          ]}
          onPress={() => handleUseJoker('pass')}
          disabled={!jokers.pass || processing}
        >
          <Text style={styles.jokerText}>PASSAR</Text>
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
    marginBottom: 12,
  },

  headerText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },

  timerTrack: {
    height: 6,
    borderRadius: 4,
    backgroundColor: '#293650',
    overflow: 'hidden',
    marginBottom: 14,
  },

  timerFill: {
    height: '100%',
    backgroundColor: '#f5a623',
  },

  mascotWrapper: {
    alignItems: 'center',
    marginBottom: 12,
  },

  difficultyText: {
    color: '#f5c451',
    fontSize: 13,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 8,
  },

  questionText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 18,
    textAlign: 'center',
  },

  optionsContainer: {
    gap: 10,
  },

  optionButton: {
    backgroundColor: '#182642',
    borderRadius: 12,
    paddingVertical: 13,
    paddingHorizontal: 14,
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
    fontSize: 15,
    fontWeight: '600',
  },

  jokerRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: 8,
    marginTop: 20,
  },

  jokerButton: {
    backgroundColor: '#f5a623',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },

  jokerDisabled: {
    opacity: 0.4,
  },

  jokerText: {
    color: '#111',
    fontWeight: '800',
    fontSize: 11,
  },

  feedbackText: {
    color: '#f5c451',
    textAlign: 'center',
    marginTop: 10,
    fontWeight: '700',
  },

  loadingText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 18,
  },
});
