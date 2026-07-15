import { createMCPClient } from "@ai-sdk/mcp";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

export async function createFilesystemClient() {
  const client = await createMCPClient({
    transport: new StdioClientTransport({
      command: "pnpm",
      args: ["exec", "mcp-server-filesystem", process.cwd()],
    }),
  });

  return client;
}
