import { ollama } from "ai-sdk-ollama";
import { config } from "../config.js";

export const chatModel = ollama(config.chatModel);
