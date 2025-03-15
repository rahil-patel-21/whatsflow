export function sanitizeMsg(msg: string) {
  return msg.replace(/\n+$/, "");
}
