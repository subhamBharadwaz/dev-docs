export function printTools<T extends { toolName: string }>(
  toolCalls: T[],
): void {
  if (toolCalls.length === 0) {
    return;
  }

  console.log("\n=== Tools Used ===\n");

  for (const tool of toolCalls) {
    console.log(`✓ ${tool.toolName}`);
  }

  console.log();
}
