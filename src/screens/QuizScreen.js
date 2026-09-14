import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Animated,
  SafeAreaView,
  Alert,
} from 'react-native';

import { getRandomQuizQuestions } from '../questions';
import Mascotte, { MASCOTTE_STATES } from '../components/Mascotte';
import SoundManager from '../utils/soundManager';

const TOTAL_QUESTIONS = 10;
const TIMER_SECONDS = 20;
const TIMER_SUSPENSE = 7;

export default function QuizScreen({ route, navigation }) {
  const { lang = 'pt' } = route.params || {};

  // Questions mélangées provenant de toutes les catégories
  const questions = getRandomQuizQuestions(TOTAL_QUESTIONS, lang);

  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [timer, setTimer] = useState(TIMER_SECONDS);
  const [mascot, setMascot] = useState(MASCOTTE_STATES.QUESTION);

  const [jokers, setJokers] = useState({
    fiftyFifty: true,
    hint: true,
  });

  const [disabled, setDisabled] = useState(false);
  const [hiddenOptions, setHiddenOptions] = useState([]);

  const timerRef = useRef(null);
  const mascotTimeoutRef = useRef(null);
  const nextQuestionTimeoutRef = useRef(null);

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const timerAnim = useRef(new Animated.Value(1)).current;

  const current = questions[index];

  /*
   * Langues
   */
  const L = {
    pt: {
      of: 'de',
      question: 'Pergunta',
      jff: '50/50',
      jhint: '💡 Dica',
      quit: 'Sair',
      quitMessage: 'Deseja sair do jogo?',
      cancel: 'Cancelar',
      yes: 'Sim',
      noQuestions: 'Nenhuma pergunta disponível.',
    },
    fr: {
      of: 'sur',
      question: 'Question',
      jff: '50/50',
      jhint: '💡 Indice',
      quit: 'Quitter',
      quitMessage: 'Voulez-vous quitter le jeu ?',
      cancel: 'Annuler',
      yes: 'Oui',
      noQuestions: 'Aucune question disponible.',
    },
  }[lang] || {
    of: 'de',
    question: 'Pergunta',
    jff: '50/50',
    jhint: '💡 Dica',
    quit: 'Sair',
    quitMessage: 'Deseja sair do jogo?',
    cancel: 'Cancelar',
    yes: 'Sim',
    noQuestions: 'Nenhuma pergunta disponível.',
  };

  /*
   * Nettoyage
   */
  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
      clearTimeout(mascotTimeoutRef.current);
      clearTimeout(nextQuestionTimeoutRef.current);
    };
  }, []);

  /*
   * Entrée sur une nouvelle question
   */
  useEffect(() => {
    if (!current) return;

    setSelected(null);
    setDisabled(false);
    setHiddenOptions([]);

    enterQuestion();

    return () => {
      clearInterval(timerRef.current);
      clearTimeout(mascotTimeoutRef.current);
    };
  }, [index]);

  const enterQuestion = () => {
    clearInterval(timerRef.current);
    clearTimeout(mascotTimeoutRef.current);

    setMascot(MASCOTTE_STATES.INVITATION);

    mascotTimeoutRef.current = setTimeout(() => {
      setMascot(MASCOTTE_STATES.QUESTION);
    }, 1200);

    startTimer();
  };

  /*
   * Timer
   */
  const startTimer = () => {
    clearInterval(timerRef.current);

    setTimer(TIMER_SECONDS);
    timerAnim.setValue(1);

    Animated.timing(timerAnim, {
      toValue: 0,
      duration: TIMER_SECONDS * 1000,
      useNativeDriver: false,
    }).start();

    timerRef.current = setInterval(() => {
      setTimer((previous) => {
        if (previous <= TIMER_SUSPENSE) {
          setMascot(MASCOTTE_STATES.SUSPENSE);
        }

        if (previous <= 1) {
          clearInterval(timerRef.current);
          handleTimeout();
          return 0;
        }

        return previous - 1;
      });
    }, 1000);
  };

  /*
   * Temps écoulé
   */
  const handleTimeout = () => {
    if (disabled) return;

    clearInterval(timerRef.current);

    setDisabled(true);
    setMascot(MASCOTTE_STATES.MAUVAISE_REPONSE);

    SoundManager.onWrong();

    nextQuestionTimeoutRef.current = setTimeout(() => {
      nextQuestion(false);
    }, 1500);
  };

  /*
   * Réponse
   */
  const handleAnswer = async (option) => {
    if (disabled || selected || !current) return;

    clearInterval(timerRef.current);

    setSelected(option);
    setDisabled(true);

    const isCorrect = option === current.correct;

    if (isCorrect) {
      setScore((previous) => previous + 1);
      setMascot(MASCOTTE_STATES.BONNE_REPONSE);

      await SoundManager.onCorrect();
    } else {
      setMascot(MASCOTTE_STATES.MAUVAISE_REPONSE);

      await SoundManager.onWrong();
    }

    nextQuestionTimeoutRef.current = setTimeout(() => {
      nextQuestion(isCorrect);
    }, 1500);
  };

  /*
   * Question suivante
   */
  const nextQuestion = (wasCorrect) => {
    clearTimeout(nextQuestionTimeoutRef.current);

    if (index >= questions.length - 1) {
      const finalScore = score;

      const finalState =
        finalScore >= questions.length * 0.8
          ? MASCOTTE_STATES.CELEBRATION
          : MASCOTTE_STATES.ENCERRAMENTO;

      setMascot(finalState);

      if (finalScore >= questions.length * 0.8) {
        SoundManager.onVictory();
      } else {
        SoundManager.onGameOver();
      }

      setTimeout(() => {
        navigation.replace('Resultat', {
          finalScore,
          totalQ: questions.length,
          lang,
        });
      }, 900);

      return;
    }

    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setIndex((previous) => previous + 1);
      setSelected(null);
      setDisabled(false);
      setHiddenOptions([]);

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  /*
   * Joker 50/50
   */
  const useJokerFiftyFifty = () => {
    if (!jokers.fiftyFifty || disabled || !current) return;

    SoundManager.onJoker();

    const wrongOptions = current.options.filter(
      (option) => option !== current.correct
    );

    // Mélange des mauvaises réponses
    const shuffled = [...wrongOptions].sort(
      () => Math.random() - 0.5
    );

    const toHide = shuffled.slice(0, 2);

    setHiddenOptions(toHide);

    setJokers((previous) => ({
      ...previous,
      fiftyFifty: false,
    }));

    setMascot(MASCOTTE_STATES.SURPRIS);

    setTimeout(() => {
      setMascot(MASCOTTE_STATES.QUESTION);
    }, 1000);
  };

  /*
   * Joker indice
   */
  const useJokerHint = () => {
    if (!jokers.hint || disabled || !current) return;

    SoundManager.onJoker();

    setJokers((previous) => ({
      ...previous,
      hint: false,
    }));

    setMascot(MASCOTTE_STATES.REFLEXION);

    setTimeout(() => {
      setMascot(MASCOTTE_STATES.QUESTION);
    }, 1800);

    Alert.alert(
      L.jhint,
      lang === 'fr'
        ? `La bonne réponse est : ${current.correct}`
        : `A resposta correta é: ${current.correct}`
    );
  };

  /*
   * Quitter le quiz
   */
  const handleQuit = () => {
    Alert.alert(
      L.quit,
      L.quitMessage,
      [
        {
          text: L.cancel,
          style: 'cancel',
        },
        {
          text: L.yes,
          style: 'destructive',
          onPress: () => {
            clearInterval(timerRef.current);
            navigation.replace('Accueil', { lang });
          },
        },
      ]
    );
  };

  /*
   * Sécurité
   */
  if (!current) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            {L.noQuestions}
          </Text>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.replace('Accueil', { lang })}
          >
            <Text style={styles.backButtonText}>
              {L.quit}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  /*
   * Couleur du timer
   */
  const timerColor =
    timer > 10
      ? '#FFD700'
      : timer > TIMER_SUSPENSE
        ? '#FFA500'
        : '#FF4444';

  const timerWidth = timerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  /*
   * Style des réponses
   */
  const getOptionStyle = (option) => {
    if (hiddenOptions.includes(option)) {
      return [
        styles.option,
        styles.optionHidden,
      ];
    }

    if (!selected) {
      return styles.option;
    }

    if (option === current.correct) {
      return [
        styles.option,
        styles.optionCorrect,
      ];
    }

    if (option === selected) {
      return [
        styles.option,
        styles.optionWrong,
      ];
    }

    return [
      styles.option,
      styles.optionDimmed,
    ];
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#0A0F24"
      />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleQuit}
          style={styles.quitBtn}
        >
          <Text style={styles.quitText}>✕</Text>
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>
            SABER AO
          </Text>

          <Text style={styles.headerProgress}>
            {L.question} {index + 1} {L.of} {questions.length}
          </Text>
        </View>

        <View
          style={[
            styles.timerBadge,
            { borderColor: timerColor },
          ]}
        >
          <Text
            style={[
              styles.timerText,
              { color: timerColor },
            ]}
          >
            {timer}
          </Text>
        </View>
      </View>

      {/* TIMER BAR */}
      <View style={styles.timerBar}>
        <Animated.View
          style={[
            styles.timerFill,
            {
              width: timerWidth,
              backgroundColor: timerColor,
            },
          ]}
        />
      </View>

      {/* MASCOTTE */}
      <Mascotte
        state={mascot}
        size={100}
        style={styles.mascotte}
      />

      {/* QUESTION */}
      <Animated.View
        style={[
          styles.questionCard,
          { opacity: fadeAnim },
        ]}
      >
        <Text style={styles.questionNumber}>
          {L.question} {index + 1}
        </Text>

        <Text style={styles.questionText}>
          {current.question}
        </Text>
      </Animated.View>

      {/* OPTIONS */}
      <Animated.View
        style={[
          styles.optionsContainer,
          { opacity: fadeAnim },
        ]}
      >
        {current.options.map((option, i) => {
          const hidden = hiddenOptions.includes(option);

          return (
            <TouchableOpacity
              key={`${current.id}-${i}`}
              style={getOptionStyle(option)}
              onPress={() => handleAnswer(option)}
              disabled={disabled || hidden}
              activeOpacity={0.75}
            >
              <View
                style={[
                  styles.optionLetterBox,
                  selected &&
                    option === current.correct &&
                    styles.optionLetterCorrect,
                ]}
              >
                <Text style={styles.optionLetter}>
                  {['A', 'B', 'C', 'D'][i]}
                </Text>
              </View>

              <Text style={styles.optionText}>
                {hidden ? '' : option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </Animated.View>

      {/* JOKERS + SCORE */}
      <View style={styles.jokerRow}>
        <TouchableOpacity
          style={[
            styles.jokerBtn,
            !jokers.fiftyFifty && styles.jokerUsed,
          ]}
          onPress={useJokerFiftyFifty}
          disabled={!jokers.fiftyFifty || disabled}
        >
          <Text style={styles.jokerText}>
            {L.jff}
          </Text>
        </TouchableOpacity>

        <View style={styles.scoreBox}>
          <Text style={styles.scoreText}>
            ⭐ {score}
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.jokerBtn,
            !jokers.hint && styles.jokerUsed,
          ]}
          onPress={useJokerHint}
          disabled={!jokers.hint || disabled}
        >
          <Text style={styles.jokerText}>
            {L.jhint}
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
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 6,
  },

  quitBtn: {
    padding: 8,
  },

  quitText: {
    color: '#AAB4D4',
    fontSize: 20,
    fontWeight: '700',
  },

  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },

  headerTitle: {
    color: '#FFD700',
    fontWeight: '900',
    fontSize: 16,
    letterSpacing: 2,
  },

  headerProgress: {
    color: '#AAB4D4',
    fontSize: 12,
    marginTop: 2,
  },

  timerBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  timerText: {
    fontWeight: '900',
    fontSize: 18,
  },

  timerBar: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },

  timerFill: {
    height: '100%',
  },

  mascotte: {
    alignSelf: 'center',
    marginVertical: 6,
  },

  questionCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,215,0,0.12)',
  },

  questionNumber: {
    color: '#FFD700',
    fontSize: 11,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 7,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  questionText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    textAlign: 'center',
  },

  optionsContainer: {
    paddingHorizontal: 16,
    gap: 9,
  },

  option: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 12,
    paddingVertical: 13,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    minHeight: 54,
  },

  optionCorrect: {
    backgroundColor: 'rgba(0,200,100,0.18)',
    borderColor: '#00C864',
  },

  optionWrong: {
    backgroundColor: 'rgba(255,60,60,0.18)',
    borderColor: '#FF3C3C',
  },

  optionDimmed: {
    opacity: 0.35,
  },

  optionHidden: {
    opacity: 0.12,
  },

  optionLetterBox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,215,0,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  optionLetterCorrect: {
    backgroundColor: '#00C864',
  },

  optionLetter: {
    color: '#FFD700',
    fontWeight: '900',
    fontSize: 14,
  },

  optionText: {
    color: '#FFF',
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },

  jokerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 14,
  },

  jokerBtn: {
    backgroundColor: 'rgba(255,215,0,0.12)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderWidth: 1,
    borderColor: 'rgba(255,215,0,0.25)',
  },

  jokerUsed: {
    opacity: 0.25,
  },

  jokerText: {
    color: '#FFD700',
    fontWeight: '700',
    fontSize: 12,
  },

  scoreBox: {
    alignItems: 'center',
  },

  scoreText: {
    color: '#FFD700',
    fontWeight: '900',
    fontSize: 20,
  },

  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },

  emptyText: {
    color: '#FFF',
    fontSize: 18,
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
