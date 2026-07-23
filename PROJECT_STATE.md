# PROJECT_STATE.md — LLM Context & Progress Snapshot

> 🤖 **For AI Assistants / LLMs:** Read this document at the start of a session to immediately understand the project structure, completed milestones, active capabilities, current stack, and upcoming development roadmap.

---

## 📌 Executive Summary

**Project Name:** `dev-docs`  
**Architecture:** `pnpm` Monorepo (`apps/*`, `packages/*`)  
**Core Purpose:** Developer-focused Retrieval-Augmented Generation (RAG) documentation assistant with Model Context Protocol (MCP) tool integration, hybrid vector/keyword search, pluggable reranking, and evaluation benchmarks.

---

## 🚀 Current Phase & Milestone Status

| Phase | Description | Status | Key Features Delivered |
| --- | --- | --- | --- |
| **Phase 1: Basic RAG & Vector Embeddings** | Document chunking, Ollama vector embeddings, ChromaDB vector store. | ✅ Completed | ChromaDB setup, `nomic-embed-text` embeddings, document chunker. |
| **Phase 2: Hybrid Retrieval & Reranking** | Blending semantic vector search with keyword scoring and rerankers. | ✅ Completed | `hybridSearch()`, term-frequency scoring, `weighted-score`, `rrf` (Reciprocal Rank Fusion), scaffolded `cross-encoder`. |
| **Phase 3: Tool-Aware Agent & Chat Memory** | AI agent with tool access and sliding-window conversation history. | ✅ Completed | Vercel AI SDK integration (`ai`, `ai-sdk-ollama`), built-in `retrieve` tool, `/clear` history control, streaming responses. |
| **Phase 4: Monorepo & MCP Server Integration** | Restructuring to pnpm monorepo and adding Stdio MCP server packages. | ✅ Completed | Workspace layout (`apps/cli`, `packages/fetch-mcp`), `fetch_url` MCP server (`cheerio`, `turndown`, `robots.txt`), `mcp-server-filesystem` client. |
| **Phase 5: Evaluation & Production Readiness** | Benchmarking retrieval recall, answer quality evaluation, and CLI tooling. | 🔄 In Progress | Retrieval & answer evaluation runners, test cases (`test-cases.ts`), CLI reporting formats. |

---

## 🛠️ Complete Capability Inventory

### 1. Document Ingestion Pipeline
- **Markdown Docs:** Ingests Markdown files from `apps/cli/docs/` into ChromaDB.
- **PDF Documents:** Ingests single PDF files (`PdfLoader` via `pdf-parse`) into the shared Chroma collection.
- **Chunking:** Configurable target chunk size (`MAX_CHUNK_SIZE=200`).

### 2. Hybrid Retrieval & Reranking Engine
- **Vector Search:** Queries ChromaDB collection (`CHROMA_COLLECTION_NAME=documentation`).
- **Keyword Search:** Computes literal term matches across ingested chunk text.
- **Pluggable Rerankers:**
  - `weighted-score` (default): Combines normalized vector distance and keyword relevance.
  - `rrf`: Reciprocal Rank Fusion of semantic and keyword rank orders.
  - `cross-encoder`: Scaffolded interface for future cross-encoder model scoring.
- **Grouped Chunking:** `groupChunks()` merges adjacent chunks from the same source file into coherent context blocks for model prompts.

### 3. Model Context Protocol (MCP) Tools
- **`@dev-docs/fetch-mcp` (Stdio MCP Server):**
  - Tool: `fetch_url`
  - Function: Fetches external webpages, strips scripts/styles, respects `robots.txt` policies, extracts links, and converts HTML to clean Markdown via Cheerio & Turndown.
- **`mcp-server-filesystem` Integration:**
  - Gives the agent filesystem reading capabilities at runtime via stdio MCP.

### 4. Interactive Agent & LLM Stack
- **LLM Engine:** Ollama (`CHAT_MODEL=gemma4:e2b`, `EMBEDDING_MODEL=nomic-embed-text`).
- **Framework:** Vercel AI SDK (`ai`, `ai-sdk-ollama`, `@ai-sdk/mcp`).
- **Conversation Memory:** Configurable history window (`MAX_HISTORY_TURNS=5`).
- **Streaming:** Real-time text and tool execution streaming in single-query (`ask`) and interactive (`chat`) modes.

