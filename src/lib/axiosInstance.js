const axios = require("axios");

const API_URL = "https://api.rajaongkir.com/starter";

const rajaOngkirInstance = axios.create({
  baseURL: API_URL,
});

rajaOngkirInstance.interceptors.request.use((config) => {
  config.headers.key = "ad397ba977f8e55bf2f4cd74e92d2785";

  return config;
});

module.exports = rajaOngkirInstance;
