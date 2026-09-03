import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  StatusBar, Animated, SafeAreaView, Alert,
} from 'react-native';
import { getQuestionsByCategory, CATEGORIES } from '../data/questions';
import Mascotte, { MASCOTTE_STATES } from '../components/Mascotte';
import SoundManager from '../utils/soundManager';

const TIMER_SECONDS = 20;
const TIMER_SUSPENSE = 7;

export default function QuizScreen({ route, navigation }) {
  const { categoryId, lang = 'pt' } = route.params || {};
  const questions = getQuestionsByCategory(categoryId, lang);
  const category  = CATEGORIES.find(c => c.id === categoryId);
  const catLabel  = lang === 'fr' ? category?.label_fr : category?.label_pt;

  const [index,    setIndex]    = useState(0);
  const [score,    setScore]    = useState(0);
  const [selected, setSelected] = useState(null);
  const [timer,    setTimer]    = useState(TIMER_SECONDS);
  const [mascot,   setMascot]   = useState(MASCOTTE_STATES.QUESTION);
  const [jokers,   setJokers]   = useState({ fiftyFifty: true, hint: true });
  const [disabled, setDisabled] = useState(false);

  const timerRef  = useRef(null);
  const fadeAnim  = useRef(new Animated.Value(1)).current;
  const timerAnim = useRef(new Animated.Value(1)).current;
  const current   = questions[index];

  useEffect(() => {
    enterQuestion();
    return () => clearInterval(timerRef.current);
  }, [index]);

  const enterQuestion = () => {
    setMascot(MASCOTTE_STATES.INVITATION);
    setTimeout(() => setMascot(MASCOTTE_STATES.QUESTION), 1200);
    startTimer();
  };

  const startTimer = () => {
    clearInterval(timerRef.current);
    setTimer(TIMER_SECONDS);
    timerAnim.setValue(1);
    Animated.timing(timerAnim, {
      toValue: 0, duration: TIMER_SECONDS * 1000, useNativeDriver: false,
    }).start();
    timerRef.current = setInterval(() => {
      setTimer(prev => {
        if (prev <= TIMER_SUSPENSE) setMascot(MASCOTTE_STATES.SUSPENSE);
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleTimeout = () => {
    if (disabled) return;
    setDisabled(true);
    setMascot(MASCOTTE_STATES.MAUVAISE_REPONSE);
    SoundManager.onWrong();
    setTimeout(() => nextQuestion(false), 1600);
  };

  const handleAnswer = async (option) => {
    if (disabled || selected) return;
    clearInterval(timerRef.current);
    setSelected(option);
    setDisabled(true);
    const isCorrect = option === current.correct;
    if (isCorrect) {
      setScore(s => s + 1);
      setMascot(MASCOTTE_STATES.BONNE_REPONSE);
      await SoundManager.onCorrect();
    } else {
      setMascot(MASCOTTE_STATES.MAUVAISE_REPONSE);
      await SoundManager.onWrong();
    }
    setTimeout(() => nextQuestion(isCorrect), 1500);
  };

  const nextQuestion = (wasCorrect) => {
    const newScore = score + (wasCorrect ? 1 : 0);
    if (index >= questions.length - 1) {
      const finalState = newScore >= questions.length * 0.8
        ? MASCOTTE_STATES.CELEBRATION : MASCOTTE_STATES.ENCERRAMENTO;
      setMascot(finalState);
      setTimeout(() => {
        navigation.replace('Resultat', {
          finalScore: newScore, totalQ: questions.length,
          lang, categoryLabel: catLabel, categoryId,
        });
      }, 800);
      return;
    }
    Animated.timing(fadeAnim, { toValue:0, duration:200, useNativeDriver:true }).start(() => {
      setIndex(i => i + 1);
      setSelected(null);
      setDisabled(false);
      Animated.timing(fadeAnim, { toValue:1, duration:300, useNativeDriver:true }).start();
    });
  };

  const useJokerFiftyFifty = () => {
    if (!jokers.fiftyFifty || disabled) return;
    SoundManager.onJoker();
    setMascot(MASCOTTE_STATES.SURPRIS);
    setJokers(j => ({ ...j, fiftyFifty: false }));
    setTimeout(() => setMascot(MASCOTTE_STATES.QUESTION), 1000);
    Alert.alert('50/50', lang === 'fr'
      ? 'Deux mauvaises réponses éliminées !' : 'Duas respostas erradas eliminadas!');
  };

  const useJokerHint = () => {
    if (!jokers.hint || disabled) return;
    SoundManager.onJoker();
    setMascot(MASCOTTE_STATES.REFLEXION);
    setJokers(j => ({ ...j, hint: false }));
    setTimeout(() => setMascot(MASCOTTE_STATES.QUESTION), 2000);
    Alert.alert('💡', `✅ ${current.correct}`);
  };

  const L = {
    pt: { of:'de', jff:'50/50', jhint:'💡 Dica' },
    fr: { of:'sur', jff:'50/50', jhint:'💡 Indice' },
  }[lang] || {};

  const timerColor = timer > 10 ? '#FFD700' : timer > TIMER_SUSPENSE ? '#FFA500' : '#FF4444';
  const timerWidth = timerAnim.interpolate({ inputRange:[0,1], outputRange:['0%','100%'] });

  const getOptionStyle = (option) => {
    if (!selected) return styles.option;
    if (option === current.correct) return [styles.option, styles.optionCorrect];
    if (option === selected)        return [styles.option, styles.optionWrong];
    return [styles.option, styles.optionDimmed];
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0F24" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.replace('Categories')} style={styles.quitBtn}>
          <Text style={styles.quitText}>✕</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerCat}>{catLabel}</Text>
          <Text style={styles.headerProgress}>{index+1} {L.of} {questions.length}</Text>
        </View>
        <View style={[styles.timerBadge, { borderColor: timerColor }]}>
          <Text style={[styles.timerText, { color: timerColor }]}>{timer}</Text>
        </View>
      </View>
      <View style={styles.timerBar}>
        <Animated.View style={[styles.timerFill, { width: timerWidth, backgroundColor: timerColor }]} />
      </View>
      <Mascotte state={mascot} size={100} style={styles.mascotte} />
      <Animated.View style={[styles.questionCard, { opacity: fadeAnim }]}>
        <Text style={styles.questionText}>{current?.question}</Text>
      </Animated.View>
      <Animated.View style={[styles.optionsContainer, { opacity: fadeAnim }]}>
        {current?.options?.map((option, i) => (
          <TouchableOpacity
            key={i}
            style={getOptionStyle(option)}
            onPress={() => handleAnswer(option)}
            disabled={disabled}
            activeOpacity={0.75}
          >
            <View style={[styles.optionLetterBox, selected && option === current.correct && styles.optionLetterCorrect]}>
              <Text style={styles.optionLetter}>{['A','B','C','D'][i]}</Text>
            </View>
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
      <View style={styles.jokerRow}>
        <TouchableOpacity
          style={[styles.jokerBtn, !jokers.fiftyFifty && styles.jokerUsed]}
          onPress={useJokerFiftyFifty} disabled={!jokers.fiftyFifty}
        >
          <Text style={styles.jokerText}>{L.jff}</Text>
        </TouchableOpacity>
        <View style={styles.scoreBox}>
          <Text style={styles.scoreText}>⭐ {score}</Text>
        </View>
        <TouchableOpacity
          style={[styles.jokerBtn, !jokers.hint && styles.jokerUsed]}
          onPress={useJokerHint} disabled={!jokers.hint}
        >
          <Text style={styles.jokerText}>{L.jhint}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:        { flex:1, backgroundColor:'#0A0F24' },
  header:           { flexDirection:'row', alignItems:'center', paddingHorizontal:16, paddingTop:10, paddingBottom:6 },
  quitBtn:          { padding:8 },
  quitText:         { color:'#AAB4D4', fontSize:18 },
  headerCenter:     { flex:1, alignItems:'center' },
  headerCat:        { color:'#FFD700', fontWeight:'800', fontSize:14, letterSpacing:1 },
  headerProgress:   { color:'#AAB4D4', fontSize:12, marginTop:2 },
  timerBadge:       { width:44, height:44, borderRadius:22, borderWidth:2, alignItems:'center', justifyContent:'center' },
  timerText:        { fontWeight:'900', fontSize:18 },
  timerBar:         { height:3, backgroundColor:'rgba(255,255,255,0.08)' },
  timerFill:        { height:'100%' },
  mascotte:         { alignSelf:'center', marginVertical:6 },
  questionCard:     { backgroundColor:'rgba(255,255,255,0.05)', marginHorizontal:16, borderRadius:16, padding:18, marginBottom:12, borderWidth:1, borderColor:'rgba(255,215,0,0.12)' },
  questionText:     { color:'#FFF', fontSize:16, fontWeight:'600', lineHeight:24, textAlign:'center' },
  optionsContainer: { paddingHorizontal:16, gap:9 },
  option:           { backgroundColor:'rgba(255,255,255,0.06)', borderRadius:12, paddingVertical:13, paddingHorizontal:14, flexDirection:'row', alignItems:'center', borderWidth:1, borderColor:'rgba(255,255,255,0.1)' },
  optionCorrect:    { backgroundColor:'rgba(0,200,100,0.18)', borderColor:'#00C864' },
  optionWrong:      { backgroundColor:'rgba(255,60,60,0.18)', borderColor:'#FF3C3C' },
  optionDimmed:     { opacity:0.35 },
  optionLetterBox:  { width:28, height:28, borderRadius:14, backgroundColor:'rgba(255,215,0,0.15)', alignItems:'center', justifyContent:'center', marginRight:12 },
  optionLetterCorrect:{ backgroundColor:'#00C864' },
  optionLetter:     { color:'#FFD700', fontWeight:'900', fontSize:14 },
  optionText:       { color:'#FFF', fontSize:14, flex:1, lineHeight:20 },
  jokerRow:         { flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingHorizontal:20, marginTop:14 },
  jokerBtn:         { backgroundColor:'rgba(255,215,0,0.12)', borderRadius:20, paddingHorizontal:16, paddingVertical:9, borderWidth:1, borderColor:'rgba(255,215,0,0.25)' },
  jokerUsed:        { opacity:0.25 },
  jokerText:        { color:'#FFD700', fontWeight:'700', fontSize:12 },
  scoreBox:         { alignItems:'center' },
  scoreText:        { color:'#FFD700', fontWeight:'900', fontSize:20 },
});
