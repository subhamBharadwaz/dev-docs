import { readdir } from "node:fs/promises";
import { join } from "node:path";

import { config } from "../config.js";

export async function listDocs(): Promise<string[]> {
  const files = await readdir(join(process.cwd(), config.docsPath));

  return files.filter((file) => file.endsWith(".md"));
}
