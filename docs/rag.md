# Retrieval-Augmented Generation (RAG)

Retrieval-Augmented Generation (RAG) improves the accuracy of language models by providing relevant information before generating an answer.

## Why RAG Is Useful

Without RAG, a language model answers using only its training data.

With RAG, the model first retrieves relevant documents and then uses them to generate an answer.

## Embeddings

Embeddings are dense numerical vectors that represent the semantic meaning of text.

Instead of comparing words directly, an embedding model converts text into numbers. Text with similar meanings produces vectors that are close together in vector space.

In a RAG system, embeddings are generated for:

- Documents
- Document chunks
- User questions

When a user asks a question, the question is also converted into an embedding. The vector database compares this embedding with stored document embeddings and returns the most similar chunks.

## Vector Database

A vector database stores embeddings and performs similarity search.

Instead of searching for exact words, it searches for vectors that are closest to the query embedding.

## RAG Pipeline

1. Load documents.
2. Split documents into chunks.
3. Generate embeddings.
4. Store embeddings in a vector database.
5. Embed the user's question.
6. Retrieve the most relevant chunks.
7. Send the retrieved context to the language model.
8. Generate the final answer.
