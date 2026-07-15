import { createApp } from "./app.js";
import { closeMcpClient } from "./mcp/client.js";
import { getErrorMessage } from "./utils/errors.js";

const app = createApp();

try {
  await app.main(process.argv.slice(2));
} catch (error) {
  console.error(`Error: ${getErrorMessage(error)}`);
  process.exitCode = 1;
} finally {
  await closeMcpClient();
}
