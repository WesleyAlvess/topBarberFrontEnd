import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Para armazenar os dados do token
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./auth"; // Para pegar os dados do usuário autenticado
import api from "../services/api"

export const SalaoContext = createContext({})

export const SalaoProvider = ({ children }) => {
  const navigation = useNavigation() // Navegação
  const { userInfo } = useContext(AuthContext) // Pegando os dados do usuário logado
  const [salao, setSalao] = useState(null)
  const [loading, setLoading] = useState(false)

  // Função para buscar os dados do salão do usuario logado
  const criarSalao = async (dadosSalao) => {
    setLoading(true)
    try {
      // Pega o token no AsyncStorage para autenticar
      const token = await AsyncStorage.getItem("@userToken")
      console.log(token);

      if (!token || !userInfo?._id) {
        return console.log("Token ou ID de usuário não encontrado.");
      }

      // Verificando se o usuário é "profissional"
      if (userInfo.tipo === "profissional") {
        navigation.navigate("HomeSalao")
      }

      // Fazendo requisição e enviando o token
      const response = await api.post("/api", dadosSalao, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      // Depois que criar o salao redireciona ele
      navigation.navigate("HomeSalao")


      // // Salva o token e os dados do usuario e do salão no AsyncStorage
      // await AsyncStorage.setItem("@userToken", response.data.token)
      // await AsyncStorage.setItem("@userInfo", JSON.stringify(response.data))

      console.log(response.data);
      return response.data



    } catch (error) {
      console.error("Erro ao buscar salão:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SalaoContext.Provider value={{
      // Função de criar salão
      criarSalao,
      // Carregamento
      loading,
    }}
    >
      {children}
    </SalaoContext.Provider>
  )

}
