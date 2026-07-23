import type { CheerioAPI } from "cheerio";

export function rewriteLinks($: CheerioAPI, root: any, baseUrl: string) {
  const base = new URL(baseUrl);

  root.find("a[href]").each((_: number, element: any) => {
    const href = $(element).attr("href");

    if (!href || href.startsWith("#")) {
      return;
    }

    try {
      $(element).attr("href", new URL(href, base).toString());
    } catch {
      // Ignore malformed URLs
    }
  });
}
