import AsyncStorage from "@react-native-async-storage/async-storage"; // Para armazenar os dados do token
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./auth"; // Para pegar os dados do usuário autenticado
import api from "../services/api"

export const SalaoContext = createContext({})

export const SalaoProvider = ({ children }) => {
  // Funções do context
  const [salao, setSalao] = useState(null) // Armazena se o usuário tem ou não um Salão
  const [userInfo, setUserInfo] = useState(null); // Armazena os dados do usuário

  // Salva Token e dados do usuário
  const salvaTokenAndDataUser = async (token, userInfo) => {
    await AsyncStorage.setItem("@userToken", token)
    await AsyncStorage.setItem("@userInfo", JSON.stringify(userInfo))
    setUserInfo(userInfo);
  }

  // Remove token e dados do usuario
  const removeTokenAndDataUser = async () => {
    await AsyncStorage.removeItem("@userToken");
    await AsyncStorage.removeItem("@userInfo");
    setUserInfo(null);
    setSalao(null)
  }

  // Verifica se o usuário tem um salão
  const verificaSalao = async () => {
    try {
      //Pegar o token que vem de usuario
      const token = await AsyncStorage.getItem("@userToken")

      if (!token) {
        return false; // Se não houver token, retorna falso
      }

      // Faz a requisição para o backend
      const response = await api.get('/api/verificar-salao', {
        headers: { Authorization: `Bearer ${token}` }
      })

      // verificação
      if (response.data.temSalao) {
        setSalao(true); // Usuário já tem salão
        return true;
      } else {
        setSalao(false); // Usuário não tem salão
        return false;
      }

    } catch (error) {
      console.error("Erro ao verificar salão:", error);
      return false;
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

      setSalao(response.data); // Atualiza o estado do salão

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
