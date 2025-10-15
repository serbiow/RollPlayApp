/**
 * @file App.jsx
 * @description Componente raiz da aplicação React Native.
 * Este arquivo importa o RootNavigator, que gerencia a navegação entre as telas de autenticação e as telas principais da aplicação.
 */

import React from 'react';
import RootNavigator from './navigation';

const App = () => {
  return <RootNavigator />;
};

export default App;

