import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ScrollView } from "react-native";

const HabilidadesSection = ({ habilidades, editMode, onSave }) => {
  const [novaHabilidade, setNovaHabilidade] = useState({ nome: "", descricao: "" });

  const handleAddHabilidade = () => {
    if (novaHabilidade.nome && novaHabilidade.descricao) {
      const updatedHabilidades = [...habilidades, novaHabilidade];
      onSave(updatedHabilidades);
      setNovaHabilidade({ nome: "", descricao: "" });
    } else {
      Alert.alert("Erro", "Por favor, preencha o nome e a descrição da habilidade.");
    }
  };

  const handleRemoveHabilidade = (index) => {
    const updatedHabilidades = habilidades.filter((_, i) => i !== index);
    onSave(updatedHabilidades);
  };

  const handleHabilidadeChange = (name, value) => {
    setNovaHabilidade({ ...novaHabilidade, [name]: value });
  };

  return (
    <View style={styles.sectionCard}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionIcon}>✨</Text>
        <Text style={styles.sectionTitle}>Habilidades e Traços</Text>
      </View>

      <ScrollView style={styles.habilidadesList}>
        {habilidades.map((habilidade, index) => (
          <View key={index} style={styles.habilidadeCard}>
            <View style={styles.habilidadeHeader}>
              <Text style={styles.habilidadeNome}>{habilidade.nome}</Text>
              {editMode && (
                <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveHabilidade(index)}>
                  <Text style={styles.removeButtonText}>✕</Text>
                </TouchableOpacity>
              )}
            </View>
            <Text style={styles.habilidadeDescricao}>{habilidade.descricao}</Text>
          </View>
        ))}
      </ScrollView>

      {editMode && (
        <View style={styles.addHabilidadeForm}>
          <Text style={styles.formTitle}>Adicionar Habilidade</Text>
          <View style={styles.formGroup}>
            <TextInput
              style={styles.input}
              placeholder="Nome da Habilidade"
              value={novaHabilidade.nome}
              onChangeText={(text) => handleHabilidadeChange("nome", text)}
            />
          </View>
          <View style={styles.formGroup}>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Descrição da Habilidade"
              value={novaHabilidade.descricao}
              onChangeText={(text) => handleHabilidadeChange("descricao", text)}
              multiline
              textAlignVertical="top"
            />
          </View>
          <TouchableOpacity style={styles.addButton} onPress={handleAddHabilidade}>
            <Text style={styles.addButtonText}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 10,
  },
  sectionIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  habilidadesList: {
    maxHeight: 300, // Limitar altura para rolagem
  },
  habilidadeCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  habilidadeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  habilidadeNome: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  removeButton: {
    backgroundColor: "#dc3545",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  habilidadeDescricao: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  addHabilidadeForm: {
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  formGroup: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  addButton: {
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HabilidadesSection;

