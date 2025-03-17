import AsyncStorage from "@react-native-async-storage/async-storage"; // Para armazenar os dados do token
import React, { createContext, useEffect, useState } from "react";
import api from "../services/api"

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  // Armazena dados do CADASTRO do novo usuário
  const [userInfo, setUserInfo] = useState({})

  // Armazena dados do LOGIN do usuário
  const [loginDataUser, setLoginDataUser] = useState({})

  // Carregamento da página
  const [loading, setLoading] = useState(false)



  // Function de LOGIN do usuario
  const login = async (email, senha) => {
    setLoading(true)

    try {
      // Faz uma requisição e busca os dados de email e senha
      const response = await api.post("/api/user/login", {
        email,
        senha,
      })

      console.log("Esses são os dados de login", response.data); // Debug

      // Coloca os dados dentro de loginDataUser 
      setLoginDataUser(response.data)

      // Salva o token localmente
      await AsyncStorage.setItem("@userToken", response.data.token)

      // Retorna os dados
      return response.data

    } catch (error) {
      console.log("Erro ao fazer login", error.response?.data || error.message);
      return null;
    } finally {
      setLoading(false)
    }
  }



  // Função de CRIAR USUÁRIO
  const cadastroNewUser = async (nome, email, senha, telefone) => {
    setLoading(true)

    try {
      let response = await api.post("/api/user", {
        nome,
        email,
        senha,
        telefone,
      })

      console.log("Esses são os dados do novo usuário", response.data); // Debug

      // Coloca os dados dentro de setUserInfo 
      setUserInfo(response.data)

      // Retorna os dados do novo usuário para quem chamou a função
      return response.data

    } catch (error) {
      console.log("Erro ao criar usuario")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{
      // Spinner de carregamento
      loading,
      // Função Cadastro
      cadastroNewUser,
      // Dados do login do usuário
      loginDataUser,
      // Função Login
      login,
      // Dados do novo usuário
      userInfo
    }}>
      {children}
    </AuthContext.Provider >
  )
}
