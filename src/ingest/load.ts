import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import type { Document } from "../types/document.js";
import { config } from "../config.js";

export async function loadDocuments(): Promise<Document[]> {
  const docsPath = path.join(process.cwd(), config.docsPath);

  let files: string[];

  try {
    files = await readdir(docsPath);
  } catch (error) {
    const reason = error instanceof Error ? error.message : "Unknown error";
    throw new Error(
      `Unable to read docs directory at ${docsPath}. ${reason}`,
    );
  }

  const markdownFiles = files.filter((file) => file.endsWith(".md")).sort();

  if (markdownFiles.length === 0) {
    throw new Error(
      `No Markdown documents were found in ${docsPath}. Add .md files or update DOCS_PATH.`,
    );
  }

  const documents = await Promise.all(
    markdownFiles.map(async (fileName) => {
      const filePath = path.join(docsPath, fileName);

      try {
        const content = await readFile(filePath, "utf8");

        return {
          fileName,
          content,
        } satisfies Document;
      } catch (error) {
        const reason = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Unable to read document ${filePath}. ${reason}`);
      }
    }),
  );

  return documents;
}
