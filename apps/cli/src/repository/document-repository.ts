import { readFile } from "node:fs/promises";
import path from "node:path";

import { PDFParse } from "pdf-parse";

import { config } from "../config.js";

export interface Document {
  source: string;
  content: string;
}

export async function readDocument(filename: string): Promise<Document | null> {
  if (filename.endsWith(".md")) {
    try {
      const filePath = path.join(config.docsPath, filename);

      const content = await readFile(filePath, "utf8");

      return {
        source: filename,
        content,
      };
    } catch {
      return null;
    }
  }

  if (filename.endsWith(".pdf")) {
    try {
      const filePath = path.resolve("knowledge/pdfs", filename);

      const buffer = await readFile(filePath);

      const parser = new PDFParse({
        data: buffer,
      });

      try {
        const result = await parser.getText();

        return {
          source: filename,
          content: result.text,
        };
      } finally {
        await parser.destroy();
      }
    } catch {
      return null;
    }
  }

  return null;
}
