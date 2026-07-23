export interface RetrievalTestCase {
  question: string;

  requiredSources: string[];

  acceptableSources?: string[];

  expectedAnswerContains?: string[];
}

export const testCases: RetrievalTestCase[] = [
  {
    question: "Why is streaming useful?",
    requiredSources: ["streaming.md"],
    expectedAnswerContains: ["token", "feedback"],
  },

  {
    question: "How does semantic search work?",
    requiredSources: ["keyword-vs-semantic.md"],
    acceptableSources: ["embeddings.md", "rag.md", "hybrid-search.md"],
  },

  {
    question: "Why do we need embeddings?",
    requiredSources: ["rag.md"],
  },

  {
    question: "When should a model call a tool?",
    requiredSources: ["tools.md"],
    expectedAnswerContains: ["tool", "documentation"],
  },

  {
    question: "How does retrieval improve answers?",
    requiredSources: ["rag.md"],
  },

  {
    question: "Why shouldn't an LLM guess?",
    requiredSources: ["tools.md"],
  },

  {
    question: "What is retrieval-augmented generation?",
    requiredSources: ["basics.md"],
    expectedAnswerContains: ["accuracy", "retrieval"],
  },

  {
    question: "How does chunking influence retrieval quality in RAG?",
    requiredSources: ["chunking.md"],
  },

  {
    question: "Show the deployment steps for version 2 only.",
    requiredSources: ["metadata-filtering.md"],
  },

  {
    question: "How often are embeddings refreshed?",
    requiredSources: ["conflicting-sources.md"],
  },

  {
    question: "Which pricing tier includes the feature called smart citations?",
    requiredSources: ["multi-hop.md"],
  },

  {
    question: "What are the three main stages of a RAG pipeline?",
    requiredSources: ["citations.md"],
  },

  {
    question: "Why is my search missing stuff?",
    requiredSources: ["query-rewriting.md"],
  },

  {
    question: "How should we evaluate our RAG system?",
    requiredSources: ["evaluation-metrics.md"],
  },

  {
    question: "Are we ready to launch our RAG assistant?",
    requiredSources: ["production-readiness.md"],
  },

  {
    question: "Would that approach hurt recall?",
    requiredSources: ["conversation-memory.md"],
  },

  {
    question: "What changed in API method embedBatchV2?",
    requiredSources: ["hybrid-search.md"],
  },

  {
    question: "What is the exact 2027 roadmap for our private RAG product?",
    requiredSources: ["hallucination-guardrails.md"],
  },
];
