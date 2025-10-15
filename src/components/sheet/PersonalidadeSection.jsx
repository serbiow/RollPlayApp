import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

const PersonalidadeSection = ({ personalidade, editMode, onSave }) => {
  const handleChange = (field, value) => {
    if (editMode) {
      onSave({ ...personalidade, [field]: value });
    }
  };

  return (
    <View style={styles.sectionCard}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionIcon}>🎭</Text>
        <Text style={styles.sectionTitle}>Traços & Origem</Text>
      </View>
      <View style={styles.personalidadeContent}>
        {/* Bloco: Traços de Personalidade */}
        <View style={styles.personalidadeBlock}>
          <Text style={styles.blockTitle}>Traços de Personalidade</Text>
          {editMode ? (
            <TextInput
              style={styles.personalidadeTextArea}
              value={personalidade.tracos || ""}
              onChangeText={(text) => handleChange("tracos", text)}
              placeholder="Adicione os traços de personalidade do seu personagem..."
              multiline
              textAlignVertical="top"
            />
          ) : (
            <Text style={styles.personalidadeText}>{personalidade.tracos}</Text>
          )}
        </View>
        {/* Bloco: Ideais */}
        <View style={styles.personalidadeBlock}>
          <Text style={styles.blockTitle}>Ideais</Text>
          {editMode ? (
            <TextInput
              style={styles.personalidadeTextArea}
              value={personalidade.ideais || ""}
              onChangeText={(text) => handleChange("ideais", text)}
              placeholder="Adicione os ideais do seu personagem..."
              multiline
              textAlignVertical="top"
            />
          ) : (
            <Text style={styles.personalidadeText}>{personalidade.ideais}</Text>
          )}
        </View>
        {/* Bloco: Ligações */}
        <View style={styles.personalidadeBlock}>
          <Text style={styles.blockTitle}>Ligações</Text>
          {editMode ? (
            <TextInput
              style={styles.personalidadeTextArea}
              value={personalidade.ligacoes || ""}
              onChangeText={(text) => handleChange("ligacoes", text)}
              placeholder="Adicione as ligações do seu personagem..."
              multiline
              textAlignVertical="top"
            />
          ) : (
            <Text style={styles.personalidadeText}>{personalidade.ligacoes}</Text>
          )}
        </View>
        {/* Bloco: Defeitos */}
        <View style={styles.personalidadeBlock}>
          <Text style={styles.blockTitle}>Defeitos</Text>
          {editMode ? (
            <TextInput
              style={styles.personalidadeTextArea}
              value={personalidade.defeitos || ""}
              onChangeText={(text) => handleChange("defeitos", text)}
              placeholder="Adicione os defeitos do seu personagem..."
              multiline
              textAlignVertical="top"
            />
          ) : (
            <Text style={styles.personalidadeText}>{personalidade.defeitos}</Text>
          )}
        </View>
      </View>
      {/* Bloco: História */}
      <View style={[styles.personalidadeBlock, styles.historiaBlock]}>
        <Text style={styles.blockTitle}>História</Text>
        {editMode ? (
          <TextInput
            style={[styles.personalidadeTextArea, styles.historiaTextArea]}
            value={personalidade.historia || ""}
            onChangeText={(text) => handleChange("historia", text)}
            placeholder="Adicione a história do seu personagem..."
            multiline
            textAlignVertical="top"
          />
        ) : (
          <Text style={styles.personalidadeText}>{personalidade.historia}</Text>
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
  personalidadeContent: {
    // Estilos para o conteúdo geral da seção de personalidade
  },
  personalidadeBlock: {
    marginBottom: 15,
  },
  blockTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  personalidadeTextArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    minHeight: 80,
  },
  personalidadeText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 5,
  },
  historiaBlock: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
  },
  historiaTextArea: {
    minHeight: 150,
  },
});

export default PersonalidadeSection;

