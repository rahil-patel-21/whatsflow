// Imports
import apiClient from "../apiClient";
import { nChat } from "@/constants/network";

export const waConnectionInfo = async () => {
  const response = await apiClient.get(nChat.connectionInfo);
  return response.data;
};

export const requestConnectWa = async () => {
  const response = await apiClient.get("/");
  return response.data;
};
