import { createMCPClient } from "@ai-sdk/mcp";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

export async function createFetchClient() {
  return createMCPClient({
    transport: new StdioClientTransport({
      command: "pnpm",
      args: ["--filter", "@dev-docs/fetch-mcp", "dev"],
    }),
  });
}
