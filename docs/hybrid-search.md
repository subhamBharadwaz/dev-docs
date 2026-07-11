# RAG Test Case 13: Hybrid Search

## Goal
Compare hybrid retrieval against pure vector retrieval.

## Scenario
Some queries require exact product names while others benefit from semantic matching.

## Query
What changed in API method embedBatchV2?

## Expected Behavior
- Exact-match signals help retrieve the API reference
- Semantic signals add surrounding migration guidance
- Combined answer is stronger than either method alone

## What to Evaluate
- Hybrid rank improvement
- Exact identifier matching
- Balance between lexical and semantic search
