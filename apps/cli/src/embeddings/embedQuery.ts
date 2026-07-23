import { embed } from "ai";
import { embeddingModel } from "../ollama/embeddings.js";

export async function embedQuery(question: string): Promise<number[]> {
  const { embedding } = await embed({
    model: embeddingModel,
    value: question,
  });
  return embedding;
}
