import { tool } from "ai";
import { z } from "zod";
import { retrievalPipeline } from "../query/pipeline.js";

export const findDocsTool = tool({
  description:
    "Finds documentation files relevant to the user's query. Use this when the user asks which file or document discusses a topic.",

  inputSchema: z.object({
    query: z.string(),
  }),

  outputSchema: z.object({
    files: z.array(z.string()),
  }),
  execute: async ({ query }) => {
    const documents = await retrievalPipeline.retrieve(query);

    return {
      files: documents.map((document) => document.source),
    };
  },
});
