# RAG Test Case 12: Ingestion Pipeline

## Goal
Validate that newly added documents become searchable.

## Scenario
A new troubleshooting guide is uploaded to the corpus.

## Query
How do I fix an embedding index mismatch error?

## Expected Behavior
- Newly ingested guide is retrievable
- Index state is up to date
- Answer reflects the latest document content

## What to Evaluate
- Ingestion completeness
- Index freshness
- Operational reliability
