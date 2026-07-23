import { embedMany } from "ai";

import type { Chunk, EmbeddedChunk } from "../types/chunks.js";
import { embeddingModel } from "../ollama/embeddings.js";

export async function embedChunks(chunks: Chunk[]): Promise<EmbeddedChunk[]> {
  const { embeddings } = await embedMany({
    model: embeddingModel,
    values: chunks.map((chunk) => chunk.text),
  });

  return chunks.map((chunk, index) => ({
    ...chunk,
    embedding: embeddings[index],
  }));
}
