import assert from "node:assert/strict";
import { mkdtemp, rm, writeFile, mkdir } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { createApp } from "./app.js";
import { MarkdownDocumentLoader } from "./ingest/loaders/markdown-loader.js";

async function withTempDir(run: (tempDir: string) => Promise<void>) {
  const tempDir = await mkdtemp(path.join(os.tmpdir(), "dev-docs-"));

  try {
    await run(tempDir);
  } finally {
    await rm(tempDir, { recursive: true, force: true });
  }
}

test("MarkdownDocumentLoader loads sorted markdown files and ignores non-markdown files", async () => {
  await withTempDir(async (tempDir) => {
    const originalCwd = process.cwd();
    const docsDir = path.join(tempDir, "docs");

    await mkdir(docsDir, { recursive: true });
    await writeFile(path.join(docsDir, "b.md"), "second");
    await writeFile(path.join(docsDir, "a.md"), "first");
    await writeFile(path.join(docsDir, "notes.txt"), "ignore me");

    process.chdir(tempDir);

    try {
      const documents = await new MarkdownDocumentLoader().loadDocuments();

      assert.deepEqual(
        documents.map((document) => document.fileName),
        ["a.md", "b.md"],
      );
    } finally {
      process.chdir(originalCwd);
    }
  });
});

test("MarkdownDocumentLoader throws a helpful error when no markdown files are present", async () => {
  await withTempDir(async (tempDir) => {
    const originalCwd = process.cwd();
    const docsDir = path.join(tempDir, "docs");

    await mkdir(docsDir, { recursive: true });
    await writeFile(path.join(docsDir, "notes.txt"), "ignore me");

    process.chdir(tempDir);

    try {
      await assert.rejects(
        () => new MarkdownDocumentLoader().loadDocuments(),
        /No Markdown documents were found/,
      );
    } finally {
      process.chdir(originalCwd);
    }
  });
});

test("createApp runs ingest with loading indicators and the expected sequence", async () => {
  const calls: string[] = [];
  const logs: string[] = [];

  class MockMarkdownDocumentLoader {
    async loadDocuments() {
      calls.push("loadDocuments");
      return [{ fileName: "a.md", content: "hello world" }];
    }
  }

  const app = createApp({
    log: (message = "") => logs.push(message),
    MarkdownDocumentLoader:
      MockMarkdownDocumentLoader as typeof MarkdownDocumentLoader,
    chunkDocuments: (documents) => {
      calls.push(`chunkDocuments:${documents.length}`);
      return [{ id: "1", text: "hello", sourceFile: "a.md", chunkIndex: 0 }];
    },
    embedChunks: async (chunks) => {
      calls.push(`embedChunks:${chunks.length}`);
      return [{ ...chunks[0], embedding: [0.1, 0.2] }];
    },
    storeChunks: async (chunks) => {
      calls.push(`storeChunks:${chunks.length}`);
    },
  });

  await app.main(["ingest"]);

  assert.deepEqual(calls, [
    "loadDocuments",
    "chunkDocuments:1",
    "embedChunks:1",
    "storeChunks:1",
  ]);

  assert.ok(logs.some((message) => message.includes("Loading documents")));
  assert.ok(logs.some((message) => message.includes("Chunking documents")));
  assert.ok(logs.some((message) => message.includes("Created 1 chunks")));
  assert.ok(logs.some((message) => message.includes("Generating embeddings")));
  assert.ok(logs.some((message) => message.includes("Ingestion complete")));
});

test("createApp returns a clear error when ask is missing a question", async () => {
  const app = createApp();

  await assert.rejects(
    () => app.main(["ask"]),
    /Missing question\. Usage: pnpm start ask/,
  );
});
