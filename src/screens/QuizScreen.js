import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Animated,
  Alert,
  Modal,
  Image,
} from 'react-native';

import { getRandomQuizQuestions } from '../questions';
import Mascotte, { MASCOTTE_STATES } from '../components/Mascotte';
import SoundManager from '../utils/soundManager';
import dskilushangImage from '../../assets/mascottes-optimized/dskilushang_ref.webp';
import kiesseloveImage from '../../assets/mascottes-optimized/kiesselove_ref.webp';
import kimiaImage from '../../assets/mascottes-optimized/kimia_ref.webp';

const TOTAL_QUESTIONS = 10;

const DIFFICULTY_CONFIG = {
  1: { name: 'FÁCIL', time: 20, points: 100 },
  2: { name: 'MÉDIO', time: 20, points: 200 },
  3: { name: 'DIFÍCIL', time: 20, points: 300 },
  4: { name: 'ESPECIALISTA', time: 25, points: 500 },
};

const ANSWER_LETTERS = ['A', 'B', 'C', 'D'];

const FRIENDS = [
  {
    id: 'dskilushang',
    name: 'DSKILUSHANG',
    image: dskilushangImage,
  },
  {
    id: 'kiesselove',
    name: 'KIESSELOVE',
    image: kiesseloveImage,
  },
  {
    id: 'kimia',
    name: 'KIMIA',
    image: kimiaImage,
  },
];
const friendStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#182642',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#2a3f66',
  },
  title: {
    color: '#f5c451',
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 14,
  },
  friendsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  friend: {
    alignItems: 'center',
    width: '30%',
  },
  avatar: {
  width: 64,
  height: 64,
  borderRadius: 32,
  backgroundColor: '#1f355e',
  borderWidth: 2,
  borderColor: '#78a6ff',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 6,
},
    friendImage: {
  width: 68,
  height: 68,
  resizeMode: 'contain',
},
  friendName: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
  },
  answerBox: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  answerText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 8,
  },
  suggestionText: {
  color: '#fff',
  fontSize: 11,
  fontWeight: '600',
  textAlign: 'center',
  marginTop: 8,
  width: '100%',
},
  closeButton: {
    marginTop: 18,
    backgroundColor: '#f5a623',
    borderRadius: 12,
    paddingVertical: 12,
  },
  closeText: {
    color: '#10182a',
    fontWeight: '800',
    textAlign: 'center',
  },
});

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
const [audienceVotes, setAudienceVotes] = useState(null);
  const [friendModalVisible, setFriendModalVisible] = useState(false);
const [friendSuggestions, setFriendSuggestions] = useState([]);
  const [jokers, setJokers] = useState({
    fiftyFifty: true,
    audience: true,
    phoneFriend: true,
    pass: true,
  });

  const timerRef = useRef(null);
  const timerDeadlineRef = useRef(null);
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
        setAudienceVotes(null);

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
    setAudienceVotes(null)
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
    setAudienceVotes(null);
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

      setAudienceVotes(percentages);

      return;
    }

    // JOKER AMIGO
if (jokerType === 'phoneFriend') {
  stopTimer();

  const allIndexes = options.map((_, index) => index);

  const wrongIndexes = allIndexes.filter(
    (index) => index !== correctAnswer
  );

  const shuffledWrong = [...wrongIndexes].sort(
    () => Math.random() - 0.5
  );

  const suggestionIndexes = [
    correctAnswer,
    ...shuffledWrong.slice(0, 2),
  ].sort(() => Math.random() - 0.5);

  const shuffledFriends = [...FRIENDS].sort(
    () => Math.random() - 0.5
  );

  setFriendSuggestions(
    shuffledFriends.map((friend, index) => ({
      ...friend,
      suggested: suggestionIndexes[index],
    }))
  );

  setFriendModalVisible(true);

  await playJokerSound();

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
      setAudienceVotes(null);
      
      setJokerFeedback('Pergunta trocada.');

      setMascotState(MASCOTTE_STATES.QUESTION);

      processingRef.current = false;
      setProcessing(false);
    }
  };

   // Escolher o conselho de um amigo
const handleChooseFriend = (friend) => {
  Alert.alert(
    'TEST AMIGO',
    'Selecionaste: ' + friend.name
  );
};
  // Fechar a janela dos amigos
const closeFriendModal = () => {
  setFriendModalVisible(false);
  setFriendSuggestions([]);

  if (
    answerStatus === null &&
    currentQuestion &&
    !processingRef.current
  ) {
    startTimer();
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
      {audienceVotes && answerStatus === null && (
        <View style={styles.audienceCard}>
          <Text style={styles.audienceTitle}>
            VOTO DO PÚBLICO
          </Text>

          <View style={styles.audienceChart}>
            {ANSWER_LETTERS.map((letter, index) => {
              const percentage = audienceVotes[index] || 0;

              return (
                <View
                  key={letter}
                  style={styles.audienceColumn}
                >
                  <Text style={styles.audiencePercent}>
                    {percentage}%
                  </Text>

                  <View style={styles.audienceBarTrack}>
                    <View
                      style={[
                        styles.audienceBar,
                        { height: percentage },
                      ]}
                    />
                  </View>

                  <Text style={styles.audienceLetter}>
                    {letter}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
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
           <Modal
      visible={friendModalVisible}
      transparent
      animationType="fade"
      onRequestClose={closeFriendModal}
    >
      <View style={friendStyles.overlay}>
        <View style={friendStyles.card}>
          <Text style={friendStyles.title}>
            LIGAR PARA UM AMIGO
          </Text>

          <View style={friendStyles.friendsRow}>
            {friendSuggestions.map((friend) => (
              <TouchableOpacity
                key={friend.id}
                style={friendStyles.friend}
                onPress={() =>
                  handleChooseFriend(friend)}
                activeOpacity={0.8}
              >
                <Image
                  source={friend.image}
                  style={friendStyles.friendImage}
                />

                <Text style={friendStyles.friendName}>
                  {friend.name}
                </Text>

                <Text style={friendStyles.suggestionText}>
                  SUGERE:
                  {'\n'}
                  {ANSWER_LETTERS[friend.suggested]}.{' '}
                  {options[friend.suggested]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={friendStyles.closeButton}
            onPress={closeFriendModal}
          >
            <Text style={friendStyles.closeText}>
              FECHAR
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
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
  audienceCard: {
    backgroundColor: '#182642',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f5a623',
    padding: 12,
    marginTop: 10,
  },

  audienceTitle: {
    color: '#f5c451',
    fontSize: 13,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 12,
  },

  audienceChart: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },

  audienceColumn: {
    flex: 1,
    alignItems: 'center',
  },

  audiencePercent: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 6,
  },

  audienceBarTrack: {
    height: 100,
    width: 28,
    backgroundColor: '#293650',
    borderRadius: 5,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },

  audienceBar: {
    width: '100%',
    backgroundColor: '#f5a623',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },

  audienceLetter: {
    color: '#f5c451',
    fontSize: 13,
    fontWeight: '800',
    marginTop: 6,
  },
  loadingText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 18,
  },
});
