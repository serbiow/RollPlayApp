/**
 * @file RegisterPage.jsx
 * @description Tela de registro da aplicação React Native.
 * Apresenta um formulário de registro e uma imagem de fundo com informações sobre os benefícios da plataforma.
 */

import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import RegisterForm from '../../../components/auth/RegisterForm';
// import Navbar from '../../../components/global/Navbar'; // Importar Navbar adaptado
// import Footer from '../../../components/global/Footer'; // Importar Footer adaptado
// lucide-react não é compatível com React Native diretamente, usar ícones RN ou texto simples

const RegisterPage = () => {
    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {/* <Navbar /> */}
            <View style={styles.registerContainer}>
                <View style={styles.registerMain}>
                    <View style={styles.registerBox}>
                        <View style={styles.registerLeft}>
                            <ImageBackground
                                source={require('../../../assets/images/group_image_background.webp')} // Caminho da imagem adaptado
                                style={styles.registerHeroImage}
                                imageStyle={styles.registerHeroImageStyle}
                            >
                                <View style={styles.registerGradientOverlay}></View>
                                <View style={styles.registerLeftText}>
                                    <Text style={styles.imageTitle}>SUA AVENTURA COMEÇA AQUI</Text>
                                    <Text style={styles.imageParagraph}>
                                        ROLL & PLAY É UMA PLATAFORMA GRATUITA PARA JOGADORES DE RPG DE MESA. CRIE PERSONAGENS, ORGANIZE SESSÕES E ROLE DADOS - TUDO EM UM SÓ LUGAR.
                                    </Text>
                                    <View style={styles.benefitsList}>
                                        <View style={styles.benefitItem}><Text style={styles.checkIcon}>✓</Text><Text style={styles.benefitText}>PLATAFORMA TOTALMENTE GRATUITA, SEM PREMIUM ESCONDIDO</Text></View>
                                        <View style={styles.benefitItem}><Text style={styles.checkIcon}>✓</Text><Text style={styles.benefitText}>SUPORTE PARA MÚLTIPLOS SISTEMAS</Text></View>
                                        <View style={styles.benefitItem}><Text style={styles.checkIcon}>✓</Text><Text style={styles.benefitText}>INTERFACE INTUITIVA</Text></View>
                                        <View style={styles.benefitItem}><Text style={styles.checkIcon}>✓</Text><Text style={styles.benefitText}>COMUNIDADE ATIVA E EM CRESCIMENTO</Text></View>
                                    </View>
                                </View>
                            </ImageBackground>
                        </View>
                        <View style={styles.registerRight}>
                            <RegisterForm />
                        </View>
                    </View>
                </View>
            </View>
            {/* <Footer /> */}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f2f5',
    },
    registerContainer: {
        flex: 1,
        width: '100%',
    },
    registerMain: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    registerBox: {
        flexDirection: 'column', // Em mobile, empilhar verticalmente
        width: '90%',
        maxWidth: 600, // Limitar largura para telas maiores
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 5, // Sombra para Android
        shadowColor: '#000', // Sombra para iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    registerLeft: {
        flex: 1,
        minHeight: 250, // Altura mínima para a imagem de fundo
    },
    registerHeroImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'flex-end',
        padding: 20,
    },
    registerHeroImageStyle: {
        borderRadius: 10,
    },
    registerGradientOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.4)', // Escurecer a imagem para melhor contraste do texto
        borderRadius: 10,
    },
    registerLeftText: {
        zIndex: 1,
    },
    imageTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
        textAlign: 'center',
    },
    imageParagraph: {
        fontSize: 14,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 20,
    },
    benefitsList: {
        marginTop: 10,
    },
    benefitItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    checkIcon: {
        color: '#32CD32', // Verde
        fontSize: 18,
        marginRight: 10,
        fontWeight: 'bold',
    },
    benefitText: {
        color: '#fff',
        fontSize: 14,
        flexShrink: 1,
    },
    registerRight: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
});

export default RegisterPage;

