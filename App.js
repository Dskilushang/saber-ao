import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/screens/SplashScreen';
import AccueilScreen from './src/screens/AccueilScreen';
import CategoriesScreen from './src/screens/CategoriesScreen';
import QuizScreen from './src/screens/QuizScreen';
import ResultatScreen from './src/screens/ResultatScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false, animation: 'fade' }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Accueil" component={AccueilScreen} />
        <Stack.Screen name="Categories" component={CategoriesScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Screen name="Resultat" component={ResultatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
                       }
