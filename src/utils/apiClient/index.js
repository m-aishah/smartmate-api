const axios = require("axios");

const apiClient = axios.create({
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

module.exports = apiClient;
