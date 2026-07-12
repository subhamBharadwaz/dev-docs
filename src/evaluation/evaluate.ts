import { retrieve } from "../query/retrieve.js";
import { getErrorMessage } from "../utils/errors.js";
import { testCases } from "./test-cases.js";

export async function evaluateRetrieval(): Promise<void> {
  console.log("\n=== Running Retrieval Evaluation ===\n");

  let passed = 0;

  for (const [index, testCase] of testCases.entries()) {
    try {
      console.log(`Evaluating test ${index + 1}/${testCases.length}...`);

      const chunks = await retrieve(testCase.question);
      const retrievedSources = new Set(chunks.map((chunk) => chunk.sourceFile));

      const passedTest =
        testCase.expectedSource === ""
          ? retrievedSources.size === 0
          : retrievedSources.has(testCase.expectedSource);

      if (passedTest) {
        passed++;
      }

      console.log(`Question : ${testCase.question}`);
      console.log(
        `Expected : ${
          testCase.expectedSource || "No document should be retrieved"
        }`,
      );

      console.log(
        `Retrieved: ${
          retrievedSources.size > 0 ? [...retrievedSources].join(", ") : "None"
        }`,
      );

      console.log(`Result   : ${passedTest ? "PASS ✅" : "FAIL ❌"}`);
      console.log("--------------------------------------------");
    } catch (error) {
      throw new Error(
        `Retrieval evaluation failed for question \"${testCase.question}\". ${getErrorMessage(error)}`,
      );
    }
  }

  console.log(`\nScore: ${passed}/${testCases.length}`);
  console.log(`Accuracy: ${((passed / testCases.length) * 100).toFixed(2)}%`);
}
