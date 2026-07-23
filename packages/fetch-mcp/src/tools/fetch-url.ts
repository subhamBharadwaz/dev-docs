import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

import { fetchDocument } from "../pipeline.js";

export function registerFetchUrlTool(server: McpServer) {
  server.registerTool(
    "fetch_url",
    {
      description:
        "Fetch a webpage, extract its primary content, and return clean Markdown.",

      inputSchema: {
        url: z.string().url().describe("The URL to fetch."),
      },
    },
    async ({ url }) => {
      const document = await fetchDocument(url);
      return {
        content: [
          {
            type: "text" as const,
            text: document.markdown,
          },
        ],
      };
    },
  );
}
