import type { ModelMessage } from "ai";

export function buildMessages(history: ModelMessage[]): ModelMessage[] {
  return [...history];
}
