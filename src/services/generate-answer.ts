import { execute } from "../agent/execute.js";

import {
  addAssistantMessage,
  addUserMessage,
  getHistory,
} from "../chat/history.js";

export interface ToolCallInfo {
  toolName: string;
}

export async function generateAnswer(question: string) {
  addUserMessage(question);

  const { result } = await execute({
    history: getHistory(),
  });

  const chunks: string[] = [];

  for await (const text of result.textStream) {
    process.stdout.write(text);
    chunks.push(text);
  }

  const answer = chunks.join("");

  addAssistantMessage(answer);

  const toolCalls = await result.toolCalls;

  return {
    answer,
    toolCalls,
  };
}
