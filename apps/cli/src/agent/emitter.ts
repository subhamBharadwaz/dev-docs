import type { AgentEvent } from "./events.js";

type Listener = (event: AgentEvent) => void;

const listeners = new Set<Listener>();

export function subscribe(listener: Listener) {
  listeners.add(listener);

  return () => listeners.delete(listener);
}

export function emit(event: AgentEvent) {
  for (const listener of listeners) {
    listener(event);
  }
}
