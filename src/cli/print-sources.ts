import type { RetrievedChunk } from "../types/query.js";

export function printSources(chunks: RetrievedChunk[]) {
  console.log("\n=== Sources ===\n");

  const sources = new Set(
    chunks.map((chunk) => `${chunk.sourceFile} (chunk ${chunk.chunkIndex})`),
  );

  for (const source of sources) {
    console.log(`- ${source}`);
  }
}
