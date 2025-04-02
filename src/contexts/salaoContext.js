import AsyncStorage from "@react-native-async-storage/async-storage"; // Para armazenar os dados do token
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./auth"; // Para pegar os dados do usuário autenticado
import api from "../services/api"

export const SalaoContext = createContext({})

export const SalaoProvider = ({ children }) => {
  const { user, setUser } = useContext(AuthContext);

  const [temSalao, setTemSalao] = useState(null) // Armazena true ou false se o usuario tem um salao
  const [dadosDoSalao, setDadosDoSalao] = useState(null) // Armazena dados do salao
  const [servicos, setServicos] = useState([]) // Armazenar dados do serviço


  // ✅ Busca os dados do salão do usuário autenticado
  const buscarSalao = async () => {
    try {
      const token = await AsyncStorage.getItem("@userToken");

      if (!token) {
        console.error("Token não encontrado");
        return;
      }

      // Verifica se o usuário possui tipo profissional
      if (user?.tipo !== 'profissional') {
        console.log("Usuário não é um profissional");
        setTemSalao(false)
        return
      }

      const response = await api.get("/api/salao", {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (response.data) {
        setDadosDoSalao(response.data)
        setTemSalao(true)
      } else {
        setTemSalao(false)
      }

    } catch (error) {
      console.error("Erro ao buscar salão:", error);
      setTemSalao(false);
    }
  }

  // Cria salão
  const criarSalao = async (dadosSalao) => {
    try {
      // Pegar o token do usuário
      const token = await AsyncStorage.getItem("@userToken")
      console.log("Token recuperado:", token)

      // Verificar se o token existe
      if (!token) {
        console.error("Token não encontrado");
        return
      }

      // Fazer a requizição para o backend, mandando o token no cabeçalho
      const response = await api.post("/api", dadosSalao, {
        headers: { Authorization: `Bearer ${token}` }
      })

      console.log("Salão criado:", response.data);

      // Atualiza o usuário no contexto para refletir que ele agora é um profissional
      setUser((prevUser) => ({
        ...prevUser,
        tipo: "profissional",
      }));

      setTemSalao(true);
      setDadosDoSalao(response.data)

      // ✅ Atualiza os dados do salão chamando `buscarSalao()`
      await buscarSalao();
      await new Promise((resolve) => setTimeout(resolve, 1000));


      // Retornar o salao criado
      return response.data

    } catch (error) {
      console.error("Erro ao criar Salão", error)
    }
  }

  // Criar Serveço
  const adicionarServico = async (dataServico) => {
    try {
      const token = await AsyncStorage.getItem("@userToken");
      if (!token) {
        console.error("Token não encontrado");
        return;
      }

      if (!dadosDoSalao || !dadosDoSalao._id) {
        console.error("Erro: ID do salão não encontrado.");
        return;
      }

      const response = await api.post(`/api/services/${dadosDoSalao._id}`, dataServico, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Se o serviço foi criado com sucesso, atualiza a lista
      if (response.status === 201) {
        setServicos((prevServicos) => [...prevServicos, response.data]); // Atualiza a lista de serviços
        return response.data;
      }

      if (response.status === 400) {
        console.log("Já existe este serviço no seu salão");
      }
    } catch (error) {
      console.error("Erro ao criar Serviço", error);
    }
  };



  return (
    <SalaoContext.Provider value={{
      temSalao,
      setTemSalao,
      buscarSalao,
      criarSalao,
      dadosDoSalao,
      adicionarServico,
      setServicos,
      servicos,
    }}
    >{children}</SalaoContext.Provider>
  )

}
