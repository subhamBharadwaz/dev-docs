import { findDocsTool } from "./find-docs.js";
import { listDocsTool } from "./list-docs.js";
import { readDocumentTool } from "./read-document.js";
import { retrieveTool } from "./retrieve-tool.js";

export const tools = {
  listDocs: listDocsTool,
  retrieve: retrieveTool,
  findDocs: findDocsTool,
  readDocument: readDocumentTool,
};
