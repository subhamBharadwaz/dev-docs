import { readFile } from "node:fs/promises";
import path from "node:path";

import { config } from "../config.js";

export interface Document {
  source: string;
  content: string;
}

export async function readDocument(filename: string): Promise<Document | null> {
  try {
    const filePath = path.join(config.docsPath, filename);

    const content = await readFile(filePath, "utf8");

    return {
      source: filename,
      content,
    };
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return null;
    }

    throw error;
  }
}
