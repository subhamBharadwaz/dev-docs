import { createMCPClient } from "@ai-sdk/mcp";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const projectRoot = resolve(__dirname, "../..");

export async function createFilesystemClient() {
  const client = await createMCPClient({
    transport: new StdioClientTransport({
      command: "pnpm",
      args: ["exec", "mcp-server-filesystem", projectRoot],
      cwd: projectRoot,
    }),
  });

  return client;
}
