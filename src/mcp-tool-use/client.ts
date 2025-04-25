import { startMcpClient } from "@cubie-ai/solana-mcp";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

export async function createClient() {
  const transport = new StdioClientTransport({
    command: "node",
    args: ["dist/mcp-tool-use/server.js"],
  });

  return await startMcpClient({
    name: "Solana MCP Client",
    version: "1.0.0",
    transport,
  });
}
