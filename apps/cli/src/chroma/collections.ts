import { config } from "../config.js";
import { chroma } from "./client.js";
import { getPrecomputedEmbeddingFunction } from "./precomputed-embedding-function.js";

export async function getDocsCollection() {
  return chroma.getOrCreateCollection({
    name: config.chromaCollectionName,
    embeddingFunction: getPrecomputedEmbeddingFunction(),
  });
}
