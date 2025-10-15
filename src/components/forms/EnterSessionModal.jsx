/**
 * @file EnterSessionModal.jsx
 * @description Componente de modal para entrar em sessões de RPG existentes na aplicação React Native.
 * Permite ao usuário inserir um código de sessão e selecionar uma de suas fichas de personagem.
 */

import React, { useEffect, useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { Picker } from "@react-native-picker/picker"; // Necessário instalar: npm install @react-native-picker/picker
// import AsyncStorage from "@react-native-async-storage/async-storage"; // Para persistência de token em RN

const EnterSessionModal = ({ isOpen, onClose }) => {
  const [code, setCode] = useState("");
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    /**
     * @function fetchCharacters
     * @description Busca as fichas de personagem do usuário logado.
     */
    const fetchCharacters = async () => {
      setError("");
      try {
        // TODO: Adaptação: localStorage/sessionStorage não existe em React Native.
        // Você precisará de uma forma de gerenciar o token de autenticação,
        // por exemplo, usando AsyncStorage ou um contexto/estado global.
        const token = "YOUR_AUTH_TOKEN_HERE"; // Substitua pela lógica real de obtenção do token
        if (!token || token === "YOUR_AUTH_TOKEN_HERE") {
          setError("Token de autenticação não encontrado.");
          Alert.alert("Erro", "Token de autenticação não encontrado.");
          return;
        }

        const res = await axios.get("http://localhost:5000/api/character/userSheets", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data?.result) {
          setCharacters(res.data.result);
        }
      } catch (err) {
        console.error("Erro ao carregar personagens:", err);
        setError("Erro ao carregar personagens.");
        Alert.alert("Erro", "Erro ao carregar personagens.");
      }
    };
    fetchCharacters();
  }, [isOpen]);

  /**
   * @function handleSubmit
   * @description Lida com a submissão do formulário para entrar em uma sessão.
   * Valida as entradas e tenta juntar o usuário à sessão via API.
   */
  const handleSubmit = async () => {
    setError("");
    if (!code || !selectedCharacter) {
      setError("Informe o código da sessão e selecione uma ficha.");
      Alert.alert("Erro", "Informe o código da sessão e selecione uma ficha.");
      return;
    }

    try {
      // TODO: Obter o token de autenticação de forma segura (ex: AsyncStorage)
      const token = "YOUR_AUTH_TOKEN_HERE"; // Substitua pela lógica real de obtenção do token
      if (!token || token === "YOUR_AUTH_TOKEN_HERE") {
        setError("Você precisa estar logado para entrar em uma sessão.");
        Alert.alert("Erro", "Você precisa estar logado para entrar em uma sessão.");
        return;
      }

      const res = await axios.post(
        "http://localhost:5000/api/campaign/join",
        {
          code,
          characterId: selectedCharacter,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        Alert.alert("Sucesso", "Você entrou na sessão!");
        onClose();
      } else {
        setError(res.data.message || "Falha ao entrar na sessão.");
        Alert.alert("Erro", res.data.message || "Falha ao entrar na sessão.");
      }
    } catch (err) {
      console.error("Erro ao entrar na sessão:", err);
      setError(
        err.response?.data?.message || "Não foi possível conectar. Tente novamente."
      );
      Alert.alert("Erro", err.response?.data?.message || "Não foi possível conectar. Tente novamente.");
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

          <Text style={styles.title}>Entrar em uma Sessão</Text>

          {/* Campo para o código da sessão */}
          <View style={styles.formGroup}>
            <TextInput
              style={styles.input}
              placeholder="Digite o código da sessão"
              value={code}
              onChangeText={setCode}
              required
            />
          </View>

          {/* Campo para seleção da ficha de personagem */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Escolha sua ficha:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedCharacter}
                onValueChange={(itemValue) => setSelectedCharacter(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Selecione uma ficha" value="" />
                {characters.map((char) => (
                  <Picker.Item key={char.id} label={char.nome || "Sem Nome"} value={char.id} />
                ))}
              </Picker>
            </View>
          </View>

          {/* Exibição de erro, se houver */}
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {/* Botão de submissão */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fundo semi-transparente para o modal
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "90%", // Largura do modal
    maxHeight: "80%", // Altura máxima do modal
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 5,
    zIndex: 1, // Garante que o botão de fechar esteja acima de outros elementos
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    overflow: "hidden", // Garante que o picker não vaze as bordas
  },
  picker: {
    height: 50,
    width: "100%",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default EnterSessionModal;

