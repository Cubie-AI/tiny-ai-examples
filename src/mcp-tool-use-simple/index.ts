import { startMcpClient } from "@cubie-ai/solana-mcp";
import { input } from "@inquirer/prompts";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import z from "zod";
import { agent } from "./agent";

async function main() {
  const transport = new StdioClientTransport({
    command: "node",
    args: ["dist/mcp-tool-use-simple/server.js"],
  });

  const client = await startMcpClient({
    name: "Solana MCP Client",
    version: "1.0.0",
    transport,
  });

  console.log("MCP client started");
  const resources = await client.listResources();

  console.dir(resources, { depth: null });

  const userMessage = await input({
    message: "You: ",
  });

  if (!userMessage) {
    console.error("No message provided.");
    return;
  }

  agent.registerTool("getTokenHolders", {
    description: "Get the token holders of a given mint address.",
    parameters: z.object({
      mintAddress: z.string().describe("The mint address of the token."),
    }),
    handler: async (params) => {
      const { mintAddress } = params;
      const resource = await client.readResource({
        uri: `token://${mintAddress}/holders`,
      });
      return resource.contents;
    },
  });

  const response = await agent.generateText({
    prompt: userMessage,
  });

  // Check if the response is valid
  if (!response || !response.success) {
    console.error("Error:", response.error);
    return;
  }
  console.log(`Agent: ${response.data?.text}`);
}

main();
