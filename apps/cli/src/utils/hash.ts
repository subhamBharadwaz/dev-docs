// utils/hash.ts
import { createHash } from "node:crypto";

export function generateChunkId(sourceFile: string, chunkText: string): string {
  return createHash("sha256")
    .update(`${sourceFile}\n${chunkText}`)
    .digest("hex");
}
