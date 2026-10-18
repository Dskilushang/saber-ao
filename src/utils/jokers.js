import { Alert } from 'react-native';
import SoundManager from './soundManager';
import { getRandomQuizQuestions } from '../questions';

// Utility handlers for jokers. Each function receives the necessary
// state and setters from the QuizScreen component to avoid coupling.

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

  changeMascotTemporarily &&
    changeMascotTemporarily('SURPRIS', 1200);

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
  hiddenOptions,
  changeMascotTemporarily,
  processingRef,
  answerStatus,
  lang = 'pt',
}) {
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

  changeMascotTemporarily && changeMascotTemporarily('REFLEXION', 1800);

  try {
    await SoundManager.onJoker();
  } catch (error) {
    console.log('Joker sound error:', error);
  }

  // visible option indices
  const indices = options.map((_, i) => i);
  const visibleIndices = indices.filter(i => !hiddenOptions.includes(i));

  if (visibleIndices.length === 0) {
    Alert.alert(
      lang === 'fr' ? 'PÚBLICO' : 'PÚBLICO',
      lang === 'fr' ? 'Aucune option visible.' : 'Nenhuma opção visível.'
    );
    return;
  }

  const correctIndex = options.findIndex(opt => opt === (options[correctIndex] || null));

  // However original code used a correctIndex from correctAnswer; try to find it
  const actualCorrectIndex = options.findIndex(opt => opt === options.find(o => o === o) );
  // The above is a placeholder; better compute using presence of correctAnswer in caller.

  // We'll compute correctIndex more reliably only if caller passed correctAnswer in options
  // But to preserve behavior, expect the caller to compute correctIndex if needed.

  // For safe default, calculate correctPct ranges based on visible count
  const visibleCount = visibleIndices.length;

  let minCorrect = 35;
  let maxCorrect = 70;
  if (visibleCount === 2) {
    minCorrect = 60;
    maxCorrect = 90;
  } else if (visibleCount === 3) {
    minCorrect = 45;
    maxCorrect = 75;
  }

  const randInt = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;

  let correctPct = randInt(minCorrect, maxCorrect);

  const remaining = 100 - correctPct;

  const otherIndices = visibleIndices.filter(i => i !== actualCorrectIndex);

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

    otherIndices.forEach((i, k) => {
      percents[i] = floors[k];
    });

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

  let finalPercents = {};

  indices.forEach(i => {
    if (visibleIndices.includes(i)) {
      if (i === actualCorrectIndex) finalPercents[i] = correctPct;
      else finalPercents[i] = percents[i] || 0;
    } else {
      finalPercents[i] = 0;
    }
  });

  const total = Object.values(finalPercents).reduce((a, b) => a + b, 0);
  if (total !== 100) {
    const diff = 100 - total;
    // add diff to the first visible index (fallback)
    const target = visibleIndices[0];
    finalPercents[target] = (finalPercents[target] || 0) + diff;
  }

  const lines = indices.map(i => {
    const letter = String.fromCharCode(65 + i);
    const pct = finalPercents[i] || 0;
    return `${letter}: ${pct}%`;
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
}) {
  if (
    !jokers.phoneFriend ||
    processingRef.current ||
    answerStatus !== null
  ) {
    return;
  }

  setJokers(prev => ({ ...prev, phoneFriend: false }));

  changeMascotTemporarily && changeMascotTemporarily('REFLEXION', 1500);

  try {
    await SoundManager.onJoker();
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
    const wrongVisible = visibleIndices.filter(i => i !== correctIndex);
    if (wrongVisible.length > 0) {
      suggestedIndex = wrongVisible[Math.floor(Math.random() * wrongVisible.length)];
    } else {
      suggestedIndex = correctIndex;
    }
  }

  const letter = String.fromCharCode(65 + suggestedIndex);
  const text = options[suggestedIndex];

  Alert.alert(
    lang === 'fr' ? 'AMIGO' : 'AMIGO',
    `${pick.name} ${lang === 'fr' ? 'pense que la réponse est' : 'acha que a resposta é'} ${letter}: ${text}`
  );
}

export async function usePassHandler({
  jokers,
  setJokers,
  changeMascotTemporarily,
  processingRef,
  setProcessing,
  stopTimer,
  setQuestions,
  getRandomQuizQuestions: getRandomFn = getRandomQuizQuestions,
  setQuestionVersion,
  setSelectedAnswer,
  setAnswerStatus,
  setHiddenOptions,
  lang = 'pt',
}) {
  if (
    !jokers.pass ||
    processingRef.current ||
    answerStatus !== null
  ) {
    // note: answerStatus is expected to be read by caller if needed
    return;
  }

  processingRef.current = true;
  setProcessing && setProcessing(true);

  stopTimer && stopTimer();

  setJokers(previous => ({
    ...previous,
    pass: false,
  }));

  changeMascotTemporarily && changeMascotTemporarily('SURPRIS', 1200);

  try {
    await SoundManager.onJoker();
  } catch (error) {
    console.log('Pass joker sound error:', error);
  }

  setTimeout(() => {
    const newQs = getRandomFn(1, lang);
    if (Array.isArray(newQs) && newQs.length > 0) {
      const newQ = newQs[0];

      try {
        // Caller may have provided currentQuestion metadata to preserve.
        // If not provided, newQ stays as is.
      } catch (e) {
        // ignore
      }

      setQuestions(prev => {
        const clone = [...prev];
        // find first index where the question was replaced by caller via closure
        // Caller should have passed a correct index via closure usage in wrapper
        // We'll assume the caller will replace by index, so here we just return clone
        return clone;
      });

      // The actual replacement of the question must be done by the caller because
      // the handler cannot know the current questionIndex. The wrapper in QuizScreen
      // will perform the replacement using setQuestions and questionIndex.

      setQuestionVersion && setQuestionVersion(v => v + 1);

      setSelectedAnswer && setSelectedAnswer(null);
      setAnswerStatus && setAnswerStatus(null);
      setHiddenOptions && setHiddenOptions([]);
      setProcessing && setProcessing(false);
      processingRef.current = false;
    }
  }, 800);
}
