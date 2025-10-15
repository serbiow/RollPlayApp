import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ScrollView } from "react-native";

const InventarioSection = ({ inventario, editMode, onSave }) => {
  const [novoItem, setNovoItem] = useState({ nome: "", quantidade: "1", peso: "0" });

  const calcularPesoTotal = () => {
    return inventario.reduce((total, item) => total + (Number.parseFloat(item.peso) || 0) * (Number.parseInt(item.quantidade) || 0), 0);
  };

  const handleAddItem = () => {
    if (novoItem.nome) {
      const updatedInventario = [
        ...inventario,
        {
          ...novoItem,
          quantidade: Number.parseInt(novoItem.quantidade) || 1,
          peso: Number.parseFloat(novoItem.peso) || 0,
        },
      ];
      onSave(updatedInventario);
      setNovoItem({ nome: "", quantidade: "1", peso: "0" });
    } else {
      Alert.alert("Erro", "Por favor, insira o nome do item.");
    }
  };

  const handleRemoveItem = (index) => {
    const updatedInventario = inventario.filter((_, i) => i !== index);
    onSave(updatedInventario);
  };

  const handleItemChange = (name, value) => {
    setNovoItem({ ...novoItem, [name]: value });
  };

  const handleQuantidadeChange = (index, newQuantidade) => {
    if (editMode) {
      const updatedInventario = [...inventario];
      updatedInventario[index].quantidade = Number.parseInt(newQuantidade) || 1;
      onSave(updatedInventario);
    }
  };

  return (
    <View style={styles.sectionCard}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionIcon}>🎒</Text>
        <Text style={styles.sectionTitle}>Inventário</Text>
      </View>

      <View style={styles.inventarioSummary}>
        <View style={styles.pesoTotal}>
          <Text style={styles.pesoTotalText}>Peso Total: </Text>
          <Text style={styles.pesoValor}>{calcularPesoTotal().toFixed(1)} kg</Text>
        </View>
        <View style={styles.moedas}>
          <View style={styles.moeda}>
            <Text style={styles.moedaIcon}>🥇</Text>
            <Text style={styles.moedaLabel}>PO: </Text>
            <Text style={styles.moedaValor}>75</Text>
          </View>
          <View style={styles.moeda}>
            <Text style={styles.moedaIcon}>🥈</Text>
            <Text style={styles.moedaLabel}>PP: </Text>
            <Text style={styles.moedaValor}>32</Text>
          </View>
          <View style={styles.moeda}>
            <Text style={styles.moedaIcon}>🥉</Text>
            <Text style={styles.moedaLabel}>PC: </Text>
            <Text style={styles.moedaValor}>15</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.inventarioList}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Item</Text>
          <Text style={styles.tableHeaderText}>Qtd</Text>
          <Text style={styles.tableHeaderText}>Peso</Text>
          {editMode && <Text style={styles.tableHeaderText}>Ações</Text>}
        </View>
        {inventario.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{item.nome}</Text>
            <View style={styles.tableCell}>
              {editMode ? (
                <TextInput
                  style={styles.quantidadeInput}
                  onChangeText={(text) => handleQuantidadeChange(index, text)}
                  value={String(item.quantidade)}
                  keyboardType="numeric"
                  min="1"
                />
              ) : (
                <Text>{item.quantidade}</Text>
              )}
            </View>
            <Text style={styles.tableCell}>{item.peso} kg</Text>
            {editMode && (
              <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveItem(index)}>
                <Text style={styles.removeButtonText}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>

      {editMode && (
        <View style={styles.addItemForm}>
          <Text style={styles.formTitle}>Adicionar Item</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome do Item"
            value={novoItem.nome}
            onChangeText={(text) => handleItemChange("nome", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Qtd"
            value={novoItem.quantidade}
            onChangeText={(text) => handleItemChange("quantidade", text)}
            keyboardType="numeric"
            min="1"
          />
          <TextInput
            style={styles.input}
            placeholder="Peso (kg)"
            value={novoItem.peso}
            onChangeText={(text) => handleItemChange("peso", text)}
            keyboardType="numeric"
            step="0.1"
            min="0"
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
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
  inventarioSummary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  pesoTotal: {
    flexDirection: "row",
    alignItems: "center",
  },
  pesoTotalText: {
    fontSize: 16,
    color: "#333",
  },
  pesoValor: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007bff",
  },
  moedas: {
    flexDirection: "row",
  },
  moeda: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
  },
  moedaIcon: {
    fontSize: 18,
    marginRight: 5,
  },
  moedaLabel: {
    fontSize: 14,
    color: "#666",
  },
  moedaValor: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  inventarioList: {
    maxHeight: 200, // Limitar altura para rolagem
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
  quantidadeInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 5,
    textAlign: "center",
    width: 50,
    alignSelf: "center",
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
  addItemForm: {
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
});

export default InventarioSection;

