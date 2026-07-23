import { createFilesystemClient } from "./filesystem.js";
import { createFetchClient } from "./fetch.js";

type FilesystemClient = Awaited<ReturnType<typeof createFilesystemClient>>;

type FetchClient = Awaited<ReturnType<typeof createFetchClient>>;

let filesystemClient: FilesystemClient | null = null;
let fetchClient: FetchClient | null = null;

export async function getFilesystemClient() {
  if (!filesystemClient) {
    filesystemClient = await createFilesystemClient();
  }

  return filesystemClient;
}

export async function getFetchClient() {
  if (!fetchClient) {
    fetchClient = await createFetchClient();
  }

  return fetchClient;
}

export async function closeMcpClients() {
  await Promise.all([filesystemClient?.close(), fetchClient?.close()]);

  filesystemClient = null;
  fetchClient = null;
}
