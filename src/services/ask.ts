import { generateAnswer } from "./generate-answer.js";
import { getErrorMessage } from "../utils/errors.js";

export async function ask(question: string) {
  try {
    console.log("\nGenerating answer...\n");

    await generateAnswer(question);

    console.log();
  } catch (error) {
    throw new Error(`Unable to answer question. ${getErrorMessage(error)}`);
  }
}
