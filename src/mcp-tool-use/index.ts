import { safeListResources } from "@cubie-ai/solana-mcp";
import { input } from "@inquirer/prompts";
import { agent, attachTools } from "./agent.js";
import { createClient } from "./client.js";
import { convertResourcesToTools } from "./tools.js";

async function main() {
  const mcpClient = await createClient();

  const userMessage = await input({
    message: "You: ",
    validate: (input) => {
      return input.trim() !== "" ? true : "Please enter a message.";
    },
  });

  // List resources from MCP client using our fail safe function
  const resourceList = await safeListResources(mcpClient);

  // Convert MCP resource to TinyAI (ai-sdk) tools
  const toolSet = {
    ...(resourceList?.data?.resources &&
      convertResourcesToTools(mcpClient, resourceList.data.resources)),
  };

  attachTools(agent, toolSet);

  const response = await agent.generateText({
    prompt: userMessage,
  });

  if (!response || !response.success) {
    console.error(response?.error ?? "Unknown error");
    return;
  } else if (response.success && response.data?.text) {
    console.log("Agent: ", response.data.text);
  } else {
    throw new Error("No text found in response");
  }
}

main();
