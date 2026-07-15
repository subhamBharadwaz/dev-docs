import { config } from "../config.js";
import { getDocsCollection } from "../chroma/collections.js";
import { embedQuery } from "../embeddings/embedQuery.js";

import type { ChunkMetadata } from "../types/query.js";
import type { SearchResult } from "../types/search.js";

export async function queryChroma(question: string): Promise<SearchResult[]> {
  const embeddedQuery = await embedQuery(question);

  const collection = await getDocsCollection();

  const result = await collection.query({
    queryEmbeddings: [embeddedQuery],
    nResults: config.topK,
  });

  const documents = result.documents[0] ?? [];
  const ids = result.ids[0] ?? [];
  const metadatas = result.metadatas[0] ?? [];
  const distances = result.distances[0] ?? [];

  return documents.flatMap((document, index) => {
    const metadata = metadatas[index];
    const distance = distances[index];

    if (
      document === null ||
      metadata === null ||
      distance === null ||
      distance > config.retrievalThreshold
    ) {
      return [];
    }

    const chunkMetadata = metadata as unknown as ChunkMetadata;

    const semanticScore = 1 - distance;

    return [
      {
        chunk: {
          id: ids[index],
          text: document,
          sourceFile: chunkMetadata.sourceFile,
          chunkIndex: chunkMetadata.chunkIndex,
          distance,
        },
        semanticScore,
        keywordScore: 0,
        rerankScore: 0,
      },
    ];
  });
}
