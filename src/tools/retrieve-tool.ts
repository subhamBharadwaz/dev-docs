import { tool } from "ai";
import { z } from "zod";

import { retrieve } from "../query/retrieve.js";

export const retrieveTool = tool({
  description:
    "Searches the documentation for information relevant to the user's question. Use this tool whenever the user asks a question about the documentation.",

  inputSchema: z.object({
    query: z.string(),
  }),

  outputSchema: z.object({
    documents: z.array(
      z.object({
        source: z.string(),
        chunkIndex: z.number(),
        text: z.string(),
      }),
    ),
  }),

  execute: async ({ query }) => {
    const chunks = await retrieve(query);

    return {
      documents: chunks.map((chunk) => ({
        source: chunk.sourceFile,
        chunkIndex: chunk.chunkIndex,
        text: chunk.text,
      })),
    };
  },
});
