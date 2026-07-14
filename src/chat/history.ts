import { type ModelMessage } from "ai";
import { applyHistoryPolicy } from "./history-policy.js";

let history: ModelMessage[] = [];

function appendMessage(message: ModelMessage): void {
  history.push(message);

  // Let the policy decide what to keep
  history = applyHistoryPolicy(history);
}

export function addUserMessage(question: string) {
  appendMessage({
    role: "user",
    content: question,
  });
}

export function addAssistantMessage(answer: string) {
  appendMessage({
    role: "assistant",
    content: answer,
  });
}

export function getHistory(): ModelMessage[] {
  return [...history];
}

export function clearHistory(): void {
  history = [];
}
