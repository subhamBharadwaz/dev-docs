# RAG Test Case 14: Conversation-Aware Retrieval

## Goal
Test follow-up questions in a multi-turn RAG chat.

## Scenario
The user first asks about chunking, then refers to “that approach” in a follow-up.

## Query
Would that approach hurt recall?

## Expected Behavior
- Uses conversation context to resolve the reference
- Retrieves documents about chunk size and overlap
- Answers the follow-up coherently

## What to Evaluate
- Coreference resolution
- Multi-turn retrieval
- Context carryover
