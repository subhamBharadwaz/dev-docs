import { hybridSearch } from "./hybrid-search.js";
import { groupChunks } from "./group-chunks.js";
import { RetrievedChunk } from "../types/query.js";

export interface RetrievalOptions {
  topK?: number;
}

export class RetrievalPipeline {
  async retrieve(query: string, options: RetrievalOptions = {}) {
    const chunks = await this.retrieveChunks(query);

    return this.groupDocuments(chunks);
  }

  private async retrieveChunks(query: string) {
    return hybridSearch(query);
  }

  private groupDocuments(chunks: RetrievedChunk[]) {
    return groupChunks(chunks);
  }
}

export const retrievalPipeline = new RetrievalPipeline();
