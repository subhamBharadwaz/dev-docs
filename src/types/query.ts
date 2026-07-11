export interface QueryEmbedding {
  vector: number[];
  model?: string;
}
export interface RetrievedChunk {
  id: string;
  text: string;
  sourceFile: string;
  chunkIndex: number;
  distance: number;
}

export interface ChunkMetadata {
  sourceFile: string;
  chunkIndex: number;
}
