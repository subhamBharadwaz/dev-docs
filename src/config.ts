import { config as loadEnv } from "dotenv";
import { z } from "zod";

loadEnv();

const configSchema = z.object({
  docsPath: z.string().min(1),
  chromaCollectionName: z.string().min(1),
  embeddingModel: z.string().min(1),
  chatModel: z.string().min(1),
  maxChunkSize: z.coerce.number().int().positive(),
  topK: z.coerce.number().int().positive(),
  retrievalThreshold: z.coerce.number().min(0).max(2),
});

const parsedConfig = configSchema.safeParse({
  docsPath: process.env.DOCS_PATH ?? "docs",
  chromaCollectionName: process.env.CHROMA_COLLECTION_NAME ?? "documentation",
  embeddingModel: process.env.EMBEDDING_MODEL ?? "nomic-embed-text:latest",
  chatModel: process.env.CHAT_MODEL ?? "gemma4:e2b",
  maxChunkSize: process.env.MAX_CHUNK_SIZE ?? 200,
  topK: process.env.TOP_K ?? 5,
  retrievalThreshold: process.env.RETRIEVAL_THRESHOLD ?? 0.9,
});

if (!parsedConfig.success) {
  throw new Error(
    `Invalid configuration.\n${z.prettifyError(parsedConfig.error)}`,
  );
}

export const config = parsedConfig.data;
