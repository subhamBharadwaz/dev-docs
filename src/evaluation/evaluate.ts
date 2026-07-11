import { retrieve } from "../query/retrieve.js";
import { testCases } from "./test-cases.js";

export async function evaluateRetrieval(): Promise<void> {
  console.log("\n=== Running Retrieval Evaluation ===\n");

  let passed = 0;

  for (const testCase of testCases) {
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
  }

  console.log(`\nScore: ${passed}/${testCases.length}`);
  console.log(`Accuracy: ${((passed / testCases.length) * 100).toFixed(2)}%`);
}
