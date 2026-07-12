import { createApp } from "./app.js";
import { getErrorMessage } from "./utils/errors.js";

const app = createApp();

app.main(process.argv.slice(2)).catch((error) => {
  console.error(`Error: ${getErrorMessage(error)}`);
  process.exitCode = 1;
});
