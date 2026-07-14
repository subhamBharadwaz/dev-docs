import {
  AnswerEvaluationResult,
  EvaluationResult,
} from "../types/evaluation.js";

export function printReport(report: EvaluationResult): void {
  console.log("\n=== Retrieval Evaluation ===\n");

  for (const result of report.results) {
    console.log(`Question : ${result.question}`);

    console.log(`Required : ${result.required.join(", ")}`);

    if (result.acceptable.length > 0) {
      console.log(`Acceptable: ${result.acceptable.join(", ")}`);
    }

    console.log(
      `Retrieved: ${
        result.retrieved.length ? result.retrieved.join(", ") : "None"
      }`,
    );

    console.log(`Result   : ${result.passed ? "PASS ✅" : "FAIL ❌"}`);

    console.log("----------------------------------------");
  }

  console.log();

  console.log(`Passed   : ${report.passed}`);
  console.log(`Failed   : ${report.failed}`);
  console.log(`Accuracy : ${report.accuracy.toFixed(2)}%`);
}

export function printAnswerReport(report: AnswerEvaluationResult): void {
  console.log("\n=== Answer Evaluation ===\n");

  for (const result of report.results) {
    console.log(`Question : ${result.question}`);

    console.log(`Expected : ${result.expected.join(", ")}`);

    console.log(
      `Found    : ${result.found.length ? result.found.join(", ") : "None"}`,
    );

    if (result.missing.length > 0) {
      console.log(`Missing  : ${result.missing.join(", ")}`);
    }
    if (!result.passed) {
      console.log("\nAnswer:");
      console.log(result.answer);
    }
    console.log(`Result   : ${result.passed ? "PASS ✅" : "FAIL ❌"}`);

    console.log("----------------------------------------");
  }

  console.log();

  console.log(`Passed   : ${report.passed}`);
  console.log(`Failed   : ${report.failed}`);
  console.log(`Accuracy : ${report.accuracy.toFixed(2)}%`);
}
