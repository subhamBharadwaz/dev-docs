import type { RetrievedChunk } from "../types/query.js";

export interface RetrievedDocument {
  source: string;
  content: string;
}

export function groupChunks(chunks: RetrievedChunk[]): RetrievedDocument[] {
  if (chunks.length === 0) {
    return [];
  }

  const sorted = [...chunks].sort((a, b) => {
    if (a.sourceFile !== b.sourceFile) {
      return a.sourceFile.localeCompare(b.sourceFile);
    }

    return a.chunkIndex - b.chunkIndex;
  });

  const documents: RetrievedDocument[] = [];

  let currentSource = sorted[0].sourceFile;
  let previousChunkIndex = sorted[0].chunkIndex;
  let currentContent = sorted[0].text;

  for (let index = 1; index < sorted.length; index++) {
    const chunk = sorted[index];

    const isSameDocument = chunk.sourceFile === currentSource;
    const isAdjacent = chunk.chunkIndex === previousChunkIndex + 1;

    if (isSameDocument && isAdjacent) {
      currentContent += `\n\n${chunk.text}`;
    } else {
      documents.push({
        source: currentSource,
        content: currentContent,
      });

      currentSource = chunk.sourceFile;
      currentContent = chunk.text;
    }

    previousChunkIndex = chunk.chunkIndex;
  }

  documents.push({
    source: currentSource,
    content: currentContent,
  });

  return documents;
}
