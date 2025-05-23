import { TinyAgent, TinyAnthropic } from "@cubie-ai/tiny-ai";
import { input } from "@inquirer/prompts";
import "dotenv/config";

async function main() {
  const anthropic = new TinyAnthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  const agent = new TinyAgent({
    provider: anthropic,
  });

  const userMessage = await input({
    message: "You: ",
    validate: (input) => {
      return input.trim() !== "" ? true : "Please enter a message.";
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
