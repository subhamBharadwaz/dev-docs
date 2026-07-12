import { ModelMessage } from "ai";

export function buildMessages(
  history: ModelMessage[],
  question: string,
  context: string,
): ModelMessage[] {
  return [
    ...history,
    {
      role: "user",
      content: `
      Context:

     ${context}

     Question:

     ${question}
`,
    },
  ];
}
