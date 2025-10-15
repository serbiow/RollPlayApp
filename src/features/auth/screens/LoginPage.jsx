/**
 * @file LoginPage.jsx
 * @description Tela de login da aplicação React Native.
 * Apresenta um formulário de login e uma imagem de fundo com texto informativo.
 */

import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import LoginForm from '../../../components/auth/LoginForm';
// Importar Navbar e Footer adaptados para React Native
// import Navbar from '../../../components/global/Navbar';
// import Footer from '../../../components/global/Footer';

const LoginPage = () => {
    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {/* <Navbar /> */}
            <View style={styles.loginContainer}>
                <View style={styles.loginMain}>
                    <View style={styles.loginBox}>
                        <View style={styles.loginLeft}>
                            <ImageBackground
                                source={require('../../../assets/images/maga_estudando_background.png')} // Caminho da imagem adaptado
                                style={styles.loginHeroImage}
                                imageStyle={styles.loginHeroImageStyle}
                            >
                                <View style={styles.loginGradientOverlay}></View>
                                <View style={styles.loginImageText}>
                                    <Text style={styles.imageTitle}>SUA AVENTURA COMEÇA AQUI</Text>
                                    <Text style={styles.imageParagraph}>
                                        ROLL & PLAY É UMA PLATAFORMA GRATUITA PARA JOGADORES DE RPG DE MESA.
                                        CRIE PERSONAGENS, ORGANIZE SESSÕES E ROLE DADOS - TUDO EM UM SÓ LUGAR.
                                    </Text>
                                </View>
                            </ImageBackground>
                        </View>
                        <View style={styles.loginRight}>
                            <LoginForm />
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
    loginContainer: {
        flex: 1,
        width: '100%',
    },
    loginMain: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    loginBox: {
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
    loginLeft: {
        flex: 1,
        minHeight: 200, // Altura mínima para a imagem de fundo
    },
    loginHeroImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'flex-end',
        padding: 20,
    },
    loginHeroImageStyle: {
        borderRadius: 10, // Aplicar borda arredondada na imagem
    },
    loginGradientOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.4)', // Escurecer a imagem para melhor contraste do texto
        borderRadius: 10,
    },
    loginImageText: {
        zIndex: 1, // Garantir que o texto fique acima do overlay
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
    },
    loginRight: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
});

export default LoginPage;

