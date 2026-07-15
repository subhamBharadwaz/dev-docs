import type { RetrievedChunk } from "./query.js";

export interface SearchResult {
  chunk: RetrievedChunk;

  semanticScore: number;
  keywordScore: number;
  rerankScore: number;
}
