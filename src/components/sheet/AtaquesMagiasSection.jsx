import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ScrollView } from "react-native";

const AtaquesMagiasSection = ({ ataques, magias, editMode, onSave }) => {
  const [activeTab, setActiveTab] = useState("ataques");
  const [novoAtaque, setNovoAtaque] = useState({ nome: "", bonus: "", dano: "", tipo: "" });

  const handleAddAtaque = () => {
    if (novoAtaque.nome && novoAtaque.bonus && novoAtaque.dano && novoAtaque.tipo) {
      const updatedAtaques = [...ataques, novoAtaque];
      onSave({ ataques: updatedAtaques });
      setNovoAtaque({ nome: "", bonus: "", dano: "", tipo: "" });
    } else {
      Alert.alert("Erro", "Por favor, preencha todos os campos para adicionar um ataque.");
    }
  };

  const handleRemoveAtaque = (index) => {
    const updatedAtaques = ataques.filter((_, i) => i !== index);
    onSave({ ataques: updatedAtaques });
  };

  const handleAtaqueChange = (name, value) => {
    setNovoAtaque({ ...novoAtaque, [name]: value });
  };

  return (
    <View style={styles.sectionCard}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionIcon}>⚔️</Text>
        <Text style={styles.sectionTitle}>Ataques e Magias</Text>
      </View>

      <View style={styles.ataquesTabs}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === "ataques" && styles.activeTabButton]}
          onPress={() => setActiveTab("ataques")}
        >
          <Text style={styles.tabButtonText}>Ataques</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === "magias" && styles.activeTabButton]}
          onPress={() => setActiveTab("magias")}
        >
          <Text style={styles.tabButtonText}>Magias</Text>
        </TouchableOpacity>
      </View>

      {activeTab === "ataques" && (
        <View style={styles.ataquesContent}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Nome</Text>
            <Text style={styles.tableHeaderText}>Bônus</Text>
            <Text style={styles.tableHeaderText}>Dano/Tipo</Text>
            {editMode && <Text style={styles.tableHeaderText}>Ações</Text>}
          </View>
          {ataques.map((ataque, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{ataque.nome}</Text>
              <Text style={styles.tableCell}>{ataque.bonus}</Text>
              <Text style={styles.tableCell}>{ataque.dano} {ataque.tipo}</Text>
              {editMode && (
                <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveAtaque(index)}>
                  <Text style={styles.removeButtonText}>✕</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}

          {editMode && (
            <View style={styles.addAtaqueForm}>
              <Text style={styles.formTitle}>Adicionar Ataque</Text>
              <TextInput
                style={styles.input}
                placeholder="Nome"
                value={novoAtaque.nome}
                onChangeText={(text) => handleAtaqueChange("nome", text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Bônus (ex: +5)"
                value={novoAtaque.bonus}
                onChangeText={(text) => handleAtaqueChange("bonus", text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Dano (ex: 1d8+3)"
                value={novoAtaque.dano}
                onChangeText={(text) => handleAtaqueChange("dano", text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Tipo (ex: Cortante)"
                value={novoAtaque.tipo}
                onChangeText={(text) => handleAtaqueChange("tipo", text)}
              />
              <TouchableOpacity style={styles.addButton} onPress={handleAddAtaque}>
                <Text style={styles.addButtonText}>Adicionar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}

      {activeTab === "magias" && (
        <View style={styles.magiasContent}>
          <View style={styles.magiasInfo}>
            <View style={styles.magiaStat}>
              <Text style={styles.magiaStatLabel}>Habilidade de Conjuração</Text>
              <Text style={styles.magiaStatValue}>-</Text>
            </View>
            <View style={styles.magiaStat}>
              <Text style={styles.magiaStatLabel}>CD para Resistir</Text>
              <Text style={styles.magiaStatValue}>-</Text>
            </View>
            <View style={styles.magiaStat}>
              <Text style={styles.magiaStatLabel}>Bônus de Ataque</Text>
              <Text style={styles.magiaStatValue}>-</Text>
            </View>
          </View>
          <View style={styles.magiasEmpty}>
            <Text style={styles.magiasEmptyText}>Este personagem não possui magias.</Text>
            {editMode && (
              <TouchableOpacity style={styles.addMagiaButton} onPress={() => Alert.alert("Adicionar Magias", "Funcionalidade a ser implementada.")}>
                <Text style={styles.addMagiaButtonText}>Adicionar Magias</Text>
              </TouchableOpacity>
            )}
          </View>
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
  ataquesTabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: "#007bff",
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  ataquesContent: {
    // Estilos para o conteúdo de ataques
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "#f0f0f0",
  },
  tableHeaderText: {
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
    color: "#333",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    alignItems: "center",
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
    fontSize: 14,
    color: "#333",
  },
  removeButton: {
    backgroundColor: "#dc3545",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 5,
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  addAtaqueForm: {
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  magiasContent: {
    // Estilos para o conteúdo de magias
  },
  magiasInfo: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  magiaStat: {
    alignItems: "center",
  },
  magiaStatLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  magiaStatValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  magiasEmpty: {
    alignItems: "center",
    paddingVertical: 30,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 8,
  },
  magiasEmptyText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 15,
  },
  addMagiaButton: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  addMagiaButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AtaquesMagiasSection;

