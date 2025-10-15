/**
 * @file RegisterForm.jsx
 * @description Componente de formulário de registro para a aplicação React Native.
 * Gerencia a criação de novas contas de usuário.
 */

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage'; // Para persistência de token em RN

const RegisterForm = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false
  });
  const [error, setError] = useState('');
  const navigation = useNavigation();

  /**
   * @function handleChange
   * @description Atualiza o estado do formulário com base na entrada do usuário.
   * @param {string} name - O nome do campo do formulário.
   * @param {string | boolean} value - O novo valor do campo.
   */
  function handleChange(name, value) {
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  }

  /**
   * @function handleSubmit
   * @description Lida com a submissão do formulário de registro.
   * Valida as entradas e tenta registrar o usuário via API.
   */
  async function handleSubmit() {
    setError('');
    if (form.password !== form.confirmPassword) {
      setError('As senhas não conferem');
      Alert.alert('Erro', 'As senhas não conferem');
      return;
    }
    if (!form.terms) {
      setError('Você deve aceitar os Termos de Serviço e a Política de Privacidade.');
      Alert.alert('Erro', 'Você deve aceitar os Termos de Serviço e a Política de Privacidade.');
      return;
    }

    const payload = {
      displayName: form.username,
      email: form.email,
      password: form.password
    };

    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/signup',
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 201) {
        Alert.alert('Sucesso', 'Conta criada com sucesso! Por favor, verifique seu e-mail para ativar sua conta.');
        navigation.navigate('Login'); // Redireciona para a tela de login
      } else {
        setError(response.data.message || 'Erro ao criar conta');
        Alert.alert('Erro', response.data.message || 'Erro ao criar conta');
      }
    } catch (err) {
      const msg = err.response?.data?.message ||
        'Não foi possível criar a conta. Tente novamente.';
      setError(msg);
      Alert.alert('Erro', msg);
    }
  };

  return (
    <View style={styles.registerForm}>
      <View style={styles.registerFormHeader}>
        {/* Ícone representativo para o formulário de registro */}
        <Text style={styles.iconPlaceholder}>✨</Text>
        <Text style={styles.title}>Crie sua conta</Text>
        <Text style={styles.subtitle}>Junte-se a milhares de jogadores de RPG</Text>
      </View>
      <View style={styles.registerFormBody}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Nome de usuário</Text>
          <TextInput
            style={styles.input}
            placeholder="Seu nome de usuário"
            value={form.username}
            onChangeText={(text) => handleChange('username', text)}
            required
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="seu.email@exemplo.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            onChangeText={(text) => handleChange('email', text)}
            required
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            secureTextEntry
            value={form.password}
            onChangeText={(text) => handleChange('password', text)}
            required
          />
          <Text style={styles.note}>A senha deve ter pelo menos 8 caracteres</Text>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Confirmar senha</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            secureTextEntry
            value={form.confirmPassword}
            onChangeText={(text) => handleChange('confirmPassword', text)}
            required
          />
        </View>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => handleChange('terms', !form.terms)}
          >
            {form.terms ? <Text style={styles.checkboxChecked}>✓</Text> : <Text style={styles.checkboxUnchecked}></Text>}
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>
            Eu concordo com os <Text style={styles.linkText} onPress={() => Alert.alert('Termos de Serviço', 'Redirecionar para termos de serviço')}>Termos de Serviço</Text> e{' '}
            <Text style={styles.linkText} onPress={() => Alert.alert('Política de Privacidade', 'Redirecionar para política de privacidade')}>Política de Privacidade</Text>
          </Text>
        </View>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Criar conta gratuita</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.registerFormFooter}>
        <Text style={styles.footerText}>Já tem uma conta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}> {/* Adaptar rota */}
          <Text style={styles.linkText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  registerForm: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  registerFormHeader: {
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
  registerFormBody: {
    width: '100%',
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  note: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  checkboxContainer: {
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
    // Estilo para checkbox desmarcado
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  linkText: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerFormFooter: {
    flexDirection: 'row',
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: '#333',
  },
});

export default RegisterForm;

