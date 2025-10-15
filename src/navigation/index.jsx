/**
 * @file index.jsx
 * @description Componente de navegação raiz da aplicação React Native.
 * Este arquivo decide qual navegador (autenticação ou principal) deve ser exibido
 * com base no estado de autenticação do usuário.
 */

import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';

// Adaptação: Este é um placeholder para a lógica de autenticação.
// Em uma aplicação real, você usaria um contexto de autenticação, AsyncStorage,
// ou uma biblioteca de gerenciamento de estado para verificar se o usuário está logado.
const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    // Simula a verificação de um token de autenticação no armazenamento local
    // Em um ambiente real, você usaria AsyncStorage aqui.
    const checkToken = async () => {
      try {
        // const token = await AsyncStorage.getItem("userToken");
        const token = null; // Por enquanto, simula que não há token
        setUserToken(token);
      } catch (e) {
        console.error("Erro ao verificar token de autenticação", e);
      }
      setIsLoading(false);
    };

    checkToken();
  }, []);

  // Funções para login e logout (placeholders)
  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // Lógica de login real aqui
        setUserToken("dummy-auth-token");
      },
      signOut: () => setUserToken(null),
      signUp: async (data) => {
        // Lógica de registro real aqui
        setUserToken("dummy-auth-token");
      },
    }),
    []
  );

  return { userToken, isLoading, authContext };
};

const RootNavigator = () => {
  const { userToken, isLoading } = useAuth();

  if (isLoading) {
    // Pode retornar uma tela de splash ou loading aqui
    return null; 
  }

  return (
    <NavigationContainer>
      {userToken ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;

