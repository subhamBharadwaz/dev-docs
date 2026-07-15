import { ModelMessage, streamText } from "ai";

import { llmOptions } from "./options.js";
import { loadTools } from "../tools/loader.js";

export async function streamAnswer(messages: ModelMessage[]) {
  const tools = await loadTools();

  const result = streamText({
    ...llmOptions,
    messages,
    tools,
  });

  return {
    result,
  };
}
