/**
 * @file LoginForm.jsx
 * @description Componente de formulário de login para a aplicação React Native.
 * Gerencia a entrada de credenciais do usuário e a submissão para autenticação.
 */

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage'; // Para persistência de token em RN

const LoginForm = () => {
  const [form, setForm] = useState({
    identifier: '',   // email ou nome de usuário
    password: '',
    remember: false
  });
  const [error, setError] = useState('');
  const navigation = useNavigation();

  function handleChange(name, value) {
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  }

  async function handleSubmit() {
    setError('');
    try {
      const payload = {
        email: form.identifier,
        password: form.password
      };
      const res = await axios.post(
        'http://localhost:5000/api/auth/signin',
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      );

      const token  = res.data.response?.userData?.token;
      if (!token) throw new Error('Token não encontrado na resposta.');

      // TODO: Adaptação: localStorage/sessionStorage não existe em React Native.
      // Você precisará de uma forma de gerenciar o token de autenticação,
      // por exemplo, usando AsyncStorage ou um contexto/estado global.
      // Por enquanto, vamos apenas logar o token e navegar.
      console.log('Token de autenticação:', token);
      if (form.remember) {
        // await AsyncStorage.setItem('authToken', token);
        console.log('Token seria salvo persistentemente se AsyncStorage estivesse configurado.');
      } else {
        // Salvar token de forma não persistente (ex: contexto ou estado global)
        console.log('Token seria salvo não persistentemente.');
      }

      Alert.alert('Sucesso', 'Login realizado com sucesso!');
      navigation.navigate('Home'); // Redireciona para a página inicial

    } catch (err) {
      const msg =
        err.response?.data?.message ||
        'Falha ao entrar. Verifique suas credenciais.';
      setError(msg);
      Alert.alert('Erro', msg);
    }
  }

  return (
    <View style={styles.loginForm}>
      <View style={styles.loginFormHeader}>
        {/* Substituir FaDiceD20 por um ícone ou imagem de sua preferência para React Native */}
        <Text style={styles.iconPlaceholder}>🎲</Text>
        <Text style={styles.title}>Bem-vindo de volta!</Text>
        <Text style={styles.subtitle}>Entre para continuar sua aventura</Text>
      </View>
      <View style={styles.loginFormBody}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="seu.email@exemplo.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={form.identifier}
          onChangeText={(text) => handleChange('identifier', text)}
          required
        />
        <View style={styles.passwordLabelContainer}>
          <Text style={styles.label}>Senha</Text>
          <TouchableOpacity onPress={() => Alert.alert('Esqueceu a senha?', 'Funcionalidade de recuperação de senha a ser implementada.')}> {/* Adaptar rota */}
            <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          placeholder="••••••••"
          secureTextEntry
          value={form.password}
          onChangeText={(text) => handleChange('password', text)}
          required
        />
        <View style={styles.rememberMeContainer}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => handleChange('remember', !form.remember)}
          >
            {form.remember ? <Text style={styles.checkboxChecked}>✓</Text> : <Text style={styles.checkboxUnchecked}></Text>}
          </TouchableOpacity>
          <Text style={styles.rememberMeText}>Lembrar de mim</Text>
        </View>
        {error ? <Text style={styles.loginFormError}>{error}</Text> : null}
        <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.registerTextContainer}>
        <Text style={styles.registerText}>Não tem uma conta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}> {/* Adaptar rota */}
          <Text style={styles.registerLink}>Registre-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loginForm: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  loginFormHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  iconPlaceholder: {
    fontSize: 48,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  loginFormBody: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  passwordLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  forgotPasswordText: {
    color: '#007bff',
    fontSize: 14,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxChecked: {
    color: '#007bff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  checkboxUnchecked: {
    // Estilo para checkbox desmarcado, pode ser vazio ou ter uma borda diferente
  },
  rememberMeText: {
    fontSize: 16,
    color: '#333',
  },
  loginFormError: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 15,
  },
  loginButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerTextContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  registerText: {
    fontSize: 16,
    color: '#333',
  },
  registerLink: {
    fontSize: 16,
    color: '#007bff',
    fontWeight: 'bold',
  },
});

export default LoginForm;

