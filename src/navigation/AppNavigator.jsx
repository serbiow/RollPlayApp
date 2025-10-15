/**
 * @file AppNavigator.jsx
 * @description Navegador principal da aplicação React Native (após autenticação).
 * Gerencia as rotas das telas principais, como Home, Perfil, Sessão de Perfil e Ficha de Personagem.
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from '../features/home/screens/HomePage';
import ProfilePage from '../features/profile/screens/ProfilePage';
import ProfileSessionPage from '../features/profileSession/screens/ProfileSessionPage';
import SheetPage from '../features/sheet/screens/SheetPage';

const AppStack = createStackNavigator();

const AppNavigator = () => {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="Home" component={HomePage} />
      <AppStack.Screen name="Profile" component={ProfilePage} />
      <AppStack.Screen name="ProfileSession" component={ProfileSessionPage} />
      <AppStack.Screen name="Sheet" component={SheetPage} />
      {/* Adicionar outras telas principais aqui */}
    </AppStack.Navigator>
  );
};

export default AppNavigator;

