// Imports
import apiClient from "./apiClient";

export const requestConnectWa = async () => {
  const response = await apiClient.get("/");
  return response.data;
};
