import { Reranker } from "../../types/rerank.js";
import type { SearchResult } from "../../types/search.js";

const SEMANTIC_WEIGHT = 0.7;
const KEYWORD_WEIGHT = 0.3;

export class WeightedScoreReranker implements Reranker {
  async rerank(results: SearchResult[]): Promise<SearchResult[]> {
    const maxKeyword = Math.max(...results.map((r) => r.keywordScore), 1);

    for (const result of results) {
      const normalizedKeyword = result.keywordScore / maxKeyword;

      result.rerankScore =
        result.semanticScore * SEMANTIC_WEIGHT +
        normalizedKeyword * KEYWORD_WEIGHT;
    }

    return [...results].sort((a, b) => b.rerankScore - a.rerankScore);
  }
}
