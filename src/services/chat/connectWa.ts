// Imports
import { requestConnectWa } from "@/api/waweb/auth";

export async function sendWAConnectionRequest(mobileNumber: string) {
  const response = await requestConnectWa();
  console.log("HERE", response);
}
