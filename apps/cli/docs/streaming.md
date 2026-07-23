# Streaming Responses

Streaming allows an AI model to send its response token by token instead of waiting until the entire response is complete.

## Why Streaming Matters

- Users receive feedback immediately.
- Long responses feel much faster.
- Better user experience for chat applications.

## How Streaming Works

1. The client sends a prompt.
2. The model begins generating tokens.
3. Tokens are streamed to the client as they are produced.
4. The client appends each token to the displayed response.

## Benefits

- Reduced perceived latency.
- Improved interactivity.
- Better experience for long-form answers.

## Example

Instead of waiting five seconds for an entire paragraph, the user sees words appearing almost immediately.

