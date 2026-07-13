import { ModelMessage, stepCountIs, streamText } from "ai";
import { chatModel } from "../ollama/chat.js";
import { instructions } from "../chat/instructions.js";
import { tools } from "../tools/index.js";

export function streamAnswer(messages: ModelMessage[]) {
  return streamText({
    model: chatModel,
    instructions,
    messages,
    tools,
    stopWhen: stepCountIs(5),
  });
}
