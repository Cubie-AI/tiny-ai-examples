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

## tool-use-simple-agent

Creates a simple cli agent with a tool register to fetch token prices from jupiter.

To run this example:

```bash
npm run tool-use-simple-agent
```

Example Output:

```
✔ You:  What is the price of So11111111111111111111111111111111111111112
Agent: Based on the current market data, the price of SOL is $150.55 USDC.

Please note that cryptocurrency prices are highly volatile and can change rapidly, so this price is just a snapshot of the current moment.
```
