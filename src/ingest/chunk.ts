import { createHash } from "node:crypto";
import type { Chunk } from "../types/chunks.js";
import type { Document } from "../types/document.js";
import { generateChunkId } from "../utils/hash.js";

interface ChunkOptions {
  maxChunkSize: number;
}

export function paragraphChunker(
  text: string,
  options: ChunkOptions,
): string[] {
  const { maxChunkSize } = options;

  const chunks: string[] = [];

  const paragraphs = text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  let currentChunk = "";

  for (const paragraph of paragraphs) {
    const nextChunk = currentChunk
      ? `${currentChunk}\n\n${paragraph}`
      : paragraph;

    if (nextChunk.length <= maxChunkSize) {
      currentChunk = nextChunk;
      continue;
    }

    if (currentChunk) {
      chunks.push(currentChunk);
      currentChunk = "";
    }

    const sentences = paragraph.split(/(?<=[.!?])\s+/);

    for (const sentence of sentences) {
      let remaining = sentence;

      while (remaining.length > maxChunkSize) {
        chunks.push(remaining.slice(0, maxChunkSize));
        remaining = remaining.slice(maxChunkSize);
      }

      if (!currentChunk) {
        currentChunk = remaining;
      } else if (`${currentChunk} ${remaining}`.length <= maxChunkSize) {
        currentChunk += ` ${remaining}`;
      } else {
        chunks.push(currentChunk);
        currentChunk = remaining;
      }
    }
  }

  if (currentChunk.trim()) {
    chunks.push(currentChunk);
  }

  return chunks;
}

export function chunkDocuments(
  documents: Document[],
  options: ChunkOptions,
): Chunk[] {
  const chunks: Chunk[] = [];

  for (const document of documents) {
    const chunkTexts = paragraphChunker(document.content, options);

    chunkTexts.forEach((text, index) => {
      chunks.push({
        id: generateChunkId(document.fileName, text),
        text,
        sourceFile: document.fileName,
        chunkIndex: index,
      });
    });
  }

  return chunks;
}
