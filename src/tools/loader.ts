import { retrieveTool } from "./retrieve-tool.js";
import { loadMcpTools } from "../mcp/index.js";

export async function loadTools() {
  const mcpTools = await loadMcpTools();

  return {
    retrieve: retrieveTool,
    ...mcpTools,
  };
}
