import { TinyAgent, TinyAnthropic } from "@cubie-ai/tiny-ai";
import { input } from "@inquirer/prompts";
import "dotenv/config";
import z from "zod";
import { getPrice } from "./jupiter";

async function main() {
  const anthropic = new TinyAnthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  const agent = new TinyAgent({
    provider: anthropic,
    system: "You are a helpful assistant.",
    name: "Cubie",
  });

  agent.registerTool("getSwapPrice", {
    description:
      "Get the swap price between inputMint and outputMint. Default outputMint is USDC.",
    parameters: z.object({
      inputMint: z.string().describe("The mint address of the input token."),
      outputMint: z
        .string()
        .optional()
        .default("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v")
        .describe("The mint address of the output token. Default is USDC."),
    }),
    handler: getPrice,
  });

  const userMessage = await input({
    message: "You: ",
  });

  if (!userMessage) {
    console.error("No message provided.");
    return;
  }

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
