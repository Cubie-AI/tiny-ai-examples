import { TinyAgent, TinyAnthropic } from "@cubie-ai/tiny-ai";

const agent = new TinyAgent({
  name: "Cubie",
  system: "You are a helpful assistant.",
  provider: new TinyAnthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  }),
});

export async function handleUserMessage(message: string) {
  return await agent.generateText({
    prompt: message,
  });
}
