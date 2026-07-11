# Tool Calling

Tool calling allows a language model to use external functions instead of relying only on its internal knowledge.

## Why Tool Calling Exists

Language models cannot always answer questions accurately using their training data alone.

They may need to:

- Read a file
- Search a database
- Check the weather
- Perform calculations

## Tool Calling Workflow

1. User asks a question.
2. The model determines that a tool is required.
3. The application executes the tool.
4. The tool returns structured data.
5. The model generates a final response using that data.

## Example

A user asks:

"What is today's weather in London?"

The model calls a weather API instead of guessing.
