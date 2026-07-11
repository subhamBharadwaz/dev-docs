# RAG Test Case 07: Conflicting Sources

## Goal
Evaluate how the system handles contradictory information.

## Scenario
An old guide says embeddings are refreshed weekly. A new runbook says they are refreshed daily.

## Query
How often are embeddings refreshed?

## Expected Behavior
- Prefers the newest or highest-priority source
- Acknowledges conflict when necessary
- Avoids confidently repeating stale information

## What to Evaluate
- Source ranking
- Recency handling
- Trust calibration
