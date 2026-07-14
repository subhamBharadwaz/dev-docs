import { generateAnswer } from "../services/generate-answer.js";
import { normalize } from "../utils/normalize.js";

import { testCases } from "./test-cases.js";
import {
  AnswerEvaluationResult,
  AnswerTestResult,
} from "../types/evaluation.js";
import { clearHistory } from "../chat/history.js";

export async function evaluateAnswers(): Promise<AnswerEvaluationResult> {
  const answerTests = testCases.filter((test) => test.expectedAnswerContains);

  const results: AnswerTestResult[] = [];

  let passed = 0;

  for (const testCase of answerTests) {
    clearHistory();

    const response = await generateAnswer(testCase.question);

    const answer = normalize(response.answer);

    const expected = testCase.expectedAnswerContains!;

    const found = expected.filter((phrase) =>
      answer.includes(normalize(phrase)),
    );

    const missing = expected.filter((phrase) => !found.includes(phrase));

    const success = missing.length === 0;

    if (success) {
      passed++;
    }

    results.push({
      question: testCase.question,
      expected,
      found,
      missing,
      answer: response.answer,
      passed: success,
    });
  }

  return {
    passed,
    failed: answerTests.length - passed,
    accuracy: (passed / answerTests.length) * 100,
    results,
  };
}
