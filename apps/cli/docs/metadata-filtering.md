# RAG Test Case 05: Metadata Filtering

## Goal
Ensure the retriever respects metadata constraints.

## Scenario
Documents are tagged by source, team, date, and product version.

## Query
Show the deployment steps for version 2 only.

## Expected Behavior
- Retrieves only version 2 documents
- Excludes outdated instructions
- Answer clearly reflects the filter

## What to Evaluate
- Filter correctness
- Freshness control
- Reduced noise
