import type { SearchResult } from "./search.js";

export interface Reranker {
  rerank(results: SearchResult[]): Promise<SearchResult[]>;
}

export interface RerankerProvider {
  score(query: string, documents: string[]): Promise<number[]>;
}
