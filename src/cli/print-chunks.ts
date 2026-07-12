import type { RetrievedChunk } from "../types/query.js";

export function printChunks(chunks: RetrievedChunk[]) {
  console.log("\n=== Retrieved Chunks ===\n");

  for (const chunk of chunks) {
    console.log(
      `${chunk.sourceFile} | chunk ${chunk.chunkIndex} | distance: ${chunk.distance.toFixed(3)}`,
    );
  }
}
