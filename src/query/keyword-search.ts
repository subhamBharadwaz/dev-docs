import { getDocsCollection } from "../chroma/collections.js";
import { SearchResult } from "../types/search.js";

export async function keywordSearch(query: string): Promise<SearchResult[]> {
  const collection = await getDocsCollection();

  const result = await collection.get({
    include: ["documents", "metadatas"],
  });

  const words = query.toLowerCase().split(/\W+/).filter(Boolean);

  const documents = result.documents ?? [];
  const metadatas = result.metadatas ?? [];
  const ids = result.ids ?? [];

  const matches: SearchResult[] = [];

  for (let index = 0; index < documents.length; index++) {
    const document = documents[index];
    const metadata = metadatas[index];

    if (!document || !metadata) {
      continue;
    }

    const text = document.toLowerCase();

    let score = 0;

    for (const word of words) {
      if (text.includes(word)) {
        score++;
      }
    }

    if (score === 0) {
      continue;
    }

    matches.push({
      chunk: {
        id: ids[index],
        text: document,
        sourceFile: metadata.sourceFile as string,
        chunkIndex: metadata.chunkIndex as number,

        distance: Number.POSITIVE_INFINITY,
      },

      semanticScore: 0,
      keywordScore: score,
      finalScore: score,
    });
  }

  matches.sort((a, b) => b.keywordScore - a.keywordScore);

  return matches;
}
