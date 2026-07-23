import type { Cheerio } from "cheerio";

export function sanitizeDocument(root: Cheerio<any>) {
  const selectors = [
    "script",
    "style",
    "noscript",

    "header",
    "footer",
    "nav",
    "aside",

    "iframe",

    "form",
    "button",
    "textarea",
    "input",

    "svg",

    ".sidebar",
    ".navigation",
    ".menu",
    ".toc",
    ".table-of-contents",

    ".cookie",
    ".cookies",
    ".banner",
    ".ads",
    ".advertisement",

    "[role='navigation']",
    "[role='banner']",
    "[role='complementary']",
  ];

  for (const selector of selectors) {
    root.find(selector).remove();
  }

  root.find('a[href^="#"]').remove();
}
