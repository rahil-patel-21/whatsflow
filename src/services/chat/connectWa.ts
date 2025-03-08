// Imports
import apiClient from "@/api/apiClient";
import { nChat } from "@/constants/network";
import { requestConnectWa, waConnectionInfo } from "@/api/waweb/auth";

export async function isWAConnected() {
  const response = await waConnectionInfo();
  return response.isConnected ?? false;
}

export async function connectWaForcefully() {
  const response = await apiClient.post(nChat.connectWaForcefully);
  return response.data;
}

export async function sendWAConnectionRequest(mobileNumber: string) {
  const response = await requestConnectWa();
  console.log("HERE", response);
}
