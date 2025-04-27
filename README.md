# Tiny AI Examples

Examples using `@cubie-ai/tiny-ai`.

![Cubie](https://github.com/Cubie-AI/tiny-ai/blob/main/publicMedia.png?raw=true)

## Table of Contents

- [Getting Started](#getting-started)
- [Simple Agent](#simple-agent)
- [Conversational Agent](#conversational-agent)
- [ExpressJs Agent](#express-agent)
- [Tool Use Agent](#agent-tool-use)
- [MCP Tool Use Agent](#mcp-tool-use)

## Getting Started

First make sure you have installed the dependencies.

```bash
npm i
```

Next you will want to set up the `.env` file:

```bash
cp .env.example .env
```

## Simple Agent

[Code For this Example](/src/simple-agent/)

A simple interaction with the agent through your CLI. This script will only accept a single message from the user and provide a single response from the agent

### Startup

```bash
npm run simple-agent
```

### Sample Output

```
✔ You:  hi
Agent: Hello! How are you doing today? Is there anything I can help you with?
```

## Conversational Agent

[Code For this Example](/src/simple-agent-convo/)

Once again we set up a simple cli agent however we add some additional methods for managin conversational history.
We provide the agent in this example with a tool which returns the current time.
The tool accepts an optional parameter for whether the user wants `12-hour` or `24-hour` time.

To run this example use the script:

```bash
npm run simple-agent-convo
```

### Sample Output

```bash
✔ You:  hi
Agent:  Hello! How are you doing today? Is there anything I can help you with?
✔ You:  What is the current time ?
Agent:  The current time is 5:04:36 PM. Is there anything else I can help you with?
✔ You:  can i get in 24-hour time ?
Agent:  The current time in 24-hour format is 17:05:10. Is there anything else I can help you with?
✔ You:  goodbye
Agent:  Goodbye! Take care.
```

## ExpressJs Agent

[Code For this Example](/src/express-agent/)

Starts an express server on port 3000 and exposes a single `POST /api/message` endpoint.

### Startup

```bash
npm run express-agent
```

### Calling the api

```bash
curl  -X POST http://localhost:3000/api/message \
-H 'Content-Type: application/json' \
-d '{"message": "how are you?"}'
```

### Sample Output

```
{"text":"I'm doing well, thank you for asking! How are you today?"}
```

Users are able to structure their responses relative to their API since tiny-ai is entirely decoupled from the greater app.

## Tool Use Agent

[Code For this Example](/src/agent-tool-use/)

Creates a simple cli agent with a tool register to fetch token prices from jupiter.

### Startup

```bash
npm run agent-tool-use
```

### Sample Output

```
✔ You:  What is the price of So11111111111111111111111111111111111111112
Agent: Based on the current market data, the price of SOL is $150.55 USDC.

Please note that cryptocurrency prices are highly volatile and can change rapidly, so this price is just a snapshot of the current moment.
```

## MCP Tool Use Agent

[Code For this Example](/src/mcp-tool-use/)

Creates a CLI agent along with our `@cubie-ai/solana-mcp` client and server.
We register the MCP methods with our `TinyAgent` and proceed to prompt as usual.

### Startup

```bash
npm run mcp-tool-use
```

### Sample Output

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

## Multiple Tool Sources

[Code For this Example](/src/multi-tool-sources/)

Create an agent instance that is initialized with tools from the following places:

1. In code registry for static tools (put in constructor)
2. Tools from an MCPClient (in constructor)
3. In code registry for tools that require a user context (used during generate call)
4. Runtime dynamic tools from an event emmitter that runs every 10 seconds

### Startup

You need to open 2 terminals to run this example.

Terminal 1: Start our MCP Server with solana access

```bash
npm run build
npm run build && node dist/multi-tool-sources/app.js
```

Terminal 2: Start the agent instance / construction

```bash
npm run multi-tool-sources
```

### Sample Output

```bash


Welcome to the Tiny Agent!
===========================

This is a simple conversation loop. Type 'goodbye' to exit.

You can ask me anything, and I'll do my best to help you.


Available Tools
=================
- getWeather
- getTokenHolders
- getTokenSupply
- getTokenProgramByMintAddress
- getAddressBalance
- getAddressHoldings
- getSignaturesForAddress
- getJupiterQuote
- getPrice
=================


✔ You:  hi
Agent:  Hello! How can I assist you today? I'm ready to help you with various tasks such as checking weather, token information, prices, or any other queries you might have.

Available Tools
=================
- getWeather
- getTokenHolders
- getTokenSupply
- getTokenProgramByMintAddress
- getAddressBalance
- getAddressHoldings
- getSignaturesForAddress
- getJupiterQuote
- getPrice
=================


✔ You:  how are you
Agent:  I'm doing well, thank you for asking! As an AI assistant, I'm always ready and eager to help you with any questions or tasks you might have. Is there anything specific I can help you with today? Whether it's checking the weather, looking up token information, getting a price quote, or something else, I'm here to assist you.

Available Tools
=================
- getWeather
- tool_1745724394049
- getTokenHolders
- getTokenSupply
- getTokenProgramByMintAddress
- getAddressBalance
- getAddressHoldings
- getSignaturesForAddress
- getJupiterQuote
- getPrice
=================

```
