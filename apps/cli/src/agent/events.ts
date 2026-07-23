export type AgentEvent =
  | {
      type: "planning-start";
    }
  | {
      type: "planning-end";
    }
  | {
      type: "tool-start";
      tool: string;
      input?: unknown;
    }
  | {
      type: "tool-end";
      tool: string;
      duration: number;
    }
  | {
      type: "tool-error";
      tool: string;
      error: string;
    }
  | {
      type: "answer-start";
    }
  | {
      type: "answer-end";
    };
