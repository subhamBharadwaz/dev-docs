export interface TestResult {
  question: string;

  required: string[];

  acceptable: string[];

  retrieved: string[];

  passed: boolean;
}

export interface EvaluationResult {
  passed: number;

  failed: number;

  accuracy: number;

  results: TestResult[];
}

export interface AnswerTestResult {
  question: string;

  expected: string[];

  found: string[];

  missing: string[];
  answer: string;

  passed: boolean;
}

export interface AnswerEvaluationResult {
  passed: number;

  failed: number;

  accuracy: number;

  results: AnswerTestResult[];
}
