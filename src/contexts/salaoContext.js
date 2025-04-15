import AsyncStorage from "@react-native-async-storage/async-storage"; // Para armazenar os dados do token
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./auth"; // Para pegar os dados do usuário autenticado
import api from "../services/api"
import Toast from 'react-native-toast-message';

export const SalaoContext = createContext({})

export const SalaoProvider = ({ children }) => {
  const { user, setUser } = useContext(AuthContext);

  const [temSalao, setTemSalao] = useState(null) // Armazena true ou false se o usuario tem um salao
  const [dadosDoSalao, setDadosDoSalao] = useState(null) // Armazena dados do salao
  const [servicos, setServicos] = useState([]) // Armazenar dados do serviço
  const [horarios, setHorarios] = useState([]) // Armazena os dados dos horários


  // ✅ Busca os dados do salão do usuário autenticado
  const buscarSalao = async () => {
    try {
      const token = await AsyncStorage.getItem("@userToken");

      if (!token) {
        console.log("Token não encontrado");
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
      console.log("Erro ao buscar salão:", error);
      setTemSalao(false);
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

      // Fazer a requizição para o backend, mandando o token no cabeçalho
      const response = await api.post("/api", dadosSalao, {
        headers: { Authorization: `Bearer ${token}` }
      })


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

  // Criar Serviço
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
        await buscarServicos()
        setServicos((prevServicos) => [...prevServicos, response.data]); // Atualiza a lista de serviços
        return 'success';
      }

      if (response.status === 400) {
        return 'exists';
      }

      return 'error';

    } catch (error) {
      console.error("Erro ao criar Serviço", error);
      return 'error';
    }
  };

  // Buscar Servico
  const buscarServicos = async () => {
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

      const response = await api.get(`/api/services/${dadosDoSalao._id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(response.data);

      setServicos(response.data); // Atualiza os serviços corretamente


    } catch (error) {
      console.error("Erro ao buscar serviços:", error);
    }
  }

  // Excluir Serviços
  const excluirServico = async (idServico) => {
    try {
      // Pegando token do usuario
      const token = await AsyncStorage.getItem("@userToken")

      // Verificando o token
      if (!token) {
        console.error("Token não encontrado");
        return
      }

      // Buscando servico no banco de dados 
      const response = await api.delete(`/api/services/${dadosDoSalao._id}/${idServico}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      // Atualiza o estado dos sevicos mostrado na tela

      if (response.status === 200) {
        Toast.show({
          type: 'success',
          text1: 'Serviço excluído com sucesso'
        })
        // Atualiza a lista
        buscarServicos()
      } else {
        Toast.show({
          type: 'error',
          text1: 'Erro ao excluir serviço'
        })
      }

    } catch (error) {
      console.error("Erro ao excluir serviço", error)
    }
  }

  // Criar Horários disponíveis
  const criarHorario = async (dias) => {
    try {
      const token = await AsyncStorage.getItem("@userToken");
      if (!token) {
        console.error("Token não encontrado");
        return;
      }

      if (!dadosDoSalao?._id) {
        console.error("ID do salão não encontrado");
        return;
      }

      // Mapear os horários para o formato esperado pelo backend
      const diasFormatados = dias.map((dia) => ({
        ...dia,
        horarios: dia.horarios.map((horario) => ({
          hora: horario, // Formatar cada horário como um objeto { hora: "08:00" }
        })),
      }));

      const response = await api.post(
        `/api/time/${dadosDoSalao._id}`,
        { dias: diasFormatados },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setHorarios(response.data);
      carregarHorarios()

    } catch (error) {
      console.log("Erro ao criar um horário:", error.response?.data || error.message);
    }
  }

  // Buscar Horários criados
  const carregarHorarios = async () => {
    try {
      if (!dadosDoSalao || !dadosDoSalao._id) {
        console.log("ID do salão não encontrado");
        return;
      }

      const response = await api.get(`/api/time/${dadosDoSalao._id}`)
      setHorarios(response.data.dias);


    } catch (error) {
      console.log("Erro ao buscar horários:", error.response?.data || error.message);
    }
  }

  // Deletar todos os horários
  const deleteHorarios = async () => {
    try {
      const token = await AsyncStorage.getItem("@userToken");
      if (!token) {
        console.error("Token não encontrado");
        return;
      }


      await api.delete(
        `/api/time/${dadosDoSalao._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Limpa o estado antes de recarregar
      setHorarios([]);

      // Atualiza os horários (caso ainda tenha algo no backend)
      carregarHorarios();

    } catch (error) {
      console.log("Erro ao deletar os horarios", error)
    }
  }

  // Busca o salão pelo número de telefone
  const buscaSalaoPeloNumero = async ({ telefone }) => {
    try {
      console.log("Esse é o número vindo do Busca salão:", telefone);

      const response = await api.get(`api/buscar/celular/${telefone}`);

      setDadosDoSalao(response.data)
      console.log("Salão encontrado:", response.data);

      return response.data; // retornando os dados para o componente usar
    } catch (error) {
      console.log("Erro ao buscar o salão pelo telefone:", error);
      return null;
    }
  };


  // Carrega os dados ao montar o componente

  // Carrega os dados 
  useEffect(() => {
    if (dadosDoSalao && dadosDoSalao._id) {
      carregarHorarios()
    }
  }, [dadosDoSalao])

  // Carrega os dados do Salao
  useEffect(() => {
    buscarSalao();
  }, []);

  // Carrega os serviços apenas quando os dados do salão forem carregados
  useEffect(() => {
    if (dadosDoSalao?._id) {
      buscarServicos();
    }
  }, [dadosDoSalao]);


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
      excluirServico,
      criarHorario,
      horarios,
      deleteHorarios,
      buscaSalaoPeloNumero,
    }}
    >{children}</SalaoContext.Provider>
  )

}
