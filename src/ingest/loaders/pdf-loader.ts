import { readFile } from "node:fs/promises";
import path from "node:path";

import { PDFParse } from "pdf-parse";

import type { Document } from "../../types/document.js";
import type { DocumentLoader } from "./document-loader.js";

export class PdfLoader implements DocumentLoader {
  constructor(private readonly pdfPath: string) {}

  async loadDocuments(): Promise<Document[]> {
    const filePath = path.resolve(this.pdfPath);

    const buffer = await readFile(filePath);

    const parser = new PDFParse({
      data: buffer,
    });

    try {
      const result = await parser.getText();

      return [
        {
          fileName: path.basename(filePath),
          content: result.text,
        },
      ];
    } finally {
      await parser.destroy();
    }
  }
}
