import { AsyncIterableStream, ModelMessage, streamText } from "ai";
import { chatModel } from "../ollama/chat.js";
import { instructions } from "../chat/instructions.js";

export function streamAnswer(
  messages: ModelMessage[],
): AsyncIterableStream<string> {
  const result = streamText({
    model: chatModel,
    instructions,
    messages,
  });
  return result.textStream;
}
