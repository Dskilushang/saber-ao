import { Alert } from 'react-native';
import SoundManager from './soundManager';
import { getRandomQuizQuestions } from '../questions';

export function computeAudiencePercentages({ options, correctAnswer, hiddenOptions = [] }) {
  const visibleIndices = options
    .map((_, index) => index)
    .filter((index) => !hiddenOptions.includes(index));

  if (visibleIndices.length === 0) {
    return {};
  }

  const correctIndex = Number(correctAnswer);
  const result = {};

  visibleIndices.forEach((index) => {
    result[index] = 0;
  });

  let correctPct = visibleIndices.length <= 2 ? 75 : 55;
  if (visibleIndices.length === 3) {
    correctPct = 50;
  }

  result[correctIndex] = correctPct;

  const distractors = visibleIndices.filter((index) => index !== correctIndex);
  const remaining = 100 - correctPct;

  if (distractors.length === 0) {
    return result;
  }

  const weights = distractors.map(() => Math.random() * 1.5 + 0.5);
  const totalWeight = weights.reduce((sum, value) => sum + value, 0);

  distractors.forEach((index, i) => {
    const raw = (weights[i] / totalWeight) * remaining;
    result[index] = Math.round(raw);
  });

  const totalAssigned = Object.values(result).reduce((sum, value) => sum + value, 0);
  const diff = 100 - totalAssigned;

  if (diff !== 0 && distractors.length > 0) {
    result[distractors[0]] += diff;
  }

  return result;
}

export async function useFiftyFiftyHandler({
  jokers,
  setJokers,
  options,
  correctAnswer,
  setHiddenOptions,
  changeMascotTemporarily,
  processingRef,
  answerStatus,
}) {
  if (!jokers.fiftyFifty || processingRef.current || answerStatus !== null) {
    return;
  }

  const correctIndex = Number(correctAnswer);
  const wrongIndexes = options
    .map((_, index) => index)
    .filter((index) => index !== correctIndex);

  const toHide = [...wrongIndexes]
    .sort(() => Math.random() - 0.5)
    .slice(0, 2);

  setHiddenOptions(toHide);
  setJokers((previous) => ({ ...previous, fiftyFifty: false }));

  if (typeof changeMascotTemporarily === 'function') {
    changeMascotTemporarily('SURPRIS', 1200);
  }

  try {
    await SoundManager.onJoker();
  } catch (error) {
    console.log('Joker sound error:', error);
  }
}

export async function useAudienceHandler({
  jokers,
  setJokers,
  options,
  correctAnswer,
  hiddenOptions,
  changeMascotTemporarily,
  processingRef,
  answerStatus,
  lang = 'pt',
  returnPercentages = false,
}) {
  if (!jokers.audience || processingRef.current || answerStatus !== null) {
    return returnPercentages ? {} : undefined;
  }

  setJokers((previous) => ({ ...previous, audience: false }));

  if (typeof changeMascotTemporarily === 'function') {
    changeMascotTemporarily('REFLEXION', 1800);
  }

  try {
    await SoundManager.onJoker();
  } catch (error) {
    console.log('Joker sound error:', error);
  }

  const percentages = computeAudiencePercentages({
    options,
    correctAnswer,
    hiddenOptions,
  });

  if (returnPercentages) {
    return percentages;
  }

  const lines = options.map((_, index) => {
    const letter = String.fromCharCode(65 + index);
    return `${letter}: ${percentages[index] || 0}%`;
  });

  Alert.alert(lang === 'fr' ? 'PÚBLICO' : 'PÚBLICO', lines.join('\n'));
}

