import axios from "axios";

const api = axios.create({
  baseURL: "https://topbarberserver.onrender.com", // URL base
  timeout: 5000 // Tempo da requisição

});

export default api;
