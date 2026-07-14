import { retrieve } from "../query/retrieve.js";
import { getErrorMessage } from "../utils/errors.js";

import { testCases } from "./test-cases.js";
import type { EvaluationResult, TestResult } from "../types/evaluation.js";

export async function evaluateRetrieval(): Promise<EvaluationResult> {
  const results: TestResult[] = [];

  let passed = 0;

  for (const testCase of testCases) {
    try {
      const chunks = await retrieve(testCase.question);

      const retrievedSources = [
        ...new Set(chunks.map((chunk) => chunk.sourceFile)),
      ];

      const success = testCase.requiredSources.every((source) =>
        retrievedSources.includes(source),
      );

      if (success) {
        passed++;
      }

      results.push({
        question: testCase.question,
        required: testCase.requiredSources,
        acceptable: testCase.acceptableSources ?? [],
        retrieved: retrievedSources,
        passed: success,
      });
    } catch (error) {
      throw new Error(
        `Retrieval evaluation failed for "${testCase.question}". ${getErrorMessage(error)}`,
      );
    }
  }

  return {
    passed,
    failed: testCases.length - passed,
    accuracy: (passed / testCases.length) * 100,
    results,
  };
}
