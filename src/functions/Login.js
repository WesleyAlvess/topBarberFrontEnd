import AsyncStorage from "@react-native-async-storage/async-storage"; // Para armazenar os dados localmente
import api from "../services/api"


export const loginUser = async (email, senha) => {

  try {
    const response = await api.post("/api/user/login", {
      email,
      senha,
    })

    console.log("Esses são os dados de login", response.data);

    // Retorna os dados do novo usuário para quem chamou a função
    return response.data

  } catch (error) {
    console.error("Erro ao fazer login!", error.response?.data || error.message);
    return null;
  }
}
