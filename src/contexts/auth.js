import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Para armazenar os dados do token
import React, { createContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import api from "../services/api"

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  // Armazena os dados do USUÁRIO
  const [user, setUser] = useState(null)

  // Carregamento da página
  const [loading, setLoading] = useState(false)

  // Navegação
  const navigation = useNavigation();


  /////////////////////////////////////////////////////


  // Salva Token e dados do usuário
  const salvaTokenAndDataUser = async (token, userInfo) => {
    await AsyncStorage.setItem("@userToken", token)
    await AsyncStorage.setItem("@userInfo", JSON.stringify(userInfo))
    setUser(userInfo);
  }

  // Remove token e dados do usuario
  const removeTokenAndDataUser = async () => {
    await AsyncStorage.removeItem("@userToken");
    await AsyncStorage.removeItem("@userInfo");
    setUser(null);
  }

  // Function de LOGIN do usuario
  const login = async (email, senha) => {
    setLoading(true)

    try {
      // Faz uma requisição e busca os dados de email e senha
      const response = await api.post("/api/user/login", {
        email,
        senha,
      })

      // Verifica se os dados do usuario estão vindo corretamente
      if (!response.data) {
        Alert.alert("Erro: resposta sem dados");
        return null
      }

      // Coloca os dados dentro de loginDataUser 
      setUser(response.data)

      // Salva o token do usuário
      await salvaTokenAndDataUser(response.data.token, response.data)

      // Retorna os dados
      return response.data

    } catch (error) {
      console.log("Erro ao fazer login", error.response?.data || error.message);
      return null;
    } finally {
      setLoading(false)
    }
  }


  ///////////////////////////////////////////////////////////


  // Função de CRIAR USUÁRIO
  const cadastroNewUser = async (nome, email, senha, telefone) => {
    setLoading(true)

    try {
      let response = await api.post("/api/user", {
        nome,
        email,
        senha,
        telefone,
        foto: "https://robohash.org/wesley",
      })

      if (!response.data.token) {
        Alert.alert("Erro: Token não retornado no cadastro.");
        return null;
      }

      // Limpa qualquer dado anterior do AsyncStorage
      await removeTokenAndDataUser(response.data.token, response.data)

      // Salva o token e os dados do usuário no AsyncStorage
      await salvaTokenAndDataUser(response.data.token, response.data)

      // Atualiza o estado do usuário com os dados recebidos
      setUser(response.data)

      // Retorna os dados do novo usuário para quem chamou a função
      return response.data

    } catch (error) {
      console.log("Erro ao criar usuario")
    } finally {
      setLoading(false)
    }
  }


  //////////////////////////////////////////////////////////////////


  // Funcão de LOGOUT do sistema 
  const logout = async () => {
    try {
      // Limpa o AsyncStorage(remover o token)
      await AsyncStorage.removeItem("@userToken")

      // Limpa os dados de login e usuário
      setUser(null)

      // Retorna para página de LOGIN
      navigation.navigate("Login")

      Alert.alert("Você saiu da sua conta")

    } catch (error) {
      console.error("Erro ao sair da conta!", error)
    }
  }

  ////////////////////////////////////////////////////////

  const updateDataPerfil = async (updateData) => {
    try {
      // Pega o token no AsyncStorage para autenticar
      const token = await AsyncStorage.getItem("@userToken")

      // Enviando dados do USUÁRIO para atualização
      const response = await api.patch("/api/user/atualizar-perfil", updateData, {
        headers: {
          Authorization: `Bearer ${token}` // Adicionando o token ao cabeçalho
        }
      })

      // Atualiza o estado com os novos dados
      const newUserInfo = {
        ...user, // Mantém os dados antigos
        ...response.data, // Atualiza os novos dados recebidos
      }
      setUser(newUserInfo);

      // Atualiza os dados no AsyncStorage  
      await salvaTokenAndDataUser(token, newUserInfo)

    } catch (error) {
      console.error("Erro ao editar perfil", error)
    }
  }

  ///////////////////////////////////////////////////////////

  // Recupera token do AsyncStorage ao iniciar o app e persiste os dados.
  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("@userToken")
      const userInfoAsync = await AsyncStorage.getItem("@userInfo")

      if (token && userInfoAsync) {
        setUser(JSON.parse(userInfoAsync)) // Configura o estado com os dados armazenados
        navigation.navigate('Home');
      } else {
        // Caso contrário, navega para a tela de Login
        navigation.navigate('Login');
      }
    }

    checkToken()
  }, []) // Executa uma vez ao iniciar o app

  // Atualiza o ESTADO no AsyncStorage sempre que o usuario mudar
  useEffect(() => {
    const updateUserInfoStorage = async () => {
      if (user) {
        await salvaTokenAndDataUser(user.token, user)
      }
    }
    updateUserInfoStorage()
  }, [user]) // Executa sempre que user mudar


  return (
    <AuthContext.Provider value={{
      loading,
      cadastroNewUser,
      login,
      user, // Retorna o estado único do usuário
      setUser,
      logout,
      updateDataPerfil,
    }}>
      {children}
    </AuthContext.Provider >
  )
}
