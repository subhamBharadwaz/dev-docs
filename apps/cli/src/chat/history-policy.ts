import { ModelMessage } from "ai";
import { config } from "../config.js";

export function applyHistoryPolicy(history: ModelMessage[]) {
  const userIndices: number[] = [];

  for (const [index, message] of history.entries()) {
    if (message.role === "user") {
      userIndices.push(index);
    }
  }

  if (userIndices.length <= config.MAX_HISTORY_TURNS) {
    return history;
  }

  const turnsToRemove = userIndices.length - config.MAX_HISTORY_TURNS;
  const startIndex = userIndices[turnsToRemove];

  return history.slice(startIndex);
}
