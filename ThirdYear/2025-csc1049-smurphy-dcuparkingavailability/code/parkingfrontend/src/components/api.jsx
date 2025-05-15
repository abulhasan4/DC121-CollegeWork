import axios from 'axios';

const API_BASE_URL = "http://localhost:8000/api"; // Adjust to your backend's URL

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;