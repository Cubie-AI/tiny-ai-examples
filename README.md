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

## mcp-tool-use-simple

Creates a simple cli agent along with a `@cubie-ai/solana-mcp` client and server.
We register the MCP methods with our `TinyAgent` and proceed to prompt as usual.

To run this example you will need to build the project

```bash
npm run build && node dist/mcp-tool-use-simple/index.js
```

Example Output:

```
✔ You:  Get the token holders for 2MH8ga3TuLvuvX2GUtVRS2BS8B9ujZo3bj5QeAkMpump and list the top 10 and summarize the data. Do not ask to proceed just go ahead
Agent: Now, I'll analyze the token holders data and provide a summary of the top 10 holders:

Top 10 Token Holders:
1. 19VZSVR25dewU2HaMk4fFC1cgAGor6T2netnJ83NE9x: 22,744,690.810513 tokens
2. J3Ckp5o5SrZyj7zMmegTxXDLZLx4mv4BgvDYexDjLTX: 189,964,231.741065 tokens
3. 7EuFsBeTMNzDtKVFPfT79myfFFgJTaJooRCNJ83mHK1R: 19,392,554.49907 tokens
4. 5pryspM4phqtHUxtWhWEAa6ZHRk7ottY4oB8dW3fZm3q: 11,427,670.715729 tokens
5. 6EKXoUi4CK3j26zVtowfgRA1zzTya4RnPT5itkWZPH8s: 10,003,307.96127 tokens
6. 5jNd6KeoJjYqX6TJ9AkoU9jAbx1xBvk1t4qeraduMQcg: 14,996,722.271788 tokens
7. 4Ao1X8fkR7pdoy4v8zpjtsX2qKcpi6MpD1EtciEvQfj3: 8,395,307.667666 tokens
8. 8aoY3NsuRsN2EczEUeMbyTQkP9mEQRWuj3iaKXpRixZY: 3,251,989.678974 tokens
9. 4wFsaQLddiBxNnWTVM4EAKFb8jeS2bakZJGbGDd3KVAf: 4,477,398.76052 tokens
10. 8AXWJQ4e97ztknT8yDx2QzqCSENAxAseQGFHKJNteY1K: 35,783,375.125634 tokens

Summary:
- Total number of unique token holders: 1,000+ addresses
- The top 10 holders collectively own a significant portion of the tokens
- The largest holder (J3Ckp5o5SrZyj7zMmegTxXDLZLx4mv4BgvDYexDjLTX) has 189,964,231.741065 tokens
- Token distribution appears to be somewhat concentrated, with a few addresses holding large amounts
- Many smaller holders have token amounts ranging from a few tokens to thousands of tokens

Would you like me to provide any further analysis or breakdown of the token holders?
```
