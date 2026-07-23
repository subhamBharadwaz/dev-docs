import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { storeChunks } from "./chroma/store.js";
import { embedChunks } from "./embeddings/embedChunks.js";
import { chunkDocuments } from "./ingest/chunk.js";
import { ask } from "./services/ask.js";
import { MarkdownDocumentLoader } from "./ingest/loaders/markdown-loader.js";
import { ingestDocuments } from "./services/ingest.js";
import { PdfLoader } from "./ingest/loaders/pdf-loader.js";
import { DocumentLoader } from "./types/document.js";
import { clearHistory } from "./chat/history.js";
import { keywordSearch } from "./query/keyword-search.js";
import { runEvaluation } from "./evaluation/runner.js";
import { retrievalPipeline } from "./query/pipeline.js";
import { subscribe } from "./agent/emitter.js";

export interface AppDependencies {
  ask: (question: string) => Promise<void>;
  MarkdownDocumentLoader: typeof MarkdownDocumentLoader;
  PdfLoader: typeof PdfLoader;
  chunkDocuments: typeof chunkDocuments;
  embedChunks: typeof embedChunks;
  storeChunks: typeof storeChunks;
  runEvaluation: typeof runEvaluation;
  createInterface: typeof createInterface;
  stdin: typeof stdin;
  stdout: typeof stdout;
  log: (message?: string) => void;
}

const defaultDependencies: AppDependencies = {
  ask,
  MarkdownDocumentLoader,
  PdfLoader,
  chunkDocuments,
  embedChunks,
  storeChunks,
  runEvaluation,
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
    deps.log("Commands:");
    deps.log("  exit   - Quit");
    deps.log("  /clear - Clear conversation history\n");

    let unsubscribe: (() => void) | undefined;

    try {
      unsubscribe = subscribe((event) => {
        switch (event.type) {
          case "planning-start":
            deps.log("Planning...");
            break;

          case "planning-end":
            break;

          case "tool-start":
            deps.log(`Using ${event.tool}...`);
            break;

          case "tool-end":
            deps.log(`Finished ${event.tool}`);
            break;

          case "answer-start":
            deps.log("Generating answer...");
            break;
        }
      });
      while (true) {
        const question = await rl.question("You> ");

        if (!question.trim()) {
          continue;
        }

        if (question.trim().toLowerCase() === "exit") {
          break;
        }

        const input = question.trim();

        if (!input) {
          continue;
        }

        if (input.toLowerCase() === "exit") {
          break;
        }

        if (input === "/clear") {
          clearHistory();
          deps.log("Conversation history cleared.\n");
          continue;
        }
        await deps.ask(question);
      }
    } finally {
      unsubscribe?.();
      rl.close();
    }
  }

  async function ingest(source: string, input?: string) {
    let loader: DocumentLoader;

    switch (source) {
      case "markdown":
        loader = new deps.MarkdownDocumentLoader();
        break;

      case "pdf":
        if (!input) {
          throw new Error(
            "Missing PDF path.\nUsage: pnpm start ingest pdf <path-to-pdf>",
          );
        }

        loader = new deps.PdfLoader(input);
        break;

      default:
        throw new Error(
          `Unknown ingestion source "${source}". Supported sources: markdown, pdf.`,
        );
    }

    await ingestDocuments(loader, {
      log: deps.log,
    });
  }

  async function main(args: string[]) {
    const [command, ...rest] = args;

    switch (command) {
      case "ingest":
        const [source = "markdown", input] = rest;
        await ingest(source, input);
        return;

      case "ask": {
        const question = rest.join(" ").trim();

        if (!question) {
          throw new Error(
            'Missing question. Usage: pnpm start ask "What is streaming?"',
          );
        }

        await deps.ask(question);
        return;
      }

      case "chat":
        await chat();
        return;

      case "keyword": {
        const query = rest.join(" ");

        await keywordSearch(query);

        return;
      }

      case "hybrid": {
        const query = rest.join(" ");

        const results = await retrievalPipeline.retrieveResults(query);

        console.table(
          results.map((r) => ({
            source: r.chunk.sourceFile,
            chunk: r.chunk.chunkIndex,
            semantic: r.semanticScore.toFixed(3),
            keyword: r.keywordScore,
            rerank: r.rerankScore.toFixed(3),
          })),
        );

        return;
      }

      case "evaluate": {
        const mode = (rest[0] ?? "all") as "retrieval" | "answers" | "all";

        deps.log(`Running ${mode} evaluation...`);
        await deps.runEvaluation(mode);

        return;
      }
      default:
        deps.log(
          [
            "Usage:",
            "",
            "pnpm start ingest",
            'pnpm start ask "What is streaming?"',
            "pnpm start chat",
            "pnpm start evaluate",
          ].join("\n"),
        );
    }
  }

  return {
    chat,
    ingest,
    main,
  };
}
