# Tiny AI Examples

Examples using `@cubie-ai/tiny-ai`.

![Cubie](https://github.com/Cubie-AI/tiny-ai/blob/main/publicMedia.png?raw=true)

## Getting Started

First make sure you have installed the dependencies.

```bash
npm i
```

Next you will want to set up the `.env` file:

```bash
cp .env.example .env
```

## simple-agent

A simple interaction with the agent through the command-line

To run this example use the script:

```bash
npm run simple-agent
```

## express-agent

Starts an express server on port 3000.

To run this example:

```bash
npm run express-agent
```

To interact with the agent:

```bash
POST http://localhost:3000/api/message
{
  message: "Hello"
}
```

Using curl:

```bash
curl  -X POST http://localhost:3000/api/message \
-H 'Content-Type: application/json' \
-d '{"message": "how are you?"}'

```

Output:

```
{"text":"I'm doing well, thank you for asking! How are you today?"}
```
