import { retrievalPipeline } from "./pipeline.js";
import type { RetrievedChunk } from "../types/query.js";

export async function retrieve(query: string): Promise<RetrievedChunk[]> {
  const results = await retrievalPipeline.retrieveResults(query);

  return results.map((result) => result.chunk);
}