### 5. Evaluation Benchmarks
- **Retrieval Evaluation:** Compares retrieved sources against expected document paths.
- **Answer Evaluation:** Verifies generated answer text against target expected keywords/phrases.

---

## 📁 Repository Structure Map

```text
dev-docs/
├── README.md                      # Monorepo overview & quickstart guide
├── PROJECT_STATE.md               # [THIS FILE] LLM project state & context
├── package.json                   # Root pnpm workspace scripts
├── pnpm-workspace.yaml            # Monorepo workspace configuration
├── tsconfig.base.json             # Shared TypeScript configuration
│
├── apps/
│   └── cli/                       # Dev Docs RAG CLI Application
│       ├── README.md              # CLI app architecture & configuration
│       ├── package.json           # CLI dependencies & run scripts
│       ├── .env.example           # Environment template
│       ├── docs/                  # Markdown knowledge base
│       ├── knowledge/pdfs/        # Sample PDF knowledge files
│       └── src/
│           ├── agent/             # Agent execution loop & prompts
│           ├── chat/              # Chat history & instruction builders
│           ├── chroma/            # ChromaDB client & vector store
│           ├── cli/               # Terminal output formatters
│           ├── embeddings/        # Embedding generators
│           ├── evaluation/        # Retrieval & answer evaluators
│           ├── filesystem/        # Document listing helpers
│           ├── ingest/            # Markdown & PDF document loaders
│           ├── llm/               # Shared LLM options & answer logic
│           ├── mcp/               # Stdio MCP client connectors (Fetch & Filesystem)
│           ├── ollama/            # Ollama model initializers
│           ├── query/             # Hybrid search, keyword search & rerankers
│           ├── repository/        # Full document readers
│           ├── services/          # High-level ask, answer & ingest services
│           ├── tools/             # Built-in LLM tools (retrieve, find-docs, etc.)
│           ├── tracing/           # Event tracer scaffolds
│           └── types/             # Shared TypeScript type definitions
│
└── packages/
    └── fetch-mcp/                 # `@dev-docs/fetch-mcp` Package
        ├── README.md              # Fetch MCP server documentation
        ├── package.json           # MCP server dependencies
        └── src/
            ├── fetch.ts           # HTTP fetch client (undici)
            ├── html.ts            # Cheerio HTML parsing
            ├── markdown.ts        # Turndown HTML -> Markdown converter
            ├── pipeline.ts        # Full fetch-to-markdown pipeline
            ├── robots.ts          # robots.txt validator
            ├── sanitize.ts        # HTML sanitizer
            ├── server.ts          # MCP server initializer
            └── tools/
                └── fetch-url.ts   # fetch_url MCP tool handler
```

---

## ⚡ Quick Reference Commands

```sh
# Workspace Build & Checks
pnpm build                         # Build all packages & apps
pnpm typecheck                     # Typecheck all packages & apps
pnpm test                          # Run unit & integration tests

# RAG CLI Execution (from root)
pnpm chat                          # Launch interactive RAG terminal chat
pnpm cli ask "What is streaming?"   # Run single question with RAG & tools
pnpm ingest                        # Ingest docs/ into ChromaDB
pnpm cli ingest pdf <file-path>    # Ingest a specific PDF file
pnpm evaluate                      # Run retrieval & answer evaluations
pnpm chroma                        # Run local ChromaDB container/server
```

---

## 🎯 Next Steps / Future Development Roadmap

1. **Full Cross-Encoder Reranker:** Implement real cross-encoder model scoring in `apps/cli/src/query/rerank/cross-encoder.ts`.
2. **OpenTelemetry / Tracing Integration:** Connect tracer events in `apps/cli/src/tracing/` to log latency, retrieval scores, and tool execution stats.
3. **Web UI Package (`apps/web`):** Build a Next.js / Vite web UI app sharing backend query services from the monorepo.
4. **Enhanced Site Crawler:** Extend `@dev-docs/fetch-mcp` to support recursive sitemap parsing and multi-page documentation crawling.

---

> 📝 **Note for user:** When starting a new ChatGPT session, simply upload or paste this `PROJECT_STATE.md` file to give the model complete context of where you are in the project!
