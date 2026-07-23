import { fetchPage } from "./fetch.js";
import { loadDocument } from "./html.js";
import { normalizeMarkdown } from "./normalize.js";
import { rewriteLinks } from "./links.js";
import { toMarkdown } from "./markdown.js";
import { sanitizeDocument } from "./sanitize.js";

export interface FetchedDocument {
  url: string;
  title: string;
  markdown: string;
}

export async function fetchDocument(url: string): Promise<FetchedDocument> {
  const page = await fetchPage(url);

  const { $, root, title } = loadDocument(page.html);

  sanitizeDocument(root);

  rewriteLinks($, root, page.url);

  const markdown = normalizeMarkdown(toMarkdown(root.html() ?? ""));

  return {
    url: page.url,
    title,
    markdown,
  };
}
