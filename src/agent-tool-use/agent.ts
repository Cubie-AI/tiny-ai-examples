import { TinyAgent, TinyAnthropic, TinyTool } from "@cubie-ai/tiny-ai";
import z from "zod";
import { getPrice } from "./jupiter";

const swap = new TinyTool("getSwapPrice", {
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

export const agent = new TinyAgent({
  provider: new TinyAnthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  }),
  tools: [swap],
});

async function middleware(agent: TinyAgent, prevData: any) {
  agent.putTool(
    new TinyTool("getSwapPrice", {
      description:
        "Get the swap price between inputMint and outputMint. Default outputMint is USDC.",
      handler: async (params) => {
        console.log(prevData, params);
        const result = await getPrice(params);
        return result;
      },
    })
  );
}
