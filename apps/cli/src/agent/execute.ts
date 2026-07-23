import { ModelMessage } from "ai";

import { buildMessages } from "../chat/build-messages.js";
import { streamAnswer } from "../llm/answer.js";
import { emit } from "./emitter.js";

interface ExecuteOptions {
  history: ModelMessage[];
}

export async function execute({ history }: ExecuteOptions) {
  emit({ type: "planning-start" });

  try {
    const builtMessages = buildMessages(history);

    return await streamAnswer(builtMessages);
  } finally {
    emit({ type: "planning-end" });
  }
}
