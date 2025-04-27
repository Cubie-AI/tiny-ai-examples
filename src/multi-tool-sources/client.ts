import { TinyMCP } from "@cubie-ai/tiny-ai";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

// Imagine this method compiled multiple MCP clients for different chains
// and returned them in an array. For now, we only have one client for Solana.
// This is an example of how tools are aggregated and managed in TinyAgents
export function createMcpClients() {
  const transport = new StreamableHTTPClientTransport(
    new URL("http://localhost:3000/mcp"),
    {
      requestInit: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      },
    }
  );

  const solanaMcpClient = new TinyMCP({
    name: "Solana MCP Client",
    version: "1.0.0",
    transport,
  });

  return [solanaMcpClient];
}
