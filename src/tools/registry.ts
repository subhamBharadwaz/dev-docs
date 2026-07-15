import { loadMcpTools } from "../mcp/index.js";
import { retrieveTool } from "./retrieve-tool.js";

export async function loadTools() {
  const mcpTools = await loadMcpTools();

  return {
    retrieve: retrieveTool,
    ...mcpTools,
  };
}
