import { ModelMessage } from "ai";

import { buildMessages } from "../chat/build-messages.js";
import { streamAnswer } from "../llm/answer.js";

interface ExecuteOptions {
  history: ModelMessage[];
}

export async function execute({ history }: ExecuteOptions) {
  const builtMessages = buildMessages(history);

  return streamAnswer(builtMessages);
}
