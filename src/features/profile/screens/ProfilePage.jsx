/**
 * @file ProfilePage.jsx
 * @description Tela de perfil do usuário na aplicação React Native.
 * Exibe informações do perfil, fichas de personagem e sessões do usuário.
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
// Importar Navbar e Footer adaptados para React Native
// import Navbar from '../../../components/global/Navbar';
// import Footer from '../../../components/global/Footer';
import SessionModal from '../../../components/forms/SessionModal';
import EnterSessionModal from '../../../components/forms/EnterSessionModal';

const ProfilePage = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [loadingCharacters, setLoadingCharacters] = useState(true);
  const [errorCharacters, setErrorCharacters] = useState('');
  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);
  const [isEnterSessionModalOpen, setIsEnterSessionModalOpen] = useState(false);

  /**
   * @function getAuthToken
   * @description Função placeholder para obter o token de autenticação.
   * Em uma aplicação real, isso seria implementado com AsyncStorage ou Context API.
   * @returns {string} O token de autenticação ou uma string placeholder.
   */
  const getAuthToken = () => {
    // Exemplo: return await AsyncStorage.getItem('authToken');
    return 'YOUR_AUTH_TOKEN_HERE'; // Placeholder
  };

  useEffect(() => {
    /**
     * @function fetchProfileData
     * @description Busca os dados do perfil do usuário e suas campanhas.
     */
    const fetchProfileData = async () => {
      const token = getAuthToken();
      if (!token || token === 'YOUR_AUTH_TOKEN_HERE') {
        setError('Usuário não autenticado.');
        setLoading(false);
        setLoadingCharacters(false);
        return;
      }

      try {
        // Busca dados do usuário
        const userRes = await axios.get('http://localhost:5000/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(userRes.data.user);

        // Busca campanhas do usuário
        const campaignsRes = await axios.get('http://localhost:5000/api/campaign/userCampaigns', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCampaigns(campaignsRes.data.campaigns || []);

        setLoading(false);
      } catch (err) {
        console.error('Erro ao carregar dados do perfil:', err);
        setError(err.response?.data?.message || 'Falha ao carregar dados do perfil.');
        setLoading(false);
      }
    };

    /**
     * @function fetchCharactersData
     * @description Busca as fichas de personagem do usuário.
     */
    const fetchCharactersData = async () => {
      const token = getAuthToken();
      if (!token || token === 'YOUR_AUTH_TOKEN_HERE') {
        setErrorCharacters('Usuário não autenticado.');
        setLoadingCharacters(false);
        return;
      }

      try {
        const charactersRes = await axios.get('http://localhost:5000/api/character/userSheets', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCharacters(charactersRes.data.result || []);
        setLoadingCharacters(false);
      } catch (err) {
        console.error('Erro ao carregar personagens:', err);
        setErrorCharacters(err.response?.data?.message || 'Falha ao carregar personagens.');
        setLoadingCharacters(false);
      }
    };

    fetchProfileData();
    fetchCharactersData();
  }, []);

  /**
   * @function handleCreateCharacter
   * @description Lida com a ação de criar um novo personagem.
   */
  const handleCreateCharacter = () => {
    Alert.alert('Criar Personagem', 'Funcionalidade de criação de personagem a ser implementada.');
    // navigation.navigate('CreateSheet'); // Exemplo de navegação para tela de criação de ficha
  };

  /**
   * @function handleLogout
   * @description Lida com a ação de logout do usuário.
   */
  const handleLogout = () => {
    // TODO: Implementar lógica de logout para React Native (ex: remover token do AsyncStorage)
    Alert.alert("Logout", "Funcionalidade de logout a ser implementada.");
    navigation.navigate("Login"); // Redireciona para a tela de login
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando perfil...</Text>
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

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      {/* Navbar (comentado, pois será integrado via RootNavigator) */}
      {/* <Navbar /> */}
      <View style={styles.profileContainer}>
        {/* Seção de cabeçalho do perfil com informações do usuário */}
        <View style={styles.profileHeader}>
          <Image
            source={userData?.profilePictureUrl ? { uri: userData.profilePictureUrl } : require('../../../assets/images/default-profile-img.png')}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>{userData?.displayName || 'Usuário'}</Text>
          <Text style={styles.profileEmail}>{userData?.email}</Text>
          <TouchableOpacity style={styles.editProfileButton} onPress={() => Alert.alert('Editar Perfil', 'Funcionalidade de edição de perfil a ser implementada.')}>
            <Text style={styles.editProfileButtonText}>EDITAR PERFIL</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>SAIR</Text>
          </TouchableOpacity>
        </View>

        {/* Seção de Campanhas do Usuário */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SUAS CAMPANHAS</Text>
          <View style={styles.sectionDivider}></View>
          <View style={styles.campaignsGrid}>
            {campaigns.length === 0 ? (
              <Text>Você ainda não criou nenhuma campanha.</Text>
            ) : (
              campaigns.map((c) => (
                <TouchableOpacity
                  key={c.id}
                  onPress={() => navigation.navigate('ProfileSession', { campaignId: c.id })} // Navega para a tela de sessão do perfil
                  style={styles.campaignCard}
                >
                  <View style={styles.campaignImageContainer}>
                    <Image
                      source={c.imageUrl ? { uri: c.imageUrl } : require('../../../assets/images/default-campaign-img.png')}
                      style={styles.campaignImage}
                    />
                  </View>
                  <View style={styles.campaignInfo}>
                    <Text style={styles.campaignName}>{c.sessionName}</Text>
                    <Text style={styles.campaignDetail}>SISTEMA: {c.system}</Text>
                    <Text style={styles.campaignDetail}>
                      {c.playersCount} / {c.maxPlayers} JOGADORES •{' '}
                      {c.isActive ? 'ATIVA' : 'INATIVA'}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </View>
          <TouchableOpacity
            style={styles.createCampaignButton}
            onPress={() => setIsSessionModalOpen(true)} // Abre o modal de criação de sessão
          >
            <Text style={styles.createCampaignButtonText}>CRIAR NOVA CAMPANHA</Text>
          </TouchableOpacity>
        </View>

        {/* Seção de Personagens do Usuário */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SEUS PERSONAGENS</Text>
          <View style={styles.sectionDivider}></View>
          {loadingCharacters ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#0000ff" />
            </View>
          ) : errorCharacters ? (
            <Text style={styles.errorText}>{errorCharacters}</Text>
          ) : (
            <>
              <View style={styles.charactersGrid}>
                {characters.length === 0 ? (
                  <Text>Você ainda não criou nenhum personagem.</Text>
                ) : (
                  characters.map((char) => (
                    <TouchableOpacity
                      key={char.id}
                      onPress={() => navigation.navigate('Sheet', { characterId: char.id })} // Navega para a tela da ficha de personagem
                      style={styles.characterCard}
                    >
                      <View style={styles.characterImageContainer}>
                        <Image
                          source={char.imageUrl ? { uri: char.imageUrl } : require('../../../assets/images/sheet-generic-img.png')}
                          style={styles.characterImage}
                        />
                      </View>
                      <View style={styles.characterInfo}>
                        <Text style={styles.characterName}>{char.nome || 'SEM NOME'}</Text>
                        <Text style={styles.characterDetail}>{(char.raca || 'RAÇA')} {char.class || 'CLASSE'}</Text>
                        <Text style={styles.characterDetail}>NÍVEL {char.level || 1}</Text>
                      </View>
                    </TouchableOpacity>
                  ))
                )}
              </View>
              <TouchableOpacity
                style={styles.createCharacterButton}
                onPress={handleCreateCharacter} // Abre a funcionalidade de criação de personagem
              >
                <Text style={styles.createCharacterButtonText}>CRIAR NOVO PERSONAGEM</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* Seção de Próximas Sessões (Exemplo estático) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PRÓXIMAS SESSÕES</Text>
          <View style={styles.sectionDivider}></View>
          <View style={styles.sessionsList}>
            {/* TODO: Mapear sessões do usuário dinamicamente */}
            <View style={styles.sessionCard}>
              <View style={styles.sessionDate}>
                <Text style={styles.dateNumber}>28</Text>
                <Text style={styles.dateMonth}>JUN</Text>
              </View>
              <View style={styles.sessionInfo}>
                <Text style={styles.sessionTitle}>DIA D - RPG DO ORGULHO #SESSÃO 10</Text>
                <Text style={styles.sessionTime}>SÁBADO • 19:00 - 23:00</Text>
                <View style={styles.playersConfirmed}>
                  <View style={styles.playerAvatars}>
                    <Text style={styles.playerAvatar}>A</Text>
                    <Text style={styles.playerAvatar}>B</Text>
                    <Text style={styles.playerAvatar}>C</Text>
                    <Text style={styles.playerAvatar}>D</Text>
                  </View>
                  <Text style={styles.playersCountText}>4 JOGADORES CONFIRMADOS</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      {/* Footer (comentado, pois será integrado via RootNavigator) */}
      {/* <Footer /> */}
      <SessionModal
        isOpen={isSessionModalOpen}
        onClose={() => setIsSessionModalOpen(false)}
      />
      <EnterSessionModal
        isOpen={isEnterSessionModalOpen}
        onClose={() => setIsEnterSessionModalOpen(false)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    backgroundColor: '#f0f2f5',
    paddingBottom: 20,
  },
  profileContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
  profileHeader: {
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#007bff',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  editProfileButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  editProfileButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  section: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  sectionDivider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 10,
  },
  campaignsGrid: {
    flexDirection: 'column',
    // justifyContent: 'space-around', // Pode ser ajustado para mais colunas em telas maiores
  },
  campaignCard: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  campaignImageContainer: {
    width: 100,
    height: 100,
  },
  campaignImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  campaignInfo: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  campaignName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  campaignDetail: {
    fontSize: 14,
    color: '#666',
  },
  createCampaignButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 15,
  },
  createCampaignButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  charactersGrid: {
    flexDirection: 'column',
  },
  characterCard: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  characterImageContainer: {
    width: 100,
    height: 100,
  },
  characterImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  characterInfo: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  characterName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  characterDetail: {
    fontSize: 14,
    color: '#666',
  },
  createCharacterButton: {
    backgroundColor: '#17a2b8',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 15,
  },
  createCharacterButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sessionsList: {
    // Estilos para a lista de sessões
  },
  sessionCard: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  sessionDate: {
    backgroundColor: '#007bff',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateNumber: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  dateMonth: {
    color: '#fff',
    fontSize: 14,
  },
  sessionInfo: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  sessionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  sessionTime: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  playersConfirmed: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playerAvatars: {
    flexDirection: 'row',
  },
  playerAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    fontSize: 12,
    marginRight: -5, // Sobrepor avatares
    borderWidth: 1,
    borderColor: '#fff',
  },
  playersCountText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 10,
  },
});

export default ProfilePage;

