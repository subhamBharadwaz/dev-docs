import { createMCPClient } from "@ai-sdk/mcp";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const client = await createMCPClient({
  transport: new StdioClientTransport({
    command: "pnpm",
    args: ["exec", "mcp-server-filesystem", process.cwd()],
  }),
});

const tools = await client.tools();

console.dir(tools.read_file, {
  depth: null,
});

await client.close();
