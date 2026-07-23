import { registerEmbeddingFunction, type EmbeddingFunction } from "chromadb";

const EMBEDDING_FUNCTION_NAME = "precomputed-embedding";

export class PrecomputedEmbeddingFunction implements EmbeddingFunction {
  name = EMBEDDING_FUNCTION_NAME;

  static buildFromConfig(): PrecomputedEmbeddingFunction {
    return new PrecomputedEmbeddingFunction();
  }

  getConfig(): Record<string, never> {
    return {};
  }

  async generate(): Promise<number[][]> {
    throw new Error(
      "This collection uses precomputed embeddings. Pass embeddings/queryEmbeddings explicitly instead of relying on Chroma to generate them.",
    );
  }
}

let registered = false;

export function getPrecomputedEmbeddingFunction() {
  if (!registered) {
    registerEmbeddingFunction(
      EMBEDDING_FUNCTION_NAME,
      PrecomputedEmbeddingFunction,
    );
    registered = true;
  }

  return new PrecomputedEmbeddingFunction();
}
