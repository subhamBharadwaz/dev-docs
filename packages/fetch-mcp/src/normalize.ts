const MULTIPLE_NEWLINES = /\n{3,}/g;
const TRAILING_WHITESPACE = /[ \t]+$/gm;
const EMPTY_LINK = /\[\]\(#.*?\)/g;

export function normalizeMarkdown(markdown: string): string {
  return (
    markdown
      // Remove heading anchor remnants
      .replace(EMPTY_LINK, "")

      // Remove trailing whitespace
      .replace(TRAILING_WHITESPACE, "")

      // Collapse multiple blank lines
      .replace(MULTIPLE_NEWLINES, "\n\n")

      // Trim beginning/end
      .trim()
  );
}
