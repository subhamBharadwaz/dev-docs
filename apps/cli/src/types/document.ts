export interface Document {
  fileName: string;
  content: string;
}

export interface DocumentLoader {
  loadDocuments(): Promise<Document[]>;
}
