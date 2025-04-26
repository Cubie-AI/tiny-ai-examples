import { input } from "@inquirer/prompts";
import { agent } from "./agent.js";

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

main();
