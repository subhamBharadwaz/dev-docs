# dev-docs

> 🚧 **Project Status:** This project is currently under active development and is continuously evolving with new features, architectural improvements, and production-ready capabilities.

Dev Docs is a production-style **Retrieval-Augmented Generation (RAG)** assistant built with **TypeScript**, **Vercel AI SDK**, **Ollama**, and **ChromaDB**. It demonstrates modern RAG architecture with document ingestion, hybrid retrieval, AI SDK tool calling, conversation memory, and an automated evaluation framework for measuring retrieval and answer quality. The project is being developed as a comprehensive reference for building production-ready AI documentation assistants using modern AI engineering practices.

The CLI can:

- ingest Markdown docs from `docs/`
- ingest a single PDF from a file path
- answer questions with an Ollama-backed agent
- stream responses while the model uses retrieval and MCP filesystem tools
- inspect keyword-only or reranked hybrid retrieval results
- run retrieval-only or answer-level evaluations

## Architecture

```mermaid
flowchart LR
    A[Markdown docs / PDF] --> B[Document loaders]
    B --> C[Chunker]
    C --> D[Embeddings]
    D --> E[(Chroma collection)]

    Q[User question] --> H[Conversation history]
    H --> M[Message builder]
    Q --> P[Agent execution]
    M --> P
    P --> LLM[Ollama chat model]
    LLM --> T1[retrieve]
    LLM --> T2[MCP filesystem tools]
    T1 --> R[Hybrid retrieval pipeline]
    R --> S[Semantic search]
    R --> K[Keyword search]
    R --> RR[Reranker]
    S --> E
    K --> E
    T2 --> F[Filesystem MCP server]
    LLM --> O[Streamed answer]
```

## Current capabilities

The project currently supports these features:

- hybrid retrieval that combines semantic search from Chroma with keyword search over stored chunks
- configurable reranking via `RERANKER=weighted-score|rrf|cross-encoder` with working weighted-score and reciprocal-rank-fusion strategies
- a retrieval pipeline that can return reranked chunk results or grouped document-style outputs for tools
- streamed answer generation in both one-shot ask mode and interactive chat mode
- built-in `retrieve` tool support for the model during answer generation
- MCP-based tool loading, currently wired to a filesystem server started through `mcp-server-filesystem`
- automatic MCP client cleanup on process exit
- a debug-friendly `hybrid` command that prints semantic, keyword, and rerank scores per chunk
- PDF and Markdown ingestion into the same Chroma-backed knowledge base
- retrieval and answer evaluation flows for checking source coverage and answer content
- chat history reset via `/clear`

In short, the app is now a tool-using RAG assistant with hybrid retrieval, reranking, streaming responses, and MCP tool integration.

## Stack

