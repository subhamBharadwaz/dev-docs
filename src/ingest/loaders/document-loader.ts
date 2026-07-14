import { Document } from "../../types/document.js";

export interface DocumentLoader {
  loadDocuments(): Promise<Document[]>;
}
