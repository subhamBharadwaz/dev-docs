import { evaluateRetrieval } from "./retrieval-evaluator.js";
import { evaluateAnswers } from "./answer-evaluator.js";

import { printReport, printAnswerReport } from "./report.js";

export type EvaluationMode = "retrieval" | "answers" | "all";

export async function runEvaluation(
  mode: EvaluationMode = "all",
): Promise<void> {
  switch (mode) {
    case "retrieval": {
      const report = await evaluateRetrieval();
      printReport(report);
      break;
    }

    case "answers": {
      const report = await evaluateAnswers();
      printAnswerReport(report);
      break;
    }

    case "all": {
      const retrieval = await evaluateRetrieval();
      printReport(retrieval);

      const answers = await evaluateAnswers();
      printAnswerReport(answers);
      break;
    }
  }
}
