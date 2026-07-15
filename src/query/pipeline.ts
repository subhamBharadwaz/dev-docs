import { hybridSearch } from "./hybrid-search.js";
import { reranker } from "./rerank/index.js";
import { groupChunks } from "./group-chunks.js";

import type { SearchResult } from "../types/search.js";

export interface RetrievalOptions {
  topK?: number;
}

export class RetrievalPipeline {
  async retrieveResults(
    query: string,
    options: RetrievalOptions = {},
  ): Promise<SearchResult[]> {
    const results = await hybridSearch(query);

    return reranker.rerank(results);
  }

  async retrieve(query: string, options: RetrievalOptions = {}) {
    const results = await this.retrieveResults(query, options);

    const chunks = results.map((r) => r.chunk);

    return groupChunks(chunks);
  }
}

export const retrievalPipeline = new RetrievalPipeline();
