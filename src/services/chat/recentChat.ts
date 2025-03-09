// Imports
import apiClient from "@/api/apiClient";
import { nChat } from "@/constants/network";

export async function fetchRecentChats() {
  const response = await apiClient.get(nChat.recentChats);
  return response.data;
}
