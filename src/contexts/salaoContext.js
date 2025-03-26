import AsyncStorage from "@react-native-async-storage/async-storage"; // Para armazenar os dados do token
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./auth"; // Para pegar os dados do usuário autenticado
import api from "../services/api"

export const SalaoContext = createContext({})

export const SalaoProvider = ({ children }) => {
  // Funções do context
  const { userInfo, setUserInfo } = useContext(AuthContext);
  const [salao, setSalao] = useState(null) // Armazena se o usuário tem ou não um Salão
  const [infoSalao, setInfoSalao] = useState({})

  // Verifica se o salão existe quando o componente for montado
  const verificaSalao = async () => {
    try {
      //Pegar o token que vem de usuario
      const token = await AsyncStorage.getItem("@userToken")
      const dataUser = await AsyncStorage.getItem("@userInfo")

      if (!token) {
        return false // Se não houver token, não tem salão
      }

      // Faz a requisição para o backend
      const response = await api.get('/api/verificar-salao', {
        headers: { Authorization: `Bearer ${token}` }
      })

      // Verifica se a resposta indica que o usuário já tem um salão
      if (response === true) {
        setSalao(false) // Não permite a criação pois o usuario ja tem um salao
        return false
      }

      if (response === false) {
        setSalao(true) // Permite o usuario criar um salao
        return true
      }

      setUserInfo(dataUser)

    } catch (error) {
      console.error("Erro ao verificar salão:", error);
    }

  }

  // Cria salão
  const criarSalao = async (dadosSalao) => {
    try {
      // Pegar o token do usuário
      const token = await AsyncStorage.getItem("@userToken")

      // Verificar se o token existe
      if (!token) {
        console.error("Token não encontrado");
        return
      }

      // Fazer a requicição para o backend, mandando o token no cabeçalho
      const response = await api.post("/api", dadosSalao, {
        headers: { Authorization: `Bearer ${token}` }
      })

      // Atualizar o estado armazenando as informações do salão
      setInfoSalao(response.data)

      // Retornar o salao criado
      return response.data

    } catch (error) {
      console.error("Erro ao criar Salão", error)
    }
  }

  return (
    <SalaoContext.Provider value={{
      salao,
      setSalao,
      verificaSalao,
      criarSalao,
    }}
    >{children}</SalaoContext.Provider>
  )

}
