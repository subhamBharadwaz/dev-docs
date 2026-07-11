import { config } from "../config.js";
import { getDocsCollection } from "../chroma/collections.js";
import { embedQuery } from "../embeddings/embedQuery.js";
import type { ChunkMetadata, RetrievedChunk } from "../types/query.js";

export async function retrieve(question: string): Promise<RetrievedChunk[]> {
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

  const retrievedChunks = documents.flatMap((document, index) => {
    const metadata = metadatas[index];
    const distance = distances[index];

    if (document === null || metadata === null || distance === null) {
      return [];
    }

    const chunkMetadata = metadata as unknown as ChunkMetadata;

    return [
      {
        id: ids[index],
        text: document,
        sourceFile: chunkMetadata.sourceFile,
        chunkIndex: chunkMetadata.chunkIndex,
        distance,
      },
    ];
  });

  return retrievedChunks.filter(
    (chunk) => chunk.distance <= config.retrievalThreshold,
  );
}
