import { TinyAgent, TinyAnthropic } from "@cubie-ai/tiny-ai";
import z from "zod";

export const agent = new TinyAgent({
  name: "Cubie",
  system: "You are a helpful assistant.",
  provider: new TinyAnthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  }),
});

agent.registerTool("getTime", {
  description: "Get the current time",
  parameters: z.object({
    format: z.enum(["12-hour", "24-hour"]).default("12-hour"),
  }),
  handler: async (params) => {
    const date = new Date();
    if (params.format === "12-hour") {
      return date.toLocaleTimeString("en-US");
    } else {
      return date.toLocaleTimeString("en-GB");
    }
  },
});
