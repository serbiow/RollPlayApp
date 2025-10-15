/**
 * @file HomePage.jsx
 * @description Tela inicial da aplicação React Native.
 * Apresenta uma seção de herói, informações sobre a plataforma, FAQs e uma chamada para ação.
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// Importar Navbar e Footer adaptados para React Native
// import Navbar from '../../../components/global/Navbar';
// import Footer from '../../../components/global/Footer';

const HomePage = () => {
    const navigation = useNavigation();

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {/* <Navbar /> */}
            <View style={styles.homeContainer}>
                {/* Seção Hero - Imagem de fundo com título e botão de CTA */}
                <ImageBackground
                    source={require('../../../assets/images/wizard_image.jpg')} // Caminho da imagem adaptado
                    style={styles.heroSection}
                    imageStyle={styles.heroImageStyle}
                >
                    <View style={styles.heroOverlay}></View>
                    <View style={styles.heroContent}>
                        <Text style={styles.heroTitle}>ROLL & PLAY</Text>
                        <Text style={styles.heroSubtitle}>Sua aventura começa aqui</Text>
                        <TouchableOpacity style={styles.heroButton} onPress={() => navigation.navigate('Register')}> {/* Adaptar rota */}
                            <Text style={styles.heroButtonText}>CRIAR CONTA GRATUITA</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>

                {/* Seção Sobre - Informações detalhadas sobre a plataforma */}
                <View style={styles.aboutSection}>
                    <View style={styles.aboutTextContent}>
                        <Text style={styles.sectionTitle}>O QUE É ROLL & PLAY?</Text>
                        <Text style={styles.paragraph}>
                            Roll & Play é uma plataforma inovadora dedicada a transformar a experiência de jogos de RPG de mesa, transformando-o em uma ferramenta poderosa para desenvolvimento de habilidades sociais, criativas e cognitivas. Com uma interface intuitiva e funcionalidades robustas, o Roll & Play facilita a criação de personagens, o agendamento de sessões, a comunicação entre participantes e muito mais — tudo em um só lugar.
                        </Text>
                        <Text style={styles.paragraph}>
                            Acreditamos no poder da narrativa para educar, engajar e conectar pessoas. Por isso, além de atender mestres e jogadores, nos dedicamos também a apoiar professores e instituições de ensino, oferecendo recursos que permitem transformar aulas em verdadeiras aventuras de aprendizado. No Roll & Play, jogamos para aprender e aprendemos jogando.
                        </Text>
                    </View>
                    <View style={styles.aboutFeatures}>
                        <View style={styles.aboutBadge}><Text style={styles.aboutBadgeText}>100% Gratuito</Text></View>
                        <Text style={styles.sectionTitle}>SOBRE O ROLL & PLAY</Text>
                        <View style={styles.aboutList}>
                            <Text style={styles.listItem}>• PLATAFORMA TOTALMENTE GRATUITA, SEM RECURSOS PREMIUM ESCONDIDOS</Text>
                            <Text style={styles.listItem}>• SUPORTE PARA MÚLTIPLOS SISTEMAS DE RPG, INCLUSIVE EDUCACIONAIS</Text>
                            <Text style={styles.listItem}>• INTERFACE INTUITIVA E FÁCIL DE USAR</Text>
                            <Text style={styles.listItem}>• COMUNIDADE ATIVA E EM CRESCIMENTO</Text>
                            <Text style={styles.listItem}>• ATUALIZAÇÕES REGULARES COM NOVAS FUNCIONALIDADES</Text>
                            <Text style={styles.listItem}>• FERRAMENTAS IDEAIS PARA USO EM AMBIENTES ESCOLARES E UNIVERSITÁRIOS</Text>
                            <Text style={styles.listItem}>• AUXILIA NO DESENVOLVIMENTO DE HABILIDADES SOCIOEMOCIONAIS E COGNITIVAS</Text>
                            <Text style={styles.listItem}>• ESTIMULA LEITURA, ESCRITA, ARGUMENTAÇÃO E PENSAMENTO ESTRATÉGICO EM SALA DE AULA</Text>
                        </View>
                        <TouchableOpacity style={styles.primaryButton} onPress={() => Alert.alert('Junte-se a nós', 'Funcionalidade a ser implementada')}> {/* Adaptar ação */}
                            <Text style={styles.primaryButtonText}>Junte-se a nós</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Seção de Perguntas Frequentes (FAQ) */}
                <View style={styles.faqSection}>
                    <Text style={styles.sectionTitle}>PERGUNTAS FREQUENTES</Text>
                    <View style={styles.faqGrid}>
                        <View style={styles.faqItem}>
                            <Text style={styles.faqQuestion}>O ROLL & PLAY É REALMENTE GRATUITO?</Text>
                            <Text style={styles.faqAnswer}>Sim, o roll & play é 100% gratuito. Não há recursos premium ou conteúdos para usuários pagantes. Nosso objetivo é tornar o rpg acessível a todos.</Text>
                        </View>
                        <View style={styles.faqItem}>
                            <Text style={styles.faqQuestion}>POSSO USAR O ROLL & PLAY NO CELULAR?</Text>
                            <Text style={styles.faqAnswer}>Sim, o roll & play é totalmente responsivo e funciona em qualquer dispositivo: desktop, móveis, tablets e consoles. Você pode acessar suas fichas e sessões de qualquer lugar.</Text>
                        </View>
                        <View style={styles.faqItem}>
                            <Text style={styles.faqQuestion}>QUAIS SISTEMAS DE RPG SÃO SUPORTADOS?</Text>
                            <Text style={styles.faqAnswer}>Atualmente, o roll & play oferece suporte exclusivo ao sistemas d&d 5e (e 5.5e). No entanto, nosso objetivo é expandir para outros sistemas populares, além de permitir a criação de fichas personalizadas para tais sistemas.</Text>
                        </View>
                        <View style={styles.faqItem}>
                            <Text style={styles.faqQuestion}>COMO FAÇO PARA CONVIDAR MEUS AMIGOS PARA UMA SESSÃO?</Text>
                            <Text style={styles.faqAnswer}>Ao criar uma sessão, você receberá um link de convite que pode ser compartilhado com seus amigos. Eles precisarão ter uma conta no roll & play para participar.</Text>
                        </View>
                        <View style={styles.faqItem}>
                            <Text style={styles.faqQuestion}>PRECISO CRIAR UMA CONTA PARA USAR?</Text>
                            <Text style={styles.faqAnswer}>Sim, é necessário criar uma conta para acessar as funcionalidades do roll & play. O registro é rápido e gratuito, e só pedimos informações essenciais.</Text>
                        </View>
                        <View style={styles.faqItem}>
                            <Text style={styles.faqQuestion}>VOCÊS TÊM PLANOS PARA ADICIONAR NOVAS FUNCIONALIDADES?</Text>
                            <Text style={styles.faqAnswer}>Absolutamente! Estamos constantemente trabalhando em novas funcionalidades e melhorias com base no feedback da comunidade. Fique atento às atualizações!</Text>
                        </View>
                    </View>
                </View>

                {/* Seção CTA (Call to Action) - Incentivo para o usuário se juntar */}
                <View style={styles.ctaSection}>
                    <Text style={styles.ctaTitle}>PRONTO PARA COMEÇAR SUA AVENTURA?</Text>
                    <Text style={styles.ctaSubtitle}>JUNTE-SE A CENTENAS DE JOGADORES DE RPG QUE JÁ ESTÃO USANDO O ROLL & PLAY PARA SUAS CAMPANHAS.</Text>
                    <View style={styles.ctaButtons}>
                        <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('Register')}> {/* Adaptar rota */}
                            <Text style={styles.primaryButtonText}>Criar conta gratuita</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.secondaryButton} onPress={() => Alert.alert('Saiba mais', 'Funcionalidade a ser implementada')}> {/* Adaptar ação */}
                            <Text style={styles.secondaryButtonText}>Saiba mais</Text>
                        </TouchableOpacity>
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
        backgroundColor: '#f0f2f5',
    },
    homeContainer: {
        flex: 1,
        width: '100%',
    },
    heroSection: {
        width: '100%',
        height: 400,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heroImageStyle: {
        resizeMode: 'cover',
    },
    heroOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    heroContent: {
        alignItems: 'center',
        zIndex: 1,
    },
    heroTitle: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    heroSubtitle: {
        fontSize: 24,
        color: '#fff',
        marginBottom: 30,
    },
    heroButton: {
        backgroundColor: '#007bff',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 5,
    },
    heroButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    aboutSection: {
        padding: 20,
        backgroundColor: '#fff',
        flexDirection: 'column',
    },
    aboutTextContent: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
        textAlign: 'center',
    },
    paragraph: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
        lineHeight: 24,
    },
    aboutFeatures: {
        alignItems: 'center',
    },
    aboutBadge: {
        backgroundColor: '#28a745',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 20,
        marginBottom: 10,
    },
    aboutBadgeText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    aboutList: {
        marginTop: 10,
        marginBottom: 20,
    },
    listItem: {
        fontSize: 16,
        color: '#666',
        marginBottom: 5,
    },
    primaryButton: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 5,
        marginTop: 10,
    },
    primaryButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    faqSection: {
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    faqGrid: {
        marginTop: 20,
    },
    faqItem: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
    },
    faqQuestion: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    faqAnswer: {
        fontSize: 16,
        color: '#666',
        lineHeight: 22,
    },
    ctaSection: {
        padding: 30,
        backgroundColor: '#333',
        alignItems: 'center',
    },
    ctaTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
        textAlign: 'center',
    },
    ctaSubtitle: {
        fontSize: 16,
        color: '#ccc',
        marginBottom: 20,
        textAlign: 'center',
    },
    ctaButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
    },
    secondaryButton: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#fff',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 5,
        marginLeft: 10,
    },
    secondaryButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default HomePage;

