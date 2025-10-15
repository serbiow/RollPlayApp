import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';

const VisaoGeralSection = ({ data, editMode, onSave }) => {
  const handleChange = (name, value) => {
    if (editMode) {
      const updatedData = { ...data, [name]: value };
      onSave(updatedData);
    }
  };

  const toggleInspiracao = () => {
    const updatedData = { ...data, inspiracao: !data.inspiracao };
    onSave(updatedData);
  };

  const calcModificador = (valor) => {
    return Math.floor((valor - 10) / 2);
  };

  const formatModificador = (mod) => {
    return mod >= 0 ? `+${mod}` : `${mod}`;
  };

  return (
    <View style={styles.sectionCard}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionIcon}>📋</Text>
        <Text style={styles.sectionTitle}>Visão Geral</Text>
      </View>
      <View style={styles.visaoGeralContent}>
        <View style={styles.visaoGeralGrid}>
          <View style={styles.infoGroup}>
            <Text style={styles.label}>Nome</Text>
            {editMode ? (
              <TextInput
                style={styles.input}
                value={data.nome}
                onChangeText={(text) => handleChange('nome', text)}
              />
            ) : (
              <Text style={styles.infoValue}>{data.nome}</Text>
            )}
          </View>
          <View style={styles.infoGroup}>
            <Text style={styles.label}>Raça</Text>
            {editMode ? (
              <TextInput
                style={styles.input}
                value={data.raca}
                onChangeText={(text) => handleChange('raca', text)}
              />
            ) : (
              <Text style={styles.infoValue}>{data.raca}</Text>
            )}
          </View>
          <View style={styles.infoGroup}>
            <Text style={styles.label}>Classe</Text>
            {editMode ? (
              <TextInput
                style={styles.input}
                value={data.classe}
                onChangeText={(text) => handleChange('classe', text)}
              />
            ) : (
              <Text style={styles.infoValue}>{data.classe}</Text>
            )}
          </View>
          <View style={styles.infoGroup}>
            <Text style={styles.label}>Nível</Text>
            {editMode ? (
              <TextInput
                style={styles.input}
                value={String(data.nivel)}
                onChangeText={(text) => handleChange('nivel', text)}
                keyboardType="numeric"
              />
            ) : (
              <Text style={styles.infoValue}>{data.nivel}</Text>
            )}
          </View>
          <View style={styles.infoGroup}>
            <Text style={styles.label}>Alinhamento</Text>
            {editMode ? (
              <TextInput
                style={styles.input}
                value={data.alinhamento}
                onChangeText={(text) => handleChange('alinhamento', text)}
              />
            ) : (
              <Text style={styles.infoValue}>{data.alinhamento}</Text>
            )}
          </View>
          <View style={styles.infoGroup}>
            <Text style={styles.label}>Experiência</Text>
            {editMode ? (
              <TextInput
                style={styles.input}
                value={String(data.experiencia)}
                onChangeText={(text) => handleChange('experiencia', text)}
                keyboardType="numeric"
              />
            ) : (
              <Text style={styles.infoValue}>{data.experiencia}</Text>
            )}
          </View>
          <View style={styles.infoGroup}>
            <Text style={styles.label}>Antecedente</Text>
            {editMode ? (
              <TextInput
                style={styles.input}
                value={data.antecedente}
                onChangeText={(text) => handleChange('antecedente', text)}
              />
            ) : (
              <Text style={styles.infoValue}>{data.antecedente}</Text>
            )}
          </View>
        </View>

        <View style={styles.inspiracaoContainer}>
          <Text style={styles.label}>Inspiração</Text>
          <TouchableOpacity
            style={[styles.inspiracaoButton, data.inspiracao && styles.inspiradoButton]}
            onPress={toggleInspiracao}
          >
            <Text style={styles.inspiracaoIcon}>{data.inspiracao ? '☀️' : ''}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.atributosDerivados}>
          <View style={styles.derivadoCard}>
            <Text style={styles.derivadoLabel}>Classe de Armadura</Text>
            <Text style={styles.derivadoValor}>{10 + calcModificador(data.atributos.destreza)}</Text>
          </View>
          <View style={styles.derivadoCard}>
            <Text style={styles.derivadoLabel}>Iniciativa</Text>
            <Text style={styles.derivadoValor}>{formatModificador(calcModificador(data.atributos.destreza))}</Text>
          </View>
          <View style={styles.derivadoCard}>
            <Text style={styles.derivadoLabel}>Deslocamento</Text>
            <Text style={styles.derivadoValor}>9m</Text>
          </View>
        </View>
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
  visaoGeralContent: {
    // Estilos para o conteúdo geral
  },
  visaoGeralGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  infoGroup: {
    width: '48%', // Duas colunas em mobile
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    fontSize: 16,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    paddingVertical: 8,
  },
  inspiracaoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  inspiracaoButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  inspiradoButton: {
    backgroundColor: '#ffc107',
    borderColor: '#ffc107',
  },
  inspiracaoIcon: {
    fontSize: 20,
  },
  atributosDerivados: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  derivadoCard: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    width: '30%', // Três colunas
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  derivadoLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
    textAlign: 'center',
  },
  derivadoValor: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default VisaoGeralSection;

