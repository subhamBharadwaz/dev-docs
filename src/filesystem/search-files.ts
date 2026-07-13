import { listDocs } from "./list-docs.js";

export async function searchFiles(query: string): Promise<string[]> {
  const docs = await listDocs();

  const normalizedQuery = query.toLowerCase();

  return docs.filter((doc) => doc.toLowerCase().includes(normalizedQuery));
}
