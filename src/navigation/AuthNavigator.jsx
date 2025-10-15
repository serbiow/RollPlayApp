/**
 * @file AuthNavigator.jsx
 * @description Navegador de autenticação para a aplicação React Native.
 * Gerencia as rotas relacionadas ao processo de autenticação, como Login e Registro.
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from '../features/auth/screens/LoginPage';
import RegisterPage from '../features/auth/screens/RegisterPage';

const AuthStack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginPage} />
      <AuthStack.Screen name="Register" component={RegisterPage} />
      {/* Adicionar outras telas de autenticação, como recuperação de senha, se houver */}
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;

