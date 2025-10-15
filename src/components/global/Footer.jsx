/**
 * @file Footer.jsx
 * @description Componente de rodapé global para a aplicação React Native.
 * Exibe o logo da aplicação e informações de copyright.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Footer = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.footer}>
            <View style={styles.footerContainer}>
                {/* Logo da aplicação, navegável para a tela inicial */}
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.footerLogo}>Roll & Play</Text>
                </TouchableOpacity>
                {/* Texto de copyright */}
                <Text style={styles.footerText}>Copyright © 2025 Roll & Play Company, todos os direitos reservados.</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        backgroundColor: '#333',
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    footerContainer: {
        alignItems: 'center',
    },
    footerLogo: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    footerText: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'center',
    },
});

export default Footer;

