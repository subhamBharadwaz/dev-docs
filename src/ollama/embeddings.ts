import { ollama } from "ai-sdk-ollama";
import { config } from "../config.js";

export const embeddingModel = ollama.embeddingModel(config.embeddingModel);
