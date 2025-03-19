import { useNavigation } from "@react-navigation/native";
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

  // Navegação
  const navigation = useNavigation();





  // Function de LOGIN do usuario
  const login = async (email, senha) => {
    setLoading(true)

    try {
      // Faz uma requisição e busca os dados de email e senha
      const response = await api.post("/api/user/login", {
        email,
        senha,
      })

      console.log(response.data);


      // Verifica se os dados do usuario estão vindo corretamente
      if (!response.data) {
        console.log("Erro: resposta sem dados");
      }

      // Coloca os dados dentro de loginDataUser 
      setLoginDataUser(response.data)

      // Salva o token do usuário
      await AsyncStorage.setItem("@userToken", response.data.token)
      // Salva os dados do usuário
      const userLocalStorage = await AsyncStorage.setItem("@userInfo", JSON.stringify(response.data))

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

  // Funcão de LOGOUT do sistema 
  const logout = async () => {
    try {
      // Lima o AsyncStorage(remover o token)
      await AsyncStorage.removeItem("@userToken")

      // Limpa os dados de login e usuário
      setLoginDataUser({})
      setUserInfo({})
    } catch (error) {
      console.error("Erro ao sair da conta!", error)
    }
  }

  // Recupera token do AsyncStorage ao iniciar o app e perciste os dados.
  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("@userToken")
      const userInfoAsync = await AsyncStorage.getItem("@userInfo")

      console.log("Token recuperado do AsyncStorage", token);
      console.log("Dados do usuário recuperados do AsyncStorage", userInfoAsync);

      if (token && userInfoAsync) {
        //Se existir token e os dados do usuário, configura o estado com os dados armazendos.
        setLoginDataUser({ token })
        setUserInfo(JSON.parse(userInfoAsync)) // Muda o json de volta pra objeto
        // Navega para a tela principal (Home)
        navigation.navigate('Home');
      } else {
        // Caso contrário, navega para a tela de Login
        navigation.navigate('Login');
      }
    }

    checkToken()
  }, []) // Executa uma vez ao iniciar o app


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
      userInfo,
      // Função sair do sistema
      logout
    }}>
      {children}
    </AuthContext.Provider >
  )
}
