import { tool } from "ai";
import { z } from "zod";

import { searchFiles } from "../filesystem/search-files.js";

export const findDocsTool = tool({
  description:
    "Finds documentation files whose names match the user's query. Use this when the user asks which document or file talks about a topic, or when they are looking for a documentation file by name.",

  inputSchema: z.object({
    query: z.string(),
  }),

  outputSchema: z.object({
    files: z.array(z.string()),
  }),

  execute: async ({ query }) => {
    const files = await searchFiles(query);

    return {
      files,
    };
  },
});
