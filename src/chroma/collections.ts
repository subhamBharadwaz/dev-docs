import { config } from "../config.js";
import { chroma } from "./client.js";

export async function getDocsCollection() {
  return chroma.getOrCreateCollection({
    name: config.chromaCollectionName,
  });
}
