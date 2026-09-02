import React, { useEffect, useRef } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  StatusBar, Animated, SafeAreaView,
} from 'react-native';
import Mascotte, { MASCOTTE_STATES } from '../components/Mascotte';
import SoundManager from '../utils/soundManager';

const getMascotState = (pct) => {
  if (pct >= 0.8) return MASCOTTE_STATES.CELEBRATION;
  if (pct >= 0.5) return MASCOTTE_STATES.ENCERRAMENTO;
  return MASCOTTE_STATES.MAUVAISE_REPONSE;
};

const getMessage = (pct, lang) => {
  const msgs = {
    pt: [
      { min:0.8, txt:'🏆 És um verdadeiro filho do país!' },
      { min:0.5, txt:'👏 Bravo — conheces bem Angola!' },
      { min:0.0, txt:'💪 Continua a aprender sobre o teu país!' },
    ],
    fr: [
      { min:0.8, txt:'🏆 Tu es un vrai fils du pays !' },
      { min:0.5, txt:'👏 Bravo — tu connais bien l\'Angola !' },
      { min:0.0, txt:'💪 Continue d\'apprendre sur ton pays !' },
    ],
  };
  return (msgs[lang] || msgs['pt']).find(m => pct >= m.min)?.txt || '';
};

export default function ResultatScreen({ route, navigation }) {
  const { finalScore=0, totalQ=10, lang='pt', categoryLabel='', categoryId } = route.params || {};
  const pct = totalQ > 0 ? finalScore / totalQ : 0;
  const mascotState = getMascotState(pct);

  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    if (pct >= 0.8) SoundManager.onVictory();
    else SoundManager.onGameOver();

    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue:1, duration:600, useNativeDriver:true }),
      Animated.spring(scaleAnim, { toValue:1, friction:5,   useNativeDriver:true }),
    ]).start();
  }, []);

  const scoreColor = pct >= 0.8 ? '#FFD700' : pct >= 0.5 ? '#6CF' : '#F96';
  const trophy     = pct >= 0.8 ? '🏆' : pct >= 0.5 ? '⭐' : '📚';

  const L = {
    pt:{ title:'FIM DO COMBATE', score:'PONTUAÇÃO', category:'Categoria', retry:'JOGAR OUTRA VEZ', home:'INÍCIO', of:'de' },
    fr:{ title:'FIN DU COMBAT',  score:'SCORE',     category:'Catégorie', retry:'REJOUER',         home:'ACCUEIL', of:'sur' },
  }[lang] || {};

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0F24" />

      <Animated.View style={[styles.content, { opacity:fadeAnim, transform:[{scale:scaleAnim}] }]}>

        <Text style={styles.trophy}>{trophy}</Text>
        <Text style={styles.title}>{L.title}</Text>
        {categoryLabel ? <Text style={styles.catLabel}>{L.category}: {categoryLabel}</Text> : null}

        <Mascotte state={mascotState} size={150} style={styles.mascotte} />

        <View style={styles.card}>
          <Text style={styles.scoreLabel}>{L.score}</Text>
          <Text style={[styles.scoreValue, { color:scoreColor }]}>
            {finalScore} {L.of} {totalQ}
          </Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, {
              width:`${Math.round(pct*100)}%`,
              backgroundColor:scoreColor
            }]} />
          </View>
          <Text style={styles.pctText}>{Math.round(pct*100)}%</Text>
          <Text style={styles.message}>{getMessage(pct, lang)}</Text>
        </View>

        <View style={styles.btnRow}>
          <TouchableOpacity
            style={[styles.btn, styles.btnSecondary]}
            onPress={async () => {
              await SoundManager.onClick();
              navigation.replace('Categories');
            }}
          >
            <Text style={styles.btnSecondaryText}>{L.home}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, styles.btnPrimary]}
            onPress={async () => {
              await SoundManager.onClick();
              navigation.replace('Quiz', route.params);
            }}
          >
            <Text style={styles.btnPrimaryText}>{L.retry}</Text>
          </TouchableOpacity>
        </View>

      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:        { flex:1, backgroundColor:'#0A0F24', justifyContent:'center' },
  content:          { alignItems:'center', paddingHorizontal:24 },
  trophy:           { fontSize:60, marginBottom:4 },
  title:            { fontSize:26, fontWeight:'900', color:'#FFF', letterSpacing:3, marginBottom:4 },
  catLabel:         { fontSize:12, color:'#AAB4D4', marginBottom:8 },
  mascotte:         { marginVertical:12 },
  card:             { backgroundColor:'rgba(20,30,65,0.8)', width:'100%', borderRadius:20, padding:24, alignItems:'center', borderWidth:1, borderColor:'rgba(255,215,0,0.2)', marginBottom:24 },
  scoreLabel:       { fontSize:11, color:'#6F80A5', fontWeight:'700', letterSpacing:2, marginBottom:8 },
  scoreValue:       { fontSize:50, fontWeight:'900', marginBottom:14 },
  progressBar:      { width:'100%', height:8, backgroundColor:'rgba(255,255,255,0.1)', borderRadius:4, overflow:'hidden', marginBottom:6 },
  progressFill:     { height:'100%', borderRadius:4 },
  pctText:          { fontSize:13, color:'#AAB4D4', marginBottom:10 },
  message:          { fontSize:15, color:'#FFF', fontWeight:'600', textAlign:'center', lineHeight:22 },
  btnRow:           { flexDirection:'row', gap:12, width:'100%' },
  btn:              { flex:1, paddingVertical:16, borderRadius:50, alignItems:'center' },
  btnPrimary:       { backgroundColor:'#FFD700' },
  btnPrimaryText:   { color:'#0A0F24', fontWeight:'900', fontSize:14, letterSpacing:1 },
  btnSecondary:     { backgroundColor:'rgba(255,255,255,0.08)', borderWidth:1, borderColor:'rgba(255,255,255,0.15)' },
  btnSecondaryText: { color:'#FFF', fontWeight:'700', fontSize:14 },
});
