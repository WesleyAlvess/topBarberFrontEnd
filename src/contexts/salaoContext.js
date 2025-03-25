import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Para armazenar os dados do token
import { Alert } from 'react-native';
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./auth"; // Para pegar os dados do usuário autenticado
import api from "../services/api"

export const SalaoContext = createContext({})

export const SalaoProvider = ({ children }) => {
  const navigation = useNavigation() // Navegação
  const { userInfo, setUserInfo } = useContext(AuthContext) // Pegando os dados do usuário logado
  const [loading, setLoading] = useState(false)
  const [salaoExiste, setSalaoExiste] = useState(null);
  const [salaoInfo, setSalaoInfo] = useState(null); // Estado para armazenar os dados do salão

  const verificaSeTemSalao = async () => {
    setLoading(true);
    try {
      // Pegando token do usuario
      const token = await AsyncStorage.getItem("@userToken")

      // Fazendo requisição e enviando o token de autenticação no header
      const response = await api.get("api/verificar-salao", {
        headers: { Authorization: `Bearer ${token}` }
      })

      // Se houver um salão, salvar os dados no estado e no AsyncStorage
      if (response.data) {
        setSalaoExiste(true)
        setSalaoInfo(response.data)
        await AsyncStorage.setItem("@salaoInfo", JSON.stringify(response.data)) // Salvando os dados do salão no Async
      } else {
        setSalaoExiste(false)
        setSalaoInfo(null)
        await AsyncStorage.removeItem("@salaoInfo"); // Remove caso não tenha um salão
      }

      // Verifica se o perfil e de cliente ou profissional
      if (response.data.tipo === cliente) {
        setSalaoExiste(false)
        setSalaoInfo(null)
        await AsyncStorage.removeItem("@salaoInfo"); // Remove caso não tenha um salão
      } else {
        setSalaoExiste(true)
        setSalaoInfo(response.data)
        await AsyncStorage.setItem("@salaoInfo", JSON.stringify(response.data)) // Salvando os dados do salão no Async
      }

    } catch (error) {
      if (error.response || error.response.status === 400) {
        setSalaoExiste(true); // Já possui um salão
      } else {
        console.error("Erro ao verificar salão:", error);
      }
    } finally {
      setLoading(false)
    }
  }

  // Chama a verificação ao abrir o app
  useEffect(() => {
    verificaSeTemSalao()
  }, [])

  // Função para buscar os dados do salão do usuario logado
  const criarSalao = async (dadosSalao) => {
    setLoading(true)

    // Verifica se o usuário já tem um salão antes de criar
    await verificaSeTemSalao()

    if (salaoExiste) {
      setLoading(false);
      navigation.navigate("HomeSalao")
      return;
    }

    try {
      // Pega o token do usuário no AsyncStorage
      const token = await AsyncStorage.getItem("@userToken");

      // Envia os dados para a API
      const response = await api.post("api/", dadosSalao, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Atualiza o estado e salva os dados no AsyncStorage
      setSalaoExiste(true)
      setSalaoInfo(response.data)
      await AsyncStorage.setItem("@salaoInfo", JSON.stringify(response.data))

      Alert.alert("Sucesso", "Salão criado com sucesso!");
      navigation.navigate("HomeSalao"); // Redireciona para a tela do salão

    } catch (error) {
      console.error("Erro ao criar salão:", error);
      Alert.alert("Erro", "Não foi possível criar o salão.");
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
      // Função para armazendar true ou false ou null se o usuário tem um salão
      verificaSeTemSalao,
      // Estado contendo os dados boleanos 
      salaoExiste,
      // Contém os dados do salão
      salaoInfo,
    }}
    >
      {children}
    </SalaoContext.Provider>
  )

}
