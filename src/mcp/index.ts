import { getMcpClient } from "./client.js";

export async function loadMcpTools() {
  const client = await getMcpClient();

  return await client.tools();
}
