/**
 * @file Navbar.jsx
 * @description Componente de barra de navegação global para a aplicação React Native.
 * Inclui navegação para Home, Perfil, e botões condicionais para criação/entrada de sessão
 * ou autenticação (Login/Registro) dependendo do estado de login do usuário.
 */

import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
// Importar SessionModal e EnterSessionModal adaptados para React Native
// import SessionModal from "../../components/forms/SessionModal";
// import EnterSessionModal from "../../components/forms/EnterSessionModal";

const Navbar = () => {
    const navigation = useNavigation();
    const [menuOpen, setMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEnterModalOpen, setIsEnterModalOpen] = useState(false);

    // TODO: Implementar lógica de autenticação real para React Native (ex: AsyncStorage, Context API)
    // Por enquanto, isLoggedIn é um placeholder.
    const isLoggedIn = false; // Mudar para true para simular usuário logado

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <View style={styles.navbar}>
            {/* Logo da aplicação, navegável para a tela inicial */}
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <Text style={styles.navLogo}>Roll & Play</Text>
            </TouchableOpacity>

            {/* Botão de hambúrguer para menu mobile */}
            <TouchableOpacity style={styles.hamburger} onPress={() => setMenuOpen(!menuOpen)}>
                <View style={styles.bar}></View>
                <View style={styles.bar}></View>
                <View style={styles.bar}></View>
            </TouchableOpacity>

            {/* Links de navegação */}
            <View style={[styles.navLinks, menuOpen ? styles.navLinksOpen : {}]}>
                <TouchableOpacity
                    onPress={() => {
                        setMenuOpen(false);
                        navigation.navigate("Home");
                    }}
                >
                    <Text style={styles.navButtonText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setMenuOpen(false);
                        navigation.navigate("Profile");
                    }}
                >
                    <Text style={styles.navButtonText}>Perfil</Text>
                </TouchableOpacity>

                {/* Botões só aparecem se estiver logado */}
                {isLoggedIn && (
                    <>
                        <TouchableOpacity onPress={() => openModal()}>
                            <Text style={styles.navButtonText}>Criar Sessão</Text>
                        </TouchableOpacity>
                        {/* SessionModal precisa ser implementado como um componente React Native Modal */}
                        {/* <SessionModal isOpen={isModalOpen} onClose={closeModal} /> */}
                        <TouchableOpacity onPress={() => setIsEnterModalOpen(true)}>
                            <Text style={styles.navButtonText}>Entrar na Sessão</Text>
                        </TouchableOpacity>
                        {/* EnterSessionModal precisa ser implementado como um componente React Native Modal */}
                        {/* <EnterSessionModal
                            isOpen={isEnterModalOpen}
                            onClose={() => setIsEnterModalOpen(false)}
                        /> */}
                    </>
                )}

                {/* Botões de autenticação só aparecem se NÃO estiver logado */}
                {!isLoggedIn && (
                    <>
                        <TouchableOpacity
                            onPress={() => {
                                setMenuOpen(false);
                                navigation.navigate("Login");
                            }}
                            style={styles.btnOutline}
                        >
                            <Text style={styles.btnOutlineText}>Entrar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setMenuOpen(false);
                                navigation.navigate("Register");
                            }}
                            style={styles.btnPrimary}
                        >
                            <Text style={styles.btnPrimaryText}>Registrar</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    navbar: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: "#f8f8f8",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    navLogo: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
    },
    hamburger: {
        padding: 10,
    },
    bar: {
        width: 25,
        height: 3,
        backgroundColor: "#333",
        marginVertical: 4,
        borderRadius: 2,
    },
    navLinks: {
        // Estilos para o menu fechado ou desktop
        flexDirection: "row",
        alignItems: "center",
    },
    navLinksOpen: {
        // Estilos para o menu aberto (mobile)
        position: "absolute",
        top: 60, // Ajustar conforme a altura da navbar
        left: 0,
        right: 0,
        backgroundColor: "#f8f8f8",
        flexDirection: "column",
        padding: 20,
        zIndex: 1000,
    },
    navButtonText: {
        fontSize: 16,
        color: "#333",
        marginHorizontal: 10,
        paddingVertical: 5,
    },
    btnOutline: {
        borderWidth: 1,
        borderColor: "#007bff",
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    btnOutlineText: {
        color: "#007bff",
        fontSize: 16,
    },
    btnPrimary: {
        backgroundColor: "#007bff",
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    btnPrimaryText: {
        color: "#fff",
        fontSize: 16,
    },
});

export default Navbar;

