import { RetrievedChunk } from "../types/query.js";

export function buildContext(chunks: RetrievedChunk[]): string {
  return chunks
    .map((chunk, index) => {
      return `Document ${index + 1}
    Source: ${chunk.sourceFile}
    Chunk: ${chunk.chunkIndex}

    ${chunk.text}`;
    })
    .join("\n\n-------------------------------------\n\n");
}
