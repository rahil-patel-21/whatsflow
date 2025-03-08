// Imports
import axios from "axios";
import { Env } from "@/constants/env";

const apiClient = axios.create({
  baseURL: Env.network.backendBaseUrl,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": true,
  },
});

export default apiClient;
