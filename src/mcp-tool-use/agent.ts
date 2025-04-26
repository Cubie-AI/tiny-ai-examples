import { TinyAgent, TinyAnthropic, TinyMCP } from "@cubie-ai/tiny-ai";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import path from "path";
import { ANTHROPIC_API_KEY } from "../constants";

const solanaMcpClient = new TinyMCP({
  name: "Solana MCP Client",
  version: "1.0.0",
  transport: new StdioClientTransport({
    command: "node",
    args: [path.resolve(__dirname, "../mcp-tool-use/server.js")],
  }),
});

export const agent = new TinyAgent({
  name: "Cubie",
  settings: {
    system: "You are a helpful assistant.",
    maxSteps: 5,
  },
  provider: new TinyAnthropic({
    apiKey: ANTHROPIC_API_KEY,
  }),
  clients: [solanaMcpClient],
});
