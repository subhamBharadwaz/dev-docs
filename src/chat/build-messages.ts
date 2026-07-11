import { ModelMessage } from "ai";

export function buildMessages(
  question: string,
  context: string,
): ModelMessage[] {
  return [
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
