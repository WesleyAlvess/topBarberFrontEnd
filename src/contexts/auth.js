import AsyncStorage from "@react-native-async-storage/async-storage"; // Para armazenar os dados do token
import React, { createContext, useEffect, useState } from "react";
import { createNewUser } from "../functions/Register"
import { loginUser } from "../functions/Login"

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  // Armazena dados do CADASTRO do novo usuário
  const [userInfo, setUserInfo] = useState({})

  // Armazena dados do LOGIN do usuário
  const [loginDataUser, setLoginDataUser] = useState({})

  // Carregamento da página
  const [loading, setLoading] = useState(false)



  // Function de login do usuario
  const login = async (email, senha) => {
    setLoading(true)
    try {
      // Faz uma requisição e busca os dados de email e senha
      let userInfo = await loginUser(email, senha)

      // Coloca os dados dentro de loginDataUser 
      setLoginDataUser(userInfo)


      console.log("Usuário logado:", userInfo);

    } catch (error) {
      console.log("Erro ao fazer login")
      setLoading(false)
    }
  }

  // Chama a função loginUser 
  const cadastroNewUser = async (nome, email, senha, telefone) => {
    setLoading(true)
    try {
      let userInfo = await createNewUser(nome, email, senha, telefone)
      setUserInfo(userInfo)
      // AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
      // setLoading(false)
      console.log("Novo usuário cadastrado:", userInfo);
    } catch (error) {
      console.log("Erro ao criar usuario")
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
