import { generateText, ModelMessage } from "ai";
import { chatModel } from "../ollama/chat.js";

export async function rewriteQuery(
  history: ModelMessage[],
  question: string,
): Promise<string> {
  if (history.length === 0) {
    return question;
  }

  const result = await generateText({
    model: chatModel,
    instructions: `

   Rewrite the user's latest question into a standalone search query.

Rules:

- Use previous conversation only to resolve references such as:
  - it
  - they
  - this
  - that
  - those
- Do NOT introduce new topics.
- Do NOT add outside knowledge.
- Preserve the user's original wording whenever possible.
- Return ONLY the rewritten query.    `,
    messages: [
      ...history,
      {
        role: "user",
        content: question,
      },
    ],
  });

  return result.text.trim();
}
