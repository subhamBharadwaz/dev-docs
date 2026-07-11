import { chroma } from "./client.js";

export async function getDocsCollection() {
  return chroma.getOrCreateCollection({
    name: "documentation",
  });
}
