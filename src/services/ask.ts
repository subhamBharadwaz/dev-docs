import { buildMessages } from "../chat/build-messages.js";
import {
  addAssistantMessage,
  addUserMessage,
  getHistory,
} from "../chat/history.js";
import { printChunks } from "../cli/print-chunks.js";
import { printSources } from "../cli/print-sources.js";
import { buildContext } from "../context/build-context.js";
import { streamAnswer } from "../llm/answer.js";
import { rewriteQuery } from "../llm/rewrite-query.js";
import { retrieve } from "../query/retrieve.js";
import { getErrorMessage } from "../utils/errors.js";

export async function ask(question: string) {
  const history = getHistory();

  try {
    const rewrittenQuestion = await rewriteQuery(history, question);

    const chunks = await retrieve(rewrittenQuestion);

    if (chunks.length === 0) {
      console.log(
        "No relevant documentation matched that question. Try rephrasing it or run ingestion again.",
      );
      return;
    }

    printChunks(chunks);

    const context = buildContext(chunks);
    const messages = buildMessages(history, question, context);
    let answer = "";

    console.log("\nGenerating answer...\n");

    const stream = streamAnswer(messages);

    for await (const text of stream) {
      process.stdout.write(text);
      answer += text;
    }

    addUserMessage(question);
    addAssistantMessage(answer);

    console.log();
    printSources(chunks);
  } catch (error) {
    throw new Error(`Unable to answer question. ${getErrorMessage(error)}`);
  }
}
