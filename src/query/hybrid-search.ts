import { semanticSearch } from "./semantic-search.js";
import { keywordSearch } from "./keyword-search.js";

import type { SearchResult } from "../types/search.js";

export async function hybridSearch(query: string): Promise<SearchResult[]> {
  const semantic = await semanticSearch(query);
  const keyword = await keywordSearch(query);

  const merged = new Map<string, SearchResult>();

  // Add semantic results first
  for (const result of semantic) {
    merged.set(result.chunk.id, result);
  }

  // Merge keyword results
  for (const result of keyword) {
    const existing = merged.get(result.chunk.id);

    if (!existing) {
      merged.set(result.chunk.id, result);
      continue;
    }

    existing.keywordScore = result.keywordScore;
  }

  const results = [...merged.values()];

  return results;
}
