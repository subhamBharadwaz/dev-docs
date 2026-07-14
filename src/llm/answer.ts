import { ModelMessage, streamText } from "ai";
import { llmOptions } from "./options.js";

export function streamAnswer(messages: ModelMessage[]) {
  return streamText({
    ...llmOptions,
    messages,
  });
}
