import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { registerFetchUrlTool } from "./tools/fetch-url.js";

export function createServer() {
  const server = new McpServer({
    name: "@dev-docs/fetch-mcp",
    version: "0.1.0",
  });

  registerFetchUrlTool(server);

  return server;
}
