// Imports
import apiClient from "@/api/apiClient";
import { nChat } from "@/constants/network";
import { sanitizeMsg } from "@/utils/str.service";

export async function getChat(chatId: string) {
  const response = await apiClient.get(nChat.getChat, {
    params: { id: chatId },
  });
  return response.data;
}

export async function sendTargetMsg(sourceNumber: string, text: string) {
  const response = await apiClient.post(nChat.sendMsg, {
    number: sourceNumber,
    text: sanitizeMsg(text),
  });
  return response.data;
}

export async function sendMediaMsg() {}
