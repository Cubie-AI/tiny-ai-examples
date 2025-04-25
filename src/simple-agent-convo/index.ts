import { input } from "@inquirer/prompts";
import { agent } from "./agent";
import { appendMessage, createMessage, messages } from "./messages";

async function main() {
  let userMessage = "";

  // Keep the conversation going until the user says "goodbye"
  while (userMessage.toLowerCase() !== "goodbye") {
    userMessage = await input({
      message: "You: ",
      validate: (input) => {
        return input.trim() !== "" ? true : "Please enter a message.";
      },
    });

    const response = await agent.generateText({
      messages: appendMessage({
        messages,
        message: createMessage("user", userMessage),
      }),
    });

    if (!response || !response.success) {
      console.error("No response from agent.");
      continue;
    }

    appendMessage({
      messages,
      message: createMessage(
        "assistant",
        response?.data?.text ?? "Something went wrong"
      ),
    });

    console.log("Agent: ", messages[messages.length - 1].content);
  }
}

main();
