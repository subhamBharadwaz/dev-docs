import { queryChroma } from "./query-chroma.js";

export async function semanticSearch(query: string) {
  return queryChroma(query);
}
