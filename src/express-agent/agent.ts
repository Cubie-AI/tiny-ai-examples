import { TinyAgent, TinyAnthropic } from "@cubie-ai/tiny-ai";

const agent = new TinyAgent({
  name: "Cubie",
  provider: new TinyAnthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  }),
  settings: {
    maxSteps: 5,
    system: "You are a helpful assistant.",
  },
});

export async function handleUserMessage(message: string) {
  return await agent.generateText({
    prompt: message,
  });
}
