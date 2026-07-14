import { config } from "../config.js";
import { chunkDocuments } from "../ingest/chunk.js";
import { embedChunks } from "../embeddings/embedChunks.js";
import { storeChunks } from "../chroma/store.js";
import { DocumentLoader } from "../types/document.js";
import { IngestOptions } from "../types/ingest.js";

export async function ingestDocuments(
  loader: DocumentLoader,
  options: IngestOptions = {},
): Promise<void> {
  options.log?.("Loading documents...");

  const documents = await loader.loadDocuments();

  options.log?.(`Loaded ${documents.length} documents.`);

  options.log?.("Chunking documents...");

  const chunks = chunkDocuments(documents, {
    maxChunkSize: config.maxChunkSize,
  });

  options.log?.(`Created ${chunks.length} chunks.`);

  options.log?.("Generating embeddings...");

  const embeddedChunks = await embedChunks(chunks);

  options.log?.("Storing embeddings...");

  await storeChunks(embeddedChunks);

  options.log?.("Ingestion complete.");
}
