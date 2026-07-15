import { Reranker } from "../../types/rerank.js";
import type { SearchResult } from "../../types/search.js";

const K = 60;

function reciprocalRank(rank: number) {
  return 1 / (K + rank);
}

export class ReciprocalRankFusionReranker implements Reranker {
  async rerank(results: SearchResult[]): Promise<SearchResult[]> {
    const semanticRanking = [...results].sort(
      (a, b) => b.semanticScore - a.semanticScore,
    );

    const keywordRanking = [...results].sort(
      (a, b) => b.keywordScore - a.keywordScore,
    );

    const semanticRanks = new Map<string, number>();
    const keywordRanks = new Map<string, number>();

    semanticRanking.forEach((result, index) => {
      semanticRanks.set(result.chunk.id, index + 1);
    });

    keywordRanking.forEach((result, index) => {
      keywordRanks.set(result.chunk.id, index + 1);
    });

    for (const result of results) {
      result.rerankScore =
        reciprocalRank(
          semanticRanks.get(result.chunk.id) ?? Number.MAX_SAFE_INTEGER,
        ) +
        reciprocalRank(
          keywordRanks.get(result.chunk.id) ?? Number.MAX_SAFE_INTEGER,
        );
    }

    return [...results].sort((a, b) => b.rerankScore - a.rerankScore);
  }
}
