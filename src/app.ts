import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { storeChunks } from "./chroma/store.js";
import { config } from "./config.js";
import { embedChunks } from "./embeddings/embedChunks.js";
import { evaluateRetrieval } from "./evaluation/evaluate.js";
import { chunkDocuments } from "./ingest/chunk.js";
import { loadDocuments } from "./ingest/load.js";
import { ask } from "./services/ask.js";

export interface AppDependencies {
  ask: (question: string) => Promise<void>;
  loadDocuments: typeof loadDocuments;
  chunkDocuments: typeof chunkDocuments;
  embedChunks: typeof embedChunks;
  storeChunks: typeof storeChunks;
  evaluateRetrieval: typeof evaluateRetrieval;
  createInterface: typeof createInterface;
  stdin: typeof stdin;
  stdout: typeof stdout;
  log: (message?: string) => void;
}

const defaultDependencies: AppDependencies = {
  ask,
  loadDocuments,
  chunkDocuments,
  embedChunks,
  storeChunks,
  evaluateRetrieval,
  createInterface,
  stdin,
  stdout,
  log: console.log,
};

export function createApp(overrides: Partial<AppDependencies> = {}) {
  const deps = { ...defaultDependencies, ...overrides };

  async function chat() {
    const rl = deps.createInterface({
      input: deps.stdin,
      output: deps.stdout,
    });

    deps.log("Dev Docs Chat");
    deps.log("Type 'exit' to quit.\n");

    try {
      while (true) {
        const question = await rl.question("You> ");

        if (!question.trim()) {
          continue;
        }

        if (question.trim().toLowerCase() === "exit") {
          break;
        }

        deps.log("\nSearching documentation...");
        await deps.ask(question);
      }
    } finally {
      rl.close();
    }
  }

  async function ingest() {
    deps.log(`Loading documents from ${config.docsPath}...`);
    const documents = await deps.loadDocuments();

    deps.log(`Chunking ${documents.length} documents...`);
    const chunks = deps.chunkDocuments(documents, {
      maxChunkSize: config.maxChunkSize,
    });

    deps.log(`Embedding ${chunks.length} chunks with ${config.embeddingModel}...`);
    const embeddedChunks = await deps.embedChunks(chunks);

    deps.log(`Storing ${embeddedChunks.length} chunks in Chroma...`);
    await deps.storeChunks(embeddedChunks);
    deps.log("Ingestion complete.");
  }

  async function main(args: string[]) {
    const [command, ...rest] = args;

    switch (command) {
      case "ingest":
        await ingest();
        return;

      case "ask": {
        const question = rest.join(" ").trim();

        if (!question) {
          throw new Error('Missing question. Usage: pnpm start ask "What is streaming?"');
        }

        deps.log("Searching documentation...");
        await deps.ask(question);
        return;
      }

      case "chat":
        await chat();
        return;

      case "evaluate":
        deps.log("Running retrieval evaluation...");
        await deps.evaluateRetrieval();
        return;

      default:
        deps.log([
          "Usage:",
          "",
          'pnpm start ingest',
          'pnpm start ask "What is streaming?"',
          'pnpm start chat',
          'pnpm start evaluate',
        ].join("\n"));
    }
  }

  return {
    chat,
    ingest,
    main,
  };
}
