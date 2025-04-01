import AsyncStorage from "@react-native-async-storage/async-storage"; // Para armazenar os dados do token
import React, { createContext, use, useContext, useEffect, useState } from "react";
import { AuthContext } from "./auth"; // Para pegar os dados do usuário autenticado
import api from "../services/api"
import { jwtDecode } from "jwt-decode";

export const SalaoContext = createContext({})

export const SalaoProvider = ({ children }) => {
  const { user, setUser } = useContext(AuthContext);

  const [temSalao, setTemSalao] = useState(null) // Armazena true ou false se o usuario tem um salao
  const [dadosDoSalao, setDadosDoSalao] = useState(null) // Armazena dados do salao


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


      // Retornar o salao criado
      return response.data

    } catch (error) {
      console.error("Erro ao criar Salão", error)
    }
  }

  const adicionarServico = async (dataServico) => {
    try {
      // Pegando o token do usuário no Local Storage
      const token = await AsyncStorage.getItem("@userToken")

      // Verificando se tem token
      if (!token) {
        console.error("Token não encontrado");
        return;
      }

      // Decodificando o token para pegar o ID do usuário
      const decodedToken = jwtDecode(token)
      // Pegando ID do usuario no token 
      const salaoId = decodedToken.dono

      const response = await api.post(`/api/services/${salaoId}`, dataServico, {
        headers: { Authorization: `Bearer ${token}` } // Incluindo o token no cabeçalho
      })

      console.log(response.data);


      // // Verificando a resposta da API
      // if (response.status === 201) {
      //   return response.data
      // } else {
      //   console.error("Erro ao criar serviço")
      // }

    } catch (error) {
      console.error("Erro ao criar Serviço", error)
    }
  }


  return (
    <SalaoContext.Provider value={{
      temSalao,
      setTemSalao,
      buscarSalao,
      criarSalao,
      dadosDoSalao,
      adicionarServico,
    }}
    >{children}</SalaoContext.Provider>
  )

}
