import axios from "axios";

const api = axios.create({
  baseURL: "https://topbarberserver.onrender.com", // URL base
  timeout: 10000 // Tempo da requisição

});

export default api;
