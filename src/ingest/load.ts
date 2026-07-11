import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import type { Document } from "../types/document.js";
import { config } from "../config.js";

export async function loadDocuments(): Promise<Document[]> {
  const docsPath = path.join(process.cwd(), config.docsPath);

  const files = await readdir(docsPath);

  const documents: Document[] = [];

  for (const file of files) {
    const filePath = path.join(docsPath, file);

    const content = await readFile(filePath, "utf8");

    documents.push({
      fileName: file,
      content,
    });
  }

  return documents;
}
