import { TinyAgent, TinyAnthropic } from "@cubie-ai/tiny-ai";
import z from "zod";
import { getPrice } from "./jupiter";

export const agent = new TinyAgent({
  provider: new TinyAnthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  }),
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
