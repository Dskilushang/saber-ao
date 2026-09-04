import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>SABER AO 🇦🇴</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F24',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFD700',
    fontSize: 32,
    fontWeight: '900',
  },
});
