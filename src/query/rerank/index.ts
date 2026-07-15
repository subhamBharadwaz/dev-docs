import { config } from "../../config.js";

import { WeightedScoreReranker } from "./weighted-score.js";
import { ReciprocalRankFusionReranker } from "./reciprocal-rank-fusion.js";
import { CrossEncoderReranker } from "./cross-encoder.js";

export function createReranker() {
  switch (config.reranker) {
    case "weighted-score":
      return new WeightedScoreReranker();

    case "rrf":
      return new ReciprocalRankFusionReranker();

    case "cross-encoder":
      return new CrossEncoderReranker();
  }
}

export const reranker = createReranker();
