import { startMcpServer } from "@cubie-ai/solana-mcp";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

async function main() {
  await startMcpServer({
    name: "Solana MCP",
    version: "1.0.0",
    transport: new StdioServerTransport(),
    config: {
      solanaRpcUrl: process.env.SOLANA_RPC_URL,
      commitment: "confirmed",
    },
  });

  console.log("MCP server started on port 3000");
}

main().catch((error) => {
  console.error("Error starting MCP server:", error);
});
