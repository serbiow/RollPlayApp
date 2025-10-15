/**
 * @file SheetPage.jsx
 * @description Tela de visualização e edição de ficha de personagem na aplicação React Native.
 * Permite ao usuário navegar entre diferentes seções da ficha (Visão Geral, Atributos, Perícias, etc.)
 * e editar os dados da ficha.
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';

// Importar Navbar e Footer adaptados para React Native
// import Navbar from '../../../components/global/Navbar';
// import Footer from '../../../components/global/Footer';
// Importar FichaHeader adaptado para React Native
// import FichaHeader from '../../../components/sheet/FichaHeader';

// Importar as seções da ficha adaptadas para React Native (placeholders por enquanto)
// import VisaoGeralSection from '../../../components/sheet/VisaoGeralSection';
// import AtributosSection from '../../../components/sheet/AtributosSection';
// import PericiasProficienciasSection from '../../../components/sheet/PericiasProficienciasSection';
// import AtaquesMagiasSection from '../../../components/sheet/AtaquesMagiasSection';
// import InventarioSection from '../../../components/sheet/InventarioSection';
// import HabilidadesSection from '../../../components/sheet/HabilidadesSection';
// import PersonalidadeSection from '../../../components/sheet/PersonalidadeSection';
// import AnotacoesSection from '../../../components/sheet/AnotacoesSection';

const SheetPage = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { characterId } = route.params; // Obtém o ID do personagem dos parâmetros de navegação

  const [characterData, setCharacterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState('visao-geral'); // Aba ativa por padrão
  const [mobileTabsOpen, setMobileTabsOpen] = useState(false); // Estado para o FAB de abas em mobile

  /**
   * @constant tabs
   * @description Definição das abas de navegação da ficha de personagem.
   */
  const tabs = [
    { id: 'visao-geral', label: 'Visão Geral', icon: '👁️' },
    { id: 'atributos', label: 'Atributos', icon: '💪' },
    { id: 'pericias', label: 'Perícias', icon: '🎯' },
    { id: 'ataques-magias', label: 'Ataques & Magias', icon: '⚔️' },
    { id: 'inventario', label: 'Inventário', icon: '🎒' },
    { id: 'habilidades', label: 'Habilidades', icon: '✨' },
    { id: 'personalidade', label: 'Traços & Origem', icon: '🎭' },
    { id: 'anotacoes', label: 'Anotações', icon: '📝' },
  ];

  /**
   * @function getAuthToken
   * @description Função placeholder para obter o token de autenticação.
   * Em uma aplicação real, isso seria implementado com AsyncStorage ou Context API.
   * @returns {string} O token de autenticação ou uma string placeholder.
   */
  const getAuthToken = () => {
    // Exemplo: return await AsyncStorage.getItem("authToken");
    return "YOUR_AUTH_TOKEN_HERE"; // Placeholder
  };

  useEffect(() => {
    /**
     * @function fetchCharacterData
     * @description Busca os dados da ficha de personagem com base no characterId.
     */
    const fetchCharacterData = async () => {
      const token = getAuthToken();
      if (!token || token === "YOUR_AUTH_TOKEN_HERE") {
        setError("Usuário não autenticado. Por favor, faça login.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          `http://localhost:5000/api/character/${characterId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (res.data.success) {
          setCharacterData(res.data.data);
        } else {
          setError(res.data.message || "Erro ao carregar ficha.");
        }
      } catch (err) {
        console.error("Erro ao buscar ficha:", err);
        setError(
          err.response?.data?.message ||
            "Erro de conexão. Tente novamente mais tarde."
        );
        if ([401, 403].includes(err.response?.status)) {
          Alert.alert("Erro", "Sessão expirada ou inválida. Por favor, faça login novamente.");
          navigation.navigate("Login");
        }
      } finally {
        setLoading(false);
      }
    };

    if (characterId) {
      fetchCharacterData();
    } else {
      setError("ID do personagem não fornecido.");
      setLoading(false);
    }
  }, [characterId, navigation]);

  /**
   * @function handleEditToggle
   * @description Alterna o modo de edição da ficha.
   * Se estiver saindo do modo de edição, tenta salvar as alterações.
   */
  const handleEditToggle = async () => {
    if (editMode) {
      // Se estava em modo de edição e clicou para salvar
      try {
        const token = getAuthToken();
        if (!token || token === "YOUR_AUTH_TOKEN_HERE") {
          Alert.alert("Erro", "Usuário não autenticado. Não foi possível salvar.");
          return;
        }
        // TODO: Implementar chamada de API para salvar characterData
        // const res = await axios.put(
        //   `http://localhost:5000/api/character/${characterId}`,
        //   characterData,
        //   { headers: { Authorization: `Bearer ${token}` } }
        // );
        // if (res.data.success) {
        //   Alert.alert("Sucesso", "Ficha salva com sucesso!");
        // } else {
        //   Alert.alert("Erro", res.data.message || "Falha ao salvar ficha.");
        // }
        Alert.alert("Salvar", "Funcionalidade de salvar ficha a ser implementada.");
      } catch (err) {
        console.error("Erro ao salvar ficha:", err);
        Alert.alert("Erro", err.response?.data?.message || "Erro ao salvar ficha.");
      }
    }
    setEditMode(!editMode);
  };

  /**
   * @function handleLocalUpdate
   * @description Atualiza os dados da ficha localmente no estado.
   * @param {object} updatedFields - Objeto com os campos a serem atualizados.
   */
  const handleLocalUpdate = (updatedFields) => {
    setCharacterData((prevData) => ({
      ...prevData,
      ...updatedFields,
    }));
  };

  /**
   * @function renderTabContent
   * @description Renderiza o conteúdo da aba ativa.
   * @returns {JSX.Element | null} O componente da aba selecionada ou null.
   */
  const renderTabContent = () => {
    if (!characterData) return null;

    switch (activeTab) {
      case 'visao-geral':
        return <Text>Visão Geral (a ser implementado)</Text>; // <VisaoGeralSection data={characterData.visaoGeral} editMode={editMode} onSave={(visaoGeral) => handleLocalUpdate({ visaoGeral })} />
      case 'atributos':
        return <Text>Atributos (a ser implementado)</Text>; // <AtributosSection atributos={characterData.atributos} pericias={characterData.pericias} nivel={characterData.nivel} editMode={editMode} onSaveAtributos={(atributos) => handleLocalUpdate({ atributos })} onSavePericias={(pericias) => handleLocalUpdate({ pericias })} />
      case 'pericias':
        return <Text>Perícias & Proficiências (a ser implementado)</Text>; // <PericiasProficienciasSection pericias={characterData.pericias} atributos={characterData.atributos} nivel={characterData.nivel} editMode={editMode} onSave={(pericias) => handleLocalUpdate({ pericias })} />
      case 'ataques-magias':
        return <Text>Ataques & Magias (a ser implementado)</Text>; // <AtaquesMagiasSection ataques={characterData.ataques} magias={characterData.magias} editMode={editMode} onSave={(data) => handleLocalUpdate(data)} />
      case 'inventario':
        return <Text>Inventário (a ser implementado)</Text>; // <InventarioSection inventario={characterData.inventario} editMode={editMode} onSave={(inventario) => handleLocalUpdate({ inventario })} />
      case 'habilidades':
        return <Text>Habilidades (a ser implementado)</Text>; // <HabilidadesSection habilidades={characterData.habilidades} editMode={editMode} onSave={(habilidades) => handleLocalUpdate({ habilidades })} />
      case 'personalidade':
        return <Text>Traços & Origem (a ser implementado)</Text>; // <PersonalidadeSection personalidade={characterData.personalidade} editMode={editMode} onSave={(personalidade) => handleLocalUpdate({ personalidade })} />
      case 'anotacoes':
        return <Text>Anotações (a ser implementado)</Text>; // <AnotacoesSection anotacoes={characterData.anotacoes} editMode={editMode} onSave={(anotacoes) => handleLocalUpdate({ anotacoes })} />
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando ficha...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!characterData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Ficha não encontrada ou dados indisponíveis.</Text>
      </View>
    );
  }

  return (
    <View style={styles.fichaPage}>
      {/* Navbar (comentado, pois será integrado via RootNavigator) */}
      {/* <Navbar /> */}

      {/* Cabeçalho da Ficha (placeholder) */}
      {/* <FichaHeader
        characterName={characterData.nome}
        characterClass={`${characterData.raca} ${characterData.classe} ${characterData.nivel}`}
        pvAtual={characterData.pvAtual}
        pvTotal={characterData.pvTotal}
        pvTemp={characterData.pvTemp}
        onEditToggle={handleEditToggle}
        editMode={editMode}
      /> */}
      <View style={styles.fichaHeaderPlaceholder}>
        <Text style={styles.fichaHeaderPlaceholderText}>FichaHeader Component (a ser implementado)</Text>
        <Text>Nome: {characterData.nome}</Text>
        <Text>Classe: {characterData.classe}</Text>
        <Text>Nível: {characterData.nivel}</Text>
        <TouchableOpacity onPress={handleEditToggle}>
          <Text style={{ color: 'blue' }}>{editMode ? 'Salvar' : 'Editar'}</Text>
        </TouchableOpacity>
      </View>

      {/* Abas de navegação da ficha */}
      <View style={styles.fichaTabs}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tabButton, activeTab === tab.id && styles.activeTabButton]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Text style={[styles.tabIcon, activeTab === tab.id && styles.activeTabIconText]}>{tab.icon}</Text>
            <Text style={[styles.tabLabel, activeTab === tab.id && styles.activeTabLabelText]}>{tab.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Mobile FAB (Floating Action Button) para abas - para telas menores */}
      <View style={styles.fabContainer}>
        <TouchableOpacity
          style={styles.fabToggle}
          onPress={() => setMobileTabsOpen(!mobileTabsOpen)}
        >
          <Text style={styles.fabToggleText}>☰</Text>
        </TouchableOpacity>
        {mobileTabsOpen && (
          <View style={styles.fabItemsContainer}>
            {tabs.map((tab, index) => (
              <TouchableOpacity
                key={tab.id}
                style={[styles.fabItem]} // transitionDelay não funciona em RN
                onPress={() => {
                  setActiveTab(tab.id);
                  setMobileTabsOpen(false);
                }}
              >
                <Text style={styles.fabIcon}>{tab.icon}</Text>
                <Text style={styles.fabLabel}>{tab.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Conteúdo da aba ativa */}
      <ScrollView style={styles.fichaContent}>
        {renderTabContent()}
      </ScrollView>

      {/* Footer (comentado, pois será integrado via RootNavigator) */}
      {/* <Footer /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  fichaPage: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  fichaHeaderPlaceholder: {
    backgroundColor: '#fff',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  fichaHeaderPlaceholderText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  fichaTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  activeTabButton: {
    backgroundColor: '#007bff',
  },
  tabIcon: {
    fontSize: 20,
    marginBottom: 5,
    color: '#333',
  },
  activeTabIconText: {
    color: '#fff',
  },
  tabLabel: {
    fontSize: 12,
    color: '#333',
  },
  activeTabLabelText: {
    color: '#fff',
  },
  fabContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 1000,
    alignItems: 'flex-end',
  },
  fabToggle: {
    backgroundColor: '#007bff',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  fabToggleText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  fabItemsContainer: {
    position: 'absolute',
    bottom: 70,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  fabItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 5,
    borderRadius: 5,
  },
  fichaContent: {
    flex: 1,
    padding: 15,
  },
});

export default SheetPage;

