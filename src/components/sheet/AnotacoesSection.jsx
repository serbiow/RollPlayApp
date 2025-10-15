import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

const AnotacoesSection = ({ anotacoes, editMode, onSave }) => {
  const handleChange = (text) => {
    if (editMode) {
      onSave(text);
    }
  };

  return (
    <View style={styles.sectionCard}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionIcon}>📝</Text>
        <Text style={styles.sectionTitle}>Anotações</Text>
      </View>
      <View style={styles.anotacoesContent}>
        {editMode ? (
          <TextInput
            style={styles.anotacoesTextArea}
            value={anotacoes}
            onChangeText={handleChange}
            placeholder="Adicione anotações sobre seu personagem aqui..."
            multiline
            textAlignVertical="top"
          />
        ) : (
          <Text style={styles.anotacoesText}>{anotacoes}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  sectionIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  anotacoesContent: {
    // Estilos para o conteúdo das anotações
  },
  anotacoesTextArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    minHeight: 150,
    textAlignVertical: 'top',
  },
  anotacoesText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 5,
  },
});

export default AnotacoesSection;

