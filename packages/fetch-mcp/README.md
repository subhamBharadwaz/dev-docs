# `@dev-docs/fetch-mcp`

A Model Context Protocol (MCP) server package that provides webpage content fetching and HTML-to-Markdown processing for LLM tools.

## Features

- **`fetch_url` tool**: Fetches a given URL and returns cleaned Markdown content suitable for LLM consumption.
- **Content extraction & sanitization**: Uses Cheerio and Turndown to extract main content, remove unwanted boilerplate/scripts, and sanitize HTML into clean Markdown.
- **`robots.txt` compliance**: Automatically checks and respects site `robots.txt` rules before fetching documents.
- **Link extraction**: Normalizes and extracts internal/external links from fetched pages.

## Tool Definition

### `fetch_url`

- **Description**: Fetch a webpage, extract its primary content, and return clean Markdown.
- **Input Schema**:
  ```json
  {
    "url": "https://example.com"
  }
  ```

## Usage

### Standalone / Dev Server

```sh
pnpm dev
```

### Integration in MCP Clients

Connect via stdio transport:

```json
{
  "mcpServers": {
    "fetch": {
      "command": "pnpm",
      "args": ["--filter", "@dev-docs/fetch-mcp", "dev"]
    }
  }
}
```

## Scripts

- `pnpm dev`: Runs the MCP server with TSX
- `pnpm build`: Compiles TypeScript to `dist/`
- `pnpm typecheck`: Validates TypeScript types

