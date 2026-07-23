# RAG Test Case 02: Chunking Strategy

## Goal
Test whether chunk size affects retrieval accuracy and answer completeness.

## Scenario
The same long document is indexed with small, medium, and large chunks.

## Query
How does chunking influence retrieval quality in RAG?

## Expected Behavior
- Relevant chunks are retrieved
- Answer reflects the tradeoff between context size and precision
- Overly fragmented chunks should perform worse

## What to Evaluate
- Chunk overlap effectiveness
- Recall vs precision
- Answer completeness
