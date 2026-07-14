import { tool } from "ai";
import { z } from "zod";
import { readDocument } from "../repository/document-repository.js";

export const readDocumentTool = tool({
  description:
    "Reads the full contents of a documentation file. Use this when the user asks to read, summarize, explain, or compare a specific documentation file.",
  inputSchema: z.object({
    filename: z.string(),
  }),
  outputSchema: z.object({
    found: z.boolean(),
    source: z.string().optional(),
    content: z.string().optional(),
  }),
  execute: async ({ filename }) => {
    const document = await readDocument(filename);

    if (!document) {
      return {
        found: false,
      };
    }

    return {
      found: true,
      source: document.source,
      content: document.content,
    };
  },
});
