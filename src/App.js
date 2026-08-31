import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen     from './screens/SplashScreen';
import AccueilScreen    from './screens/AccueilScreen';
import CategoriesScreen from './screens/CategoriesScreen';
import QuizScreen       from './screens/QuizScreen';
import ResultatScreen   from './screens/ResultatScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash"     component={SplashScreen} />
        <Stack.Screen name="Accueil"    component={AccueilScreen} />
        <Stack.Screen name="Categories" component={CategoriesScreen} />
        <Stack.Screen name="Quiz"       component={QuizScreen} />
        <Stack.Screen name="Resultat"   component={ResultatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
