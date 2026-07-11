export interface Chunk {
  id: string;
  text: string;
  sourceFile: string;
  chunkIndex: number;
}

export interface EmbeddedChunk extends Chunk {
  embedding: number[];
}
