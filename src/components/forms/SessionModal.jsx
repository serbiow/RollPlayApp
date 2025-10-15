/**
 * @file SessionModal.jsx
 * @description Componente de modal para criação de novas sessões de RPG na aplicação React Native.
 * Permite ao usuário inserir detalhes da sessão como nome, sistema, descrição e número máximo de jogadores.
 */

import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker'; // Necessário instalar: npm install @react-native-picker/picker
// import AsyncStorage from '@react-native-async-storage/async-storage'; // Para persistência de token em RN

const SessionModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    sessionName: '',
    system: 'D&D 5e',
    description: '',
    maxPlayers: '4', // Manter como string para TextInput
  });
  const [error, setError] = useState('');

  /**
   * @function handleChange
   * @description Atualiza o estado do formulário com base na entrada do usuário.
   * @param {string} name - O nome do campo do formulário.
   * @param {string} value - O novo valor do campo.
   */
  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * @function handleSubmit
   * @description Lida com a submissão do formulário de criação de sessão.
   * Valida as entradas e tenta criar a sessão via API.
   */
  const handleSubmit = async () => {
    setError('');
    try {
      // TODO: Adaptação: sessionStorage não existe em React Native. 
      // Você precisará de uma forma de gerenciar o token de autenticação, 
      // por exemplo, usando AsyncStorage ou um contexto/estado global.
      // Por enquanto, vamos simular com um valor fixo ou um placeholder.
      const token = "YOUR_AUTH_TOKEN_HERE"; // Substitua pela lógica real de obtenção do token

      if (!token || token === "YOUR_AUTH_TOKEN_HERE") {
        setError('Você precisa estar logado para criar uma campanha. (Token não encontrado)');
        Alert.alert('Erro', 'Você precisa estar logado para criar uma campanha. (Token não encontrado)');
        return;
      }

      const res = await axios.post(
        'http://localhost:5000/api/campaign/create', // Ajuste o IP se o backend não estiver na mesma máquina
        {
          sessionName:  formData.sessionName,
          system:       formData.system,
          description:  formData.description,
          maxPlayers:   Number(formData.maxPlayers) // Converter para número antes de enviar
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (res.data.success) {
        console.log('Campanha criada:', res.data.data);
        Alert.alert('Sucesso', 'Campanha criada com sucesso!');
        onClose(); // Fecha o modal após o sucesso
      } else {
        setError(res.data.message || 'Erro ao criar campanha.');
        Alert.alert('Erro', res.data.message || 'Erro ao criar campanha.');
      }
    } catch (err) {
      console.error('Erro no request:', err);
      setError(
        err.response?.data?.message ||
        'Falha na conexão ao criar campanha.'
      );
      Alert.alert('Erro', err.response?.data?.message || 'Falha na conexão ao criar campanha.');
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={onClose} // Permite fechar o modal pressionando o botão de voltar no Android
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Botão para fechar o modal */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>&times;</Text>
          </TouchableOpacity>

          <Text style={styles.formTitle}>Criar Nova Sessão</Text>

          {/* Campo Nome da Sessão */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Nome da Sessão:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => handleChange('sessionName', text)}
              value={formData.sessionName}
              placeholder="Nome da Sessão"
              required
            />
          </View>

          {/* Campo Sistema */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Sistema:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.system}
                onValueChange={(itemValue) => handleChange('system', itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="D&D 5e" value="D&D 5e" />
                <Picker.Item label="D&D 5.5e" value="D&D 5.5e" />
                {/* Adicionar mais opções de sistema conforme necessário */}
              </Picker>
            </View>
          </View>

          {/* Campo Descrição */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Descrição:</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              onChangeText={(text) => handleChange('description', text)}
              value={formData.description}
              placeholder="Descrição da Sessão"
              multiline
              numberOfLines={4}
              required
            />
          </View>

          {/* Campo Máximo de Jogadores */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Máximo de Jogadores:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => handleChange('maxPlayers', text)}
              value={formData.maxPlayers}
              keyboardType="numeric"
              placeholder="4"
              maxLength={2}
              required
            />
          </View>

          {/* Exibição de erro, se houver */}
          {error ? <Text style={styles.sessionError}>{error}</Text> : null}

          {/* Botão de submissão */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Criar Sessão</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semi-transparente para o modal
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%', // Largura do modal
    maxHeight: '80%', // Altura máxima do modal
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
    zIndex: 1, // Garante que o botão de fechar esteja acima de outros elementos
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  formTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
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
  textArea: {
    height: 100,
    textAlignVertical: 'top', // Alinha o texto no topo para multiline TextInput
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden', // Garante que o picker não vaze as bordas
  },
  picker: {
    height: 50,
    width: '100%',
  },
  sessionError: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SessionModal;

