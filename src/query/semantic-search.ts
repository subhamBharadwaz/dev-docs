import { retrieve } from "./retrieve.js";
import type { SearchResult } from "../types/search.js";

export async function semanticSearch(query: string): Promise<SearchResult[]> {
  const chunks = await retrieve(query);

  return chunks.map((chunk) => ({
    chunk,
    semanticScore: 1 - chunk.distance,
    keywordScore: 0,
    finalScore: 1 - chunk.distance,
  }));
}
