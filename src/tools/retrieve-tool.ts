import { tool } from "ai";
import { z } from "zod";
import { retrievalPipeline } from "../query/pipeline.js";

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
        content: z.string(),
      }),
    ),
  }),

  execute: async ({ query }) => {
    const documents = await retrievalPipeline.retrieve(query);

    return {
      documents,
    };
  },
});
