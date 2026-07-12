import { type ModelMessage } from "ai";

const history: ModelMessage[] = [];

export function addUserMessage(question: string) {
  history.push({
    role: "user",
    content: question,
  });
}

export function addAssistantMessage(answer: string) {
  history.push({
    role: "assistant",
    content: answer,
  });
}

export function getHistory(): ModelMessage[] {
  return [...history];
}

export function clearHistory(): void {
  history.length = 0;
}
