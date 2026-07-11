import { buildMessages } from "./chat/build-messages.js";
import { storeChunks } from "./chroma/store.js";
import { config } from "./config.js";
import { buildContext } from "./context/build-context.js";
import { embedChunks } from "./embeddings/embedChunks.js";
import { evaluateRetrieval } from "./evaluation/evaluate.js";
import { chunkDocuments } from "./ingest/chunk.js";
import { loadDocuments } from "./ingest/load.js";
import { streamAnswer } from "./llm/answer.js";
import { retrieve } from "./query/retrieve.js";

async function ingest() {
  const documents = await loadDocuments();

  const chunks = chunkDocuments(documents, {
    maxChunkSize: config.maxChunkSize,
  });

  const embeddedChunks = await embedChunks(chunks);

  await storeChunks(embeddedChunks);
}

async function ask(question: string) {
  const chunks = await retrieve(question);

  if (chunks.length === 0) {
    console.log("No relevant documentation found.");
    return;
  }

  console.log("\n=== Retrieved Chunks ===\n");

  for (const chunk of chunks) {
    console.log(
      `${chunk.sourceFile} | chunk ${chunk.chunkIndex} | distance: ${chunk.distance.toFixed(3)}`,
    );
  }

  const context = buildContext(chunks);

  const messages = buildMessages(question, context);

  const stream = streamAnswer(messages);

  console.log("\n=== Answer ===\n");
  for await (const text of stream) {
    process.stdout.write(text);
  }

  console.log();
  console.log("\n=== Sources ===\n");

  // Prevent duplicate sources
  const sources = new Set(
    chunks.map((chunk) => `${chunk.sourceFile} (chunk ${chunk.chunkIndex})`),
  );

  for (const source of sources) {
    console.log(`- ${source}`);
  }
}

const command = process.argv[2];

async function main() {
  switch (command) {
    case "ingest":
      await ingest();
      break;

    case "ask": {
      const question = process.argv.slice(3).join(" ");

      if (!question) {
        throw new Error("Please provide a question.");
      }

      await ask(question);
      break;
    }

    case "evaluate":
      await evaluateRetrieval();
      break;

    default:
      console.log(`
Usage:

pnpm dev ingest

pnpm dev ask "What is streaming?"
`);
  }
}

main().catch(console.error);
