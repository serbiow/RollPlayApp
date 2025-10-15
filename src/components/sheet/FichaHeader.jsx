/**
 * @file FichaHeader.jsx
 * @description Componente de cabeçalho para a ficha de personagem na aplicação React Native.
 * Exibe o nome do personagem, classe, pontos de vida e permite alternar o modo de edição.
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
// import { Pencil } from 'lucide-react-native'; // Usar ícones React Native

const FichaHeader = ({ characterImage, characterName, characterClass, pvAtual, pvTotal, pvTemp, onEditToggle, editMode, onHeal, onDamage }) => {
  const [pvInputValue, setPvInputValue] = useState('');

  /**
   * @function handleHealPress
   * @description Lida com a ação de curar o personagem, aplicando o valor inserido no PV atual.
   */
  const handleHealPress = () => {
    const value = parseInt(pvInputValue, 10);
    if (!isNaN(value) && onHeal) {
      onHeal(value);
      setPvInputValue('');
    } else if (onHeal) {
      Alert.alert('Erro', 'Por favor, insira um valor numérico para curar.');
    }
  };

  /**
   * @function handleDamagePress
   * @description Lida com a ação de aplicar dano ao personagem, subtraindo o valor inserido do PV atual.
   */
  const handleDamagePress = () => {
    const value = parseInt(pvInputValue, 10);
    if (!isNaN(value) && onDamage) {
      onDamage(value);
      setPvInputValue('');
    } else if (onDamage) {
      Alert.alert('Erro', 'Por favor, insira um valor numérico para dano.');
    }
  };

  return (
    <View style={styles.fichaHeader}>
      {/* Botão de Editar/Salvar */}
      <TouchableOpacity style={styles.editButton} onPress={onEditToggle}>
        {/* <Pencil size={16} color="#333" /> */}
        <Text style={styles.editIcon}>📝</Text>
        <Text style={styles.editText}>{editMode ? "Salvar" : "Editar"}</Text>
      </TouchableOpacity>

      {/* Informações principais do personagem */}
      <View style={styles.fichaTitle}>
        <View style={styles.characterPortrait}>
          <View style={styles.portraitPlaceholder}>
            {characterImage ? (
              <Image source={{ uri: characterImage }} style={styles.portraitImage} />
            ) : (
              <Text style={styles.portraitIcon}>👤</Text>
            )}
          </View>
          {editMode && (
            <TouchableOpacity style={styles.uploadPortraitBtn} onPress={() => Alert.alert("Alterar Imagem", "Funcionalidade de upload a ser implementada.")}>
              <Text style={styles.uploadPortraitBtnText}>Alterar Imagem</Text>
            </TouchableOpacity>
          )}
        </View>
        <View>
          <Text style={styles.characterName}>{characterName}</Text>
          <Text style={styles.characterClass}>{characterClass}</Text>
        </View>
      </View>

      {/* Bloco de Pontos de Vida (PV) */}
      <View style={styles.pvBlock}>
        <View style={styles.pvControls}>
          <TouchableOpacity style={[styles.pvButton, styles.healButton]} onPress={handleHealPress}>
            <Text style={styles.pvButtonText}>Curar</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.pvInput}
            onChangeText={setPvInputValue}
            value={pvInputValue}
            keyboardType="numeric"
            placeholder="Valor"
          />
          <TouchableOpacity style={[styles.pvButton, styles.damageButton]} onPress={handleDamagePress}>
            <Text style={styles.pvButtonText}>Dano</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.pvValues}>
          <View style={styles.pvItem}>
            <Text style={styles.pvLabel}>PV Atual: </Text>
            <Text style={styles.pvValue}>{pvAtual}</Text>
          </View>
          <View style={styles.pvItem}>
            <Text style={styles.pvLabel}>PV Total: </Text>
            <Text style={styles.pvValue}>{pvTotal}</Text>
          </View>
          <View style={styles.pvItem}>
            <Text style={styles.pvLabel}>PV Temporário: </Text>
            <Text style={styles.pvValue}>{pvTemp}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fichaHeader: {
    backgroundColor: '#fff',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
    position: 'relative',
  },
  editButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  editIcon: {
    fontSize: 16,
    marginRight: 5,
  },
  editText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  fichaTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  characterPortrait: {
    marginRight: 15,
    alignItems: 'center',
  },
  portraitPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#007bff',
    overflow: 'hidden',
  },
  portraitImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  portraitIcon: {
    fontSize: 40,
    color: '#fff',
  },
  uploadPortraitBtn: {
    marginTop: 5,
    backgroundColor: '#007bff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  uploadPortraitBtnText: {
    color: '#fff',
    fontSize: 12,
  },
  characterName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  characterClass: {
    fontSize: 16,
    color: '#666',
  },
  pvBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  pvControls: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  pvButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  healButton: {
    backgroundColor: '#28a745',
    marginRight: 5,
  },
  damageButton: {
    backgroundColor: '#dc3545',
    marginLeft: 5,
  },
  pvButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  pvInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    textAlign: 'center',
    fontSize: 16,
    marginHorizontal: 5,
  },
  pvValues: {
    flex: 1,
    alignItems: 'flex-end',
  },
  pvItem: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  pvLabel: {
    fontSize: 14,
    color: '#666',
  },
  pvValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default FichaHeader;

