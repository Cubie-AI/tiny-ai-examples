import { TinyAgent, TinyAnthropic } from "@cubie-ai/tiny-ai";
import { ANTHROPIC_API_KEY } from "../constants";

export const agent = new TinyAgent({
  name: "Cubie",
  system: "You are a helpful assistant.",
  provider: new TinyAnthropic({
    apiKey: ANTHROPIC_API_KEY,
  }),
});
