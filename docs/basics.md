# RAG Test Case 01: Basic Retrieval

## Goal
Verify that a RAG system can retrieve a directly relevant document for a simple factual question.

## Scenario
A knowledge base contains onboarding docs, API notes, and internal FAQs.

## Query
What is retrieval-augmented generation?

## Expected Behavior
- Retrieves the introductory RAG document
- Returns a concise definition
- Does not hallucinate unrelated implementation details

## What to Evaluate
- Top-k relevance
- Answer grounding
- Citation quality
