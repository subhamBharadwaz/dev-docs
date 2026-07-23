import { retrieveTool } from "./retrieve-tool.js";
import { loadMcpTools } from "../mcp/index.js";

export async function loadTools() {
  const tools = await loadMcpTools();

  return {
    retrieve: retrieveTool,
    ...tools,
  };
}
