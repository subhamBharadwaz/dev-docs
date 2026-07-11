# RAG Test Case 06: Multi-Hop Retrieval

## Goal
Test whether the system can combine facts from multiple documents.

## Scenario
One document lists product features. Another explains pricing tiers.

## Query
Which pricing tier includes the feature called smart citations?

## Expected Behavior
- Retrieves both documents
- Combines evidence correctly
- States the final answer with support

## What to Evaluate
- Cross-document reasoning
- Evidence chaining
- Failure cases from missing context