export async function usePhoneFriendHandler({
  jokers,
  setJokers,
  options,
  correctAnswer,
  hiddenOptions,
  changeMascotTemporarily,
  processingRef,
  answerStatus,
  lang = 'pt',
  returnSuggestion = false,
}) {
  if (!jokers.phoneFriend || processingRef.current || answerStatus !== null) {
    return returnSuggestion ? '' : undefined;
  }

  setJokers((previous) => ({ ...previous, phoneFriend: false }));

  if (typeof changeMascotTemporarily === 'function') {
    changeMascotTemporarily('REFLEXION', 1500);
  }

  try {
    await SoundManager.onJoker();
  } catch (error) {
    console.log('Joker sound error:', error);
  }

  const friends = [
    { name: 'DSKILUSHANG', weight: 0.8 },
    { name: 'KIESSELOVE', weight: 0.65 },
    { name: 'KIMIA', weight: 0.5 },
  ];

  const pick = friends[Math.floor(Math.random() * friends.length)];
  const correctIndex = Number(correctAnswer);
  const visibleIndices = options
    .map((_, index) => index)
    .filter((index) => !hiddenOptions.includes(index));

  let suggestedIndex = correctIndex;

  if (!visibleIndices.includes(correctIndex) || Math.random() > pick.weight) {
    const wrongVisible = visibleIndices.filter((index) => index !== correctIndex);
    suggestedIndex = wrongVisible.length > 0
      ? wrongVisible[Math.floor(Math.random() * wrongVisible.length)]
      : correctIndex;
  }

  const letter = String.fromCharCode(65 + suggestedIndex);
  const text = options[suggestedIndex];
  const suggestion = `${pick.name} ${lang === 'fr' ? 'pense que la réponse est' : 'acha que a resposta é'} ${letter}: ${text}`;

  if (returnSuggestion) {
    return suggestion;
  }

  Alert.alert(lang === 'fr' ? 'AMIGO' : 'AMIGO', suggestion);
}

export async function usePassHandler({
  jokers,
  setJokers,
  changeMascotTemporarily,
  processingRef,
  setProcessing,
  stopTimer,
  setQuestions,
  setQuestionVersion,
  setSelectedAnswer,
  setAnswerStatus,
  setHiddenOptions,
  setTimeLeft,
  setMascotState,
  questionIndex,
  lang = 'pt',
  setJokerFeedback,
}) {
  if (!jokers.pass || processingRef.current) {
    return;
  }

  processingRef.current = true;
  if (typeof setProcessing === 'function') {
    setProcessing(true);
  }

  if (typeof stopTimer === 'function') {
    stopTimer();
  }

  setJokers((previous) => ({ ...previous, pass: false }));

  if (typeof changeMascotTemporarily === 'function') {
    changeMascotTemporarily('SURPRIS', 1200);
  }

  try {
    await SoundManager.onJoker();
  } catch (error) {
    console.log('Pass joker sound error:', error);
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      const replacement = getRandomQuizQuestions(1, lang)?.[0];
      if (!replacement) {
        if (typeof setProcessing === 'function') {
          setProcessing(false);
        }
        processingRef.current = false;
        resolve();
        return;
      }

      setQuestions((prev) => {
        const next = [...prev];
        next[questionIndex] = replacement;
        return next;
      });

      if (typeof setQuestionVersion === 'function') {
        setQuestionVersion((value) => value + 1);
      }

      if (typeof setSelectedAnswer === 'function') {
        setSelectedAnswer(null);
      }

      if (typeof setAnswerStatus === 'function') {
        setAnswerStatus(null);
      }

      if (typeof setHiddenOptions === 'function') {
        setHiddenOptions([]);
      }

      if (typeof setTimeLeft === 'function') {
        setTimeLeft(Number(replacement?.timeLimit) || 20);
      }

      if (typeof setMascotState === 'function') {
        setMascotState({
          ID: 'QUESTION',
          label: 'QUESTION',
        });
      }

      if (typeof setJokerFeedback === 'function') {
        setJokerFeedback('Pass utilisé : question remplacée.');
      }

      if (typeof setProcessing === 'function') {
        setProcessing(false);
      }

      processingRef.current = false;
      resolve();
    }, 800);
  });
}
"}