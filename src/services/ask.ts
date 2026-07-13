import { ModelMessage } from "ai";
import { buildMessages } from "../chat/build-messages.js";
import {
  addAssistantMessage,
  addUserMessage,
  getHistory,
} from "../chat/history.js";
import { streamAnswer } from "../llm/answer.js";
import { getErrorMessage } from "../utils/errors.js";
import { printTools } from "../cli/print-tools.js";

export async function ask(question: string) {
  try {
    // Add the current question to history FIRST
    addUserMessage(question);

    const history: ModelMessage[] = [
      ...getHistory(),
      {
        role: "user",
        content: question,
      },
    ];

    // Build messages from history + context
    const messages = buildMessages(history);

    const result = streamAnswer(messages);

    console.log("\nGenerating answer...\n");

    let answer = "";

    for await (const text of result.textStream) {
      process.stdout.write(text);
      answer += text;
    }
    addAssistantMessage(answer);

    const toolCalls = await result.toolCalls;

    printTools(toolCalls);
    // Only save assistant response after successful completion
  } catch (error) {
    throw new Error(`Unable to answer question. ${getErrorMessage(error)}`);
  }
}
