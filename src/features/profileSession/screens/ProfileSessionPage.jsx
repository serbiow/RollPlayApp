/**
 * @file ProfileSessionPage.jsx
 * @description Tela de detalhes da sessão de perfil na aplicação React Native.
 * Exibe informações da campanha e permite navegar entre diferentes abas (Chat, Jogadores, Sessões, Notas, Mapas, NPCs).
 */

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import axios from "axios";
// import Navbar from "../../../components/global/Navbar"; // Importar Navbar adaptado
// import Footer from "../../../components/global/Footer"; // Importar Footer adaptado

// Placeholder para os componentes das abas
const ChatTab = () => <Text>Chat Tab Content (a ser implementado)</Text>;
const PlayersTab = () => <Text>Players Tab Content (a ser implementado)</Text>;
const SessionsTab = () => <Text>Sessions Tab Content (a ser implementado)</Text>;
const NotesTab = () => <Text>Notes Tab Content (a ser implementado)</Text>;
const MapsTab = () => <Text>Maps Tab Content (a ser implementado)</Text>;
const NPCsTab = () => <Text>NPCs Tab Content (a ser implementado)</Text>;

const ProfileSessionPage = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { campaignUid } = route.params; // Obtém o campaignUid dos parâmetros da rota

  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("CHAT"); // Estado para controlar a aba ativa

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
     * @function fetchSession
     * @description Busca os dados da sessão de campanha com base no campaignUid.
     */
    const fetchSession = async () => {
      try {
        const token = getAuthToken();
        if (!token || token === "YOUR_AUTH_TOKEN_HERE") {
          Alert.alert("Erro", "Usuário não autenticado. Por favor, faça login.");
          navigation.navigate("Login"); // Redireciona para a tela de login
          return;
        }

        const res = await axios.get(
          `http://localhost:5000/api/campaign/info/${campaignUid}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.data.success) {
          setSessionData(res.data.data);
        } else {
          setError(res.data.message || "Falha ao carregar dados da sessão.");
        }
      } catch (err) {
        console.error("Erro ao buscar campanha:", err);
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
    fetchSession();
  }, [campaignUid, navigation]);

  /**
   * @function handleUpdateSessionData
   * @description Função para atualizar os dados da sessão (placeholder).
   * @param {object} updatedData - Os dados atualizados da sessão.
   */
  const handleUpdateSessionData = (updatedData) => {
    setSessionData((prevData) => ({ ...prevData, ...updatedData }));
    // TODO: Implementar chamada de API para persistir as mudanças
  };

  /**
   * @function renderTabContent
   * @description Renderiza o conteúdo da aba ativa.
   * @returns {JSX.Element} O componente da aba selecionada.
   */
  const renderTabContent = () => {
    // const campaignUid = sessionData?.uid; // Se necessário passar o UID para as abas
    switch (activeTab) {
      case "CHAT":
        return <ChatTab />; // <ChatTab campaignUid={campaignUid} />;
      case "JOGADORES":
        return <PlayersTab />; // <PlayersTab campaignUid={campaignUid} />;
      case "SESSÕES":
        return <SessionsTab />; // <SessionsTab campaignUid={campaignUid} />;
      case "NOTAS":
        return <NotesTab />; // <NotesTab campaignUid={campaignUid} />;
      case "MAPAS":
        return <MapsTab />; // <MapsTab campaignUid={campaignUid} />;
      case "NPCS":
        return <NPCsTab />; // <NPCsTab campaignUid={campaignUid} />;
      default:
        return <Text>Selecione uma aba</Text>;
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando sessão...</Text>
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

  if (!sessionData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Sessão não encontrada ou dados indisponíveis.</Text>
      </View>
    );
  }

  return (
    <View style={styles.profileSessionContainer}>
      {/* Navbar (comentado, pois será integrado via RootNavigator) */}
      {/* <Navbar /> */}
      <View style={styles.contentProfileSession}>
        {/* Sidebar com dados principais da sessão (placeholder) */}
        <View style={styles.sidebarProfileSession}>
          {/* Componente SessionInfo a ser implementado para exibir detalhes da sessão */}
          {/* <SessionInfo
            sessionData={sessionData}
            onUpdateSessionData={handleUpdateSessionData}
          /> */}
          <Text style={styles.sessionInfoPlaceholder}>SessionInfo Component (a ser implementado)</Text>
        </View>

        {/* Área principal com as abas de navegação e conteúdo */}
        <View style={styles.mainProfileSession}>
          {/* Navegação por abas (placeholder) */}
          {/* <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} /> */}
          <View style={styles.tabNavigationPlaceholder}>
            <TouchableOpacity onPress={() => setActiveTab("CHAT")} style={[styles.tabButton, activeTab === "CHAT" && styles.activeTabButton]}><Text style={[styles.tabButtonText, activeTab === "CHAT" && styles.activeTabButtonText]}>CHAT</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveTab("JOGADORES")} style={[styles.tabButton, activeTab === "JOGADORES" && styles.activeTabButton]}><Text style={[styles.tabButtonText, activeTab === "JOGADORES" && styles.activeTabButtonText]}>JOGADORES</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveTab("SESSÕES")} style={[styles.tabButton, activeTab === "SESSÕES" && styles.activeTabButton]}><Text style={[styles.tabButtonText, activeTab === "SESSÕES" && styles.activeTabButtonText]}>SESSÕES</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveTab("NOTAS")} style={[styles.tabButton, activeTab === "NOTAS" && styles.activeTabButton]}><Text style={[styles.tabButtonText, activeTab === "NOTAS" && styles.activeTabButtonText]}>NOTAS</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveTab("MAPAS")} style={[styles.tabButton, activeTab === "MAPAS" && styles.activeTabButton]}><Text style={[styles.tabButtonText, activeTab === "MAPAS" && styles.activeTabButtonText]}>MAPAS</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveTab("NPCS")} style={[styles.tabButton, activeTab === "NPCS" && styles.activeTabButton]}><Text style={[styles.tabButtonText, activeTab === "NPCS" && styles.activeTabButtonText]}>NPCS</Text></TouchableOpacity>
          </View>
          <View style={styles.tabContentProfileSession}>
            {renderTabContent()}
          </View>
        </View>
      </View>
      {/* Footer (comentado, pois será integrado via RootNavigator) */}
      {/* <Footer /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  profileSessionContainer: {
    flex: 1,
    backgroundColor: "#f0f2f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
  contentProfileSession: {
    flex: 1,
    flexDirection: "column", // Em mobile, sidebar e main empilham
  },
  sidebarProfileSession: {
    backgroundColor: "#fff",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  sessionInfoPlaceholder: {
    textAlign: "center",
    padding: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    color: "#666",
  },
  mainProfileSession: {
    flex: 1,
    padding: 15,
  },
  tabNavigationPlaceholder: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 15,
    paddingVertical: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  activeTabButton: {
    backgroundColor: "#007bff",
  },
  tabButtonText: {
    color: "#333",
    fontWeight: "bold",
  },
  activeTabButtonText: {
    color: "#fff",
  },
  tabContentProfileSession: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
});

export default ProfileSessionPage;

