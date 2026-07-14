import { semanticSearch } from "./semantic-search.js";
import { keywordSearch } from "./keyword-search.js";

import type { RetrievedChunk } from "../types/query.js";
import type { SearchResult } from "../types/search.js";

export async function hybridSearch(query: string): Promise<RetrievedChunk[]> {
  const semantic = await semanticSearch(query);
  const keyword = await keywordSearch(query);

  const merged = new Map<string, SearchResult>();

  // Add semantic results first
  for (const result of semantic) {
    merged.set(result.chunk.id, { ...result });
  }

  // Merge keyword results
  for (const result of keyword) {
    const existing = merged.get(result.chunk.id);

    if (!existing) {
      merged.set(result.chunk.id, { ...result });
      continue;
    }

    existing.keywordScore = result.keywordScore;

    existing.finalScore = existing.semanticScore + existing.keywordScore;
  }

  return [...merged.values()]
    .sort((a, b) => b.finalScore - a.finalScore)
    .map((result) => result.chunk);
}
