import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Para armazenar os dados do token
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./auth"; // Para pegar os dados do usuário autenticado
import api from "../services/api"

export const SalaoContext = createContext({})

export const SalaoProvider = ({ children }) => {
  const navigation = useNavigation() // Navegação
  const { userInfo, setUserInfo } = useContext(AuthContext) // Pegando os dados do usuário logado
  const [salao, setSalao] = useState(null)
  const [loading, setLoading] = useState(false)


  // Função para buscar os dados do salão do usuario logado
  const criarSalao = async (dadosSalao) => {
    setLoading(true)
    try {
      // Pega o token no AsyncStorage
      const token = await AsyncStorage.getItem("@userToken")

      // Pega o ID do usuário logado
      const donoSalao = userInfo?._id

      if (!token || !donoSalao) {
        console.log("Token ou ID de usuário não encontrado.");
        return
      }

      // Verificando se o usuário já tem um salão
      if (userInfo.tipo === "profissional") {
        console.log("Usuário já tem um salão!");
        return navigation.navigate("HomeSalao"); // Redireciona direto
      }


      // Fazendo requisição para criar o salão
      const response = await api.post("/api", dadosSalao, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Salão criado:", response.data);

      // Atualiza o tipo do usuário localmente para "profissional"
      setUserInfo((prev) => ({ ...prev, tipo: "profissional" }))

      // Salva os dados do salão no AsyncStorage
      await AsyncStorage.setItem("@salaoInfo", JSON.stringify(response.data));

      // Redireciona para HomeSalao
      navigation.navigate("HomeSalao");

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
