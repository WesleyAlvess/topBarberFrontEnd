import api from "../services/api"


export const createNewUser = async (nome, email, senha, telefone) => {
  try {
    const response = await api.post("/api/user", {
      nome,
      email,
      senha,
      telefone,
    })
    console.log("Esses são os dados do novo usuário", response.data);

    // Retorna os dados do novo usuário para quem chamou a função
    return response.data

  } catch (error) {
    console.log(error)
    // Retorna null ou algum valor que indique que houve um erro
    return null;
  }
}


