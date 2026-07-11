# RAG Test Case 09: Query Rewriting

## Goal
Verify that ambiguous user queries can be rewritten into better retrieval queries.

## Scenario
The user asks a vague question with little domain terminology.

## Query
Why is my search missing stuff?

## Expected Behavior
- System expands the query toward retrieval recall issues
- Retrieves documents about chunking, embeddings, and indexing
- Produces a useful diagnostic answer

## What to Evaluate
- Query understanding
- Rewrite quality
- Impact on retrieval performance
