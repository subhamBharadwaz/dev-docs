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

  const result = await execute({
    history: getHistory(),
  });

  let answer = "";

  for await (const text of result.textStream) {
    answer += text;
  }

  addAssistantMessage(answer);

  const toolCalls = await result.toolCalls;

  return {
    answer,
    toolCalls,
  };
}