- TypeScript
- [`ai`](https://www.npmjs.com/package/ai)
- [`ai-sdk-ollama`](https://www.npmjs.com/package/ai-sdk-ollama)
- [`chromadb`](https://www.npmjs.com/package/chromadb)
- [`@ai-sdk/mcp`](https://www.npmjs.com/package/@ai-sdk/mcp)
- [`@modelcontextprotocol/sdk`](https://www.npmjs.com/package/@modelcontextprotocol/sdk)
- [`pdf-parse`](https://www.npmjs.com/package/pdf-parse)
- [`zod`](https://www.npmjs.com/package/zod)
- Ollama

## Requirements

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/installation)
- [Ollama](https://ollama.com/download)

## Project structure

```text
src/
  agent/                 Agent execution entrypoints
  chat/                  Prompt building and conversation history
  chroma/                Chroma client, collections, and storage
  cli/                   Console output helpers
  embeddings/            Embedding generation for docs and queries
  evaluation/            Retrieval and answer evaluation runners
  filesystem/            File listing helpers for docs/
  ingest/                Chunking and document loaders
  llm/                   Shared LLM options and answer streaming
  ollama/                Ollama model setup
  mcp/                   MCP client setup and tool loading
  query/                 Semantic, keyword, hybrid, and reranking retrieval
  repository/            Full document reads for Markdown and PDF
  services/              High-level ask, answer, and ingest flows
  tools/                 Model-exposed tools
  tracing/               Tracing scaffolds for future instrumentation
  types/                 Shared domain types
  utils/                 Small utility helpers

docs/                    Markdown knowledge base
knowledge/pdfs/          Local PDFs readable by repository tools
```

## Tooling available to the agent

| Tool family | Purpose |
| --- | --- |
| `retrieve` | Returns relevant documentation content via the retrieval pipeline |
| MCP filesystem tools | Loaded at runtime from `mcp-server-filesystem`, allowing the model to use filesystem-backed tools exposed through MCP |

The model instructions live in `src/chat/instructions.ts`, and shared model settings live in `src/llm/options.ts`.

## Retrieval pipeline

The retrieval flow now has separate steps:

1. `semanticSearch()` retrieves vector matches from Chroma through `queryChroma()`
2. `keywordSearch()` scores literal term matches across stored chunks
3. `hybridSearch()` merges semantic and keyword results into shared `SearchResult` records
4. the configured reranker scores and sorts the merged results
5. `groupChunks()` can combine adjacent chunks from the same source into document-like outputs for tools

This gives the app both score-level retrieval debugging and cleaner document-shaped outputs for downstream tool use.

## Ingestion

### Markdown

```sh
pnpm start ingest
```

Equivalent to:

```sh
pnpm start ingest markdown
```

### PDF

```sh
pnpm start ingest pdf ./knowledge/pdfs/handbook.pdf
```

PDF ingestion uses `PdfLoader` and stores the extracted text as chunks in Chroma.

## Ollama setup

Pull the default models:

```sh
ollama pull nomic-embed-text
ollama pull gemma4:e2b
```

## Configuration

Start from:

```sh
cp .env.example .env
```

Runtime configuration is validated in `src/config.ts`.

| Variable                 | Default                   | Description                                  |
| ------------------------ | ------------------------- | -------------------------------------------- |
| `DOCS_PATH`              | `docs`                    | Directory containing Markdown docs           |
| `CHROMA_COLLECTION_NAME` | `documentation`           | Chroma collection name                       |
| `EMBEDDING_MODEL`        | `nomic-embed-text:latest` | Ollama embedding model                       |
| `CHAT_MODEL`             | `gemma4:e2b`              | Ollama chat model                            |
| `MAX_CHUNK_SIZE`         | `200`                     | Target chunk size                            |
| `TOP_K`                  | `5`                       | Max retrieved chunks                         |
| `RETRIEVAL_THRESHOLD`    | `0.9`                     | Distance cutoff for semantic retrieval       |
| `MAX_HISTORY_TURNS`      | `5`                       | Number of user turns to keep in chat history |
| `RERANKER`               | `weighted-score`          | Retrieval reranker: `weighted-score`, `rrf`, or `cross-encoder` |

Note: `cross-encoder` is scaffolded in the codebase but not implemented yet.

## Usage

### Ask one question

```sh
pnpm start ask "What is streaming?"
```

### Start chat mode

```sh
pnpm start chat
```

Chat commands:

- `exit` — quit
- `/clear` — clear conversation history

### Run evaluations

```sh
pnpm start evaluate
pnpm start evaluate retrieval
pnpm start evaluate answers
```

### Debug retrieval modes

```sh
pnpm start keyword "semantic search"
pnpm start hybrid "semantic search"
```

## Available commands

| Command                         | What it does                              |
| ------------------------------- | ----------------------------------------- |
| `pnpm start ingest`             | Ingests Markdown docs from `docs/`        |
| `pnpm start ingest markdown`    | Explicit Markdown ingestion               |
| `pnpm start ingest pdf <path>`  | Ingests one PDF file                      |
| `pnpm start ask "..."`          | Generates an answer for a single question |
| `pnpm start chat`               | Starts interactive chat mode              |
| `pnpm start keyword "..."`      | Runs keyword-only retrieval               |
| `pnpm start hybrid "..."`       | Runs hybrid retrieval                     |
| `pnpm start evaluate`           | Runs retrieval and answer evaluations     |
| `pnpm start evaluate retrieval` | Runs retrieval-only evaluation            |
| `pnpm start evaluate answers`   | Runs answer-content evaluation            |
| `pnpm build`                    | Compiles TypeScript to `dist/`            |
| `pnpm typecheck`                | Runs TypeScript type checking             |
| `pnpm test`                     | Runs integration tests                    |

## Evaluation

Evaluation cases live in `src/evaluation/test-cases.ts`.

There are now two evaluation paths:

- retrieval evaluation checks whether required source documents are retrieved
- answer evaluation checks whether generated answers contain expected phrases

Reports are printed through `src/evaluation/report.ts`.

## Troubleshooting

### Ollama model not found

```sh
ollama pull nomic-embed-text
ollama pull gemma4:e2b
```

### No relevant documentation found

Re-run ingestion:

```sh
pnpm start ingest
```

### PDF ingestion fails

Confirm the file path exists and is readable, then retry:

```sh
pnpm start ingest pdf ./path/to/file.pdf
```

### Docs directory cannot be read

Check `DOCS_PATH` in `.env` and make sure it points to a folder containing `.md` files.

### Type errors

```sh
pnpm typecheck
```

## Notes

- answers are generated from tool results and retrieved documentation
- full document reads are handled through `src/repository/document-repository.ts`
- hybrid retrieval is used by both `retrieve` and `findDocs`
- some scaffold files exist for future agent and loader expansion

## License

ISC
