import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet } from 'react-native';

const Stack = createStackNavigator();

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>SABER AO 🇦🇴</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0F24', alignItems: 'center', justifyContent: 'center' },
  text: { color: '#FFD700', fontSize: 32, fontWeight: '900' },
});
