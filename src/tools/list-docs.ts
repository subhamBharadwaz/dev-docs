import { tool } from "ai";
import { z } from "zod";
import { listDocs } from "../filesystem/list-docs.js";

export const listDocsTool = tool({
  description:
    "Lists all available documentation files. Use this tool whenever the user asks to list, browse, inspect, or discover documentation files.",
  inputSchema: z.object({}),
  outputSchema: z.object({
    documents: z.array(z.string()),
  }),
  execute: async () => {
    console.log("🔥 listDocsTool executed");
    const docs = await listDocs();

    return {
      documents: docs,
    };
  },
});
