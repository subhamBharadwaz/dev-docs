# dev-docs

A small local RAG playground for developer documentation.

This project:
- loads Markdown files from `docs/`
- chunks them into smaller passages
- embeds them with an Ollama embedding model
- stores vectors in Chroma
- retrieves relevant chunks for a question
- answers with an Ollama chat model
- prints retrieved sources in the CLI

## Stack

- TypeScript
- [`ai`](https://www.npmjs.com/package/ai)
- [`ai-sdk-ollama`](https://www.npmjs.com/package/ai-sdk-ollama)
- [`chromadb`](https://www.npmjs.com/package/chromadb)
- Ollama
- local Markdown docs in `docs/`

## Project structure

```text
src/
  chat/         Prompt/message building
  chroma/       Chroma collection and storage
  context/      Context assembly for answers
  embeddings/   Embedding generation
  evaluation/   Retrieval evaluation test cases
  ingest/       Document loading + chunking
  llm/          Answer streaming
  ollama/       Ollama model setup
  query/        Retrieval pipeline
  types/        Shared types
  utils/        Helpers

docs/           Source documents used for RAG
```

## Requirements

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/installation)
- [Ollama](https://ollama.com/download)

## Ollama setup

Install Ollama first:
- https://ollama.com/download

Then pull the models used by this project.

### Models used

| Purpose | Model | Config value | Pull command | Link |
|---|---|---:|---|---|
| Embeddings | `nomic-embed-text` | `nomic-embed-text:latest` | `ollama pull nomic-embed-text` | https://ollama.com/library/nomic-embed-text |
| Chat / answer generation | `gemma4` | `gemma4:e2b` | `ollama pull gemma4:e2b` | https://ollama.com/library/gemma4 |

These values come from `src/config.ts`.

If you want to change models later, update:
- `src/config.ts`

Current defaults:

```ts
embeddingModel: "nomic-embed-text:latest"
chatModel: "gemma4:e2b"
```

## Chroma setup

This project uses the `chromadb` Node package directly.

You do **not** need to add a remote Chroma instance for local usage.

For this repo's current setup:
- Chroma is created from `new ChromaClient({})`
- a local collection named `documentation` is used
- local Chroma data files are created when you run ingestion

After running ingestion, you may see local Chroma data created in the project directory, such as:
- `getting-started/`
- `chroma.sqlite3`

Those generated files are ignored by Git.

## Install dependencies

```sh
pnpm install
```

## Getting started

### 1. Pull the Ollama models

```sh
ollama pull nomic-embed-text
ollama pull gemma4:e2b
```

### 2. Install project dependencies

```sh
pnpm install
```

### 3. Ingest the docs into Chroma

```sh
pnpm start ingest
```

### 4. Ask a question

```sh
pnpm start ask "What is streaming?"
```

### 5. Run retrieval evaluation

```sh
pnpm start evaluate
```

## Available commands

| Command | What it does |
|---|---|
| `pnpm start ingest` | Loads files from `docs/`, chunks them, embeds them, and stores them in Chroma |
| `pnpm start ask "..."` | Retrieves relevant chunks and streams an answer |
| `pnpm start evaluate` | Runs retrieval checks from `src/evaluation/test-cases.ts` |
| `pnpm dev ingest` | Same as ingest, but through `tsx watch` |
| `pnpm dev ask "..."` | Same as ask, but through `tsx watch` |
| `pnpm build` | Compiles TypeScript to `dist/` |
| `pnpm typecheck` | Runs TypeScript type checking |

## Example session

Ingest:

```sh
pnpm start ingest
```

Ask:

```sh
pnpm start ask "How does retrieval improve answers?"
```

Expected CLI flow:
- retrieved chunks are printed first
- the answer is streamed to stdout
- sources are listed at the end

## Configuration

Main runtime configuration lives in:
- `src/config.ts`

Current options:
- `docsPath`: source docs folder
- `embeddingModel`: Ollama embedding model
- `chatModel`: Ollama chat model
- `maxChunkSize`: chunk length target
- `topK`: number of retrieved results
- `retrievalThreshold`: distance cutoff for keeping matches

## Notes

- Source documents are expected in `docs/`
- Answers are intended to use retrieved context only
- Retrieval evaluation cases live in `src/evaluation/test-cases.ts`
- This repo is set up for local experimentation, not production deployment

## Troubleshooting

### Ollama model not found

Pull the missing model manually:

```sh
ollama pull nomic-embed-text
ollama pull gemma4:e2b
```

### No relevant documentation found

Run ingestion first:

```sh
pnpm start ingest
```

### Type errors

```sh
pnpm typecheck
```

### Chroma data looks stale

Remove local generated Chroma data and ingest again.

Typical generated artifacts are:
- `getting-started/`
- `chroma.sqlite3`

Then rerun:

```sh
pnpm start ingest
```

## License

ISC
