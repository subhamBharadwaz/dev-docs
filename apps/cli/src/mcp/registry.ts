import { createFilesystemClient } from "./filesystem.js";

export interface McpServer {
  name: string;
  connect: typeof createFilesystemClient;
}

export const mcpServers: McpServer[] = [
  {
    name: "filesystem",
    connect: createFilesystemClient,
  },
];
