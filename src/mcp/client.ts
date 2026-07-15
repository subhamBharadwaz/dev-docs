import { createFilesystemClient } from "./filesystem.js";

type FilesystemClient = Awaited<ReturnType<typeof createFilesystemClient>>;

let client: FilesystemClient | null = null;

export async function getMcpClient(): Promise<FilesystemClient> {
  if (client) {
    return client;
  }

  client = await createFilesystemClient();

  return client;
}

export async function closeMcpClient(): Promise<void> {
  if (!client) {
    return;
  }

  await client.close();
  client = null;
}
