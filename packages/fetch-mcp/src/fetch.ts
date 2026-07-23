import { fetch } from "undici";

import type { FetchResult } from "./types.js";

export async function fetchPage(url: string): Promise<FetchResult> {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "DevDocs-MCP/0.1",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${url} (${response.status} ${response.statusText})`,
    );
  }

  const html = await response.text();

  const title = html.match(/<title>(.*?)<\/title>/i)?.[1]?.trim() ?? "Untitled";

  return {
    url,
    title,
    html,
  };
}
