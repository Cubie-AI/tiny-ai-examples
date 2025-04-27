import { input } from "@inquirer/prompts";
import { generateText } from "ai";
import { agent } from "./agent.js";

async function testMcp() {
  const tools = await agent.tools();
  console.log("Available tools:", tools);

  const anthropic = agent.provider;

  await generateText({
    model: anthropic.languageModel(),
    prompt: "Hello, how are you?",
    tools: tools,
  });
}

async function main() {
  const userMessage = await input({
    message: "You: ",
    validate: (input) => {
      return input.trim() !== "" ? true : "Please enter a message.";
    },
  });

  const response = await agent.generateText({
    prompt: userMessage,
  });

  if (response && response.success) {
    console.log(`Agent: ${response.data?.text}`);
  } else {
    console.error("Error:", response.error);
  }
}

testMcp();
