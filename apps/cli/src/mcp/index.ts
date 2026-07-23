import { getFilesystemClient, getFetchClient } from "./client.js";

export async function loadMcpTools() {
  const filesystem = await getFilesystemClient();
  const fetch = await getFetchClient();

  return {
    ...(await filesystem.tools()),
    ...(await fetch.tools()),
  };
}
