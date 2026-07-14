import { stepCountIs } from "ai";

import { chatModel } from "../ollama/chat.js";
import { tools } from "../tools/index.js";
import { instructions } from "../chat/instructions.js";

export const llmOptions = {
  model: chatModel,
  instructions,
  tools,
  stopWhen: stepCountIs(5),
};
