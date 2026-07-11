export interface RetrievalTestCase {
  question: string;

  expectedSource: string;

  expectedAnswerContains?: string;
}

export const testCases: RetrievalTestCase[] = [
  {
    question: "Why is streaming useful?",
    expectedSource: "streaming.md",
  },

  {
    question: "How does semantic search work?",
    expectedSource: "rag.md",
  },

  {
    question: "Why do we need embeddings?",
    expectedSource: "rag.md",
  },

  {
    question: "When should a model call a tool?",
    expectedSource: "tools.md",
  },

  {
    question: "How does retrieval improve answers?",
    expectedSource: "rag.md",
  },

  {
    question: "Why shouldn't an LLM guess?",
    expectedSource: "tools.md",
  },

  {
    question: "What is retrieval-augmented generation?",
    expectedSource: "basics.md",
  },

  {
    question: "How does chunking influence retrieval quality in RAG?",
    expectedSource: "chunking.md",
  },

  {
    question: "Show the deployment steps for version 2 only.",
    expectedSource: "metadata-filtering.md",
  },

  {
    question: "How often are embeddings refreshed?",
    expectedSource: "conflicting-sources.md",
  },

  {
    question: "Which pricing tier includes the feature called smart citations?",
    expectedSource: "multi-hop.md",
  },

  {
    question: "What are the three main stages of a RAG pipeline?",
    expectedSource: "citations.md",
  },

  {
    question: "Why is my search missing stuff?",
    expectedSource: "query-rewriting.md",
  },

  {
    question: "How should we evaluate our RAG system?",
    expectedSource: "evaluation-metrics.md",
  },

  {
    question: "Are we ready to launch our RAG assistant?",
    expectedSource: "production-readiness.md",
  },

  {
    question: "Would that approach hurt recall?",
    expectedSource: "conversation-memory.md",
  },

  {
    question: "What changed in API method embedBatchV2?",
    expectedSource: "hybrid-search.md",
  },

  {
    question: "What is the exact 2027 roadmap for our private RAG product?",
    expectedSource: "hallucination-guardrails.md",
  },
];
