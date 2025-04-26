import { TinyAgent, TinyAnthropic, TinyTool } from "@cubie-ai/tiny-ai";
import z from "zod";

export const agent = new TinyAgent({
  provider: new TinyAnthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  }),
});

interface GetTimeParams {
  format: "12-hour" | "24-hour";
}
function getTime({ format = "12-hour" }: GetTimeParams) {
  const date = new Date();
  if (format === "12-hour") {
    return date.toLocaleTimeString("en-US");
  } else {
    return date.toLocaleTimeString("en-GB");
  }
}

agent.putTool(
  new TinyTool("getTime", {
    description: "Get the current time",
    parameters: z.object({
      format: z.enum(["12-hour", "24-hour"]).default("12-hour"),
    }),
    handler: async function name(params: GetTimeParams) {
      return getTime(params);
    },
  })
);
