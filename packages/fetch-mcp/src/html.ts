import * as cheerio from "cheerio";

export function loadDocument(html: string) {
  const $ = cheerio.load(html);

  const title = $("title").text().trim();

  const selectors = [
    // Documentation sites
    "article[data-docs-container]",
    "[data-docs='true']",
    ".markdown-body",

    // Blogs
    "article",

    // Generic applications
    "main article",

    // Generic websites
    "main",

    "[role='main']",

    // Final fallback
    "body",
  ];

  for (const selector of selectors) {
    const root = $(selector).first();
    if (root.length > 0) {
      return {
        title,
        $,
        root,
      };
    }
  }

  throw new Error("Unable to locate the main document content.");
}
