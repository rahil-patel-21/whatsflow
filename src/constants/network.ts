// Imports
import { Env } from "./env";

const nChatUrl = Env.network.backendBaseUrl + "chat/";

export const nChat = {
  connectionInfo: nChatUrl + "connectionInfo",
  connectWaForcefully: nChatUrl + "connect",
  getChat: nChatUrl + "getChat",
  recentChats: nChatUrl + "recentChats",
  sendMsg: nChatUrl + "sendMsg",
};
