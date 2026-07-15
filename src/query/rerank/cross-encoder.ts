import { Reranker } from "../../types/rerank.js";
import type { SearchResult } from "../../types/search.js";

export class CrossEncoderReranker implements Reranker {
  async rerank(results: SearchResult[]): Promise<SearchResult[]> {
    throw new Error("Cross Encoder reranker not implemented yet.");
  }
}
