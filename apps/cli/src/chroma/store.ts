import { getDocsCollection } from "../chroma/collections.js";
import type { EmbeddedChunk } from "../types/chunks.js";

export async function storeChunks(chunks: EmbeddedChunk[]): Promise<void> {
  const collection = await getDocsCollection();

  await collection.upsert({
    ids: chunks.map((chunk) => chunk.id),
    documents: chunks.map((chunk) => chunk.text),
    embeddings: chunks.map((chunk) => chunk.embedding),

    metadatas: chunks.map((chunk) => ({
      sourceFile: chunk.sourceFile,
      chunkIndex: chunk.chunkIndex,
    })),
  });
}
