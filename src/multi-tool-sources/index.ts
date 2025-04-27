import { TinyAgent, TinyAnthropic, TinyTool } from "@cubie-ai/tiny-ai";
import { input } from "@inquirer/prompts";
import EventEmitter from "events";
import { ANTHROPIC_API_KEY } from "../constants";
import { createMcpClients } from "./client";
import { printIntro, printTools } from "./helper";
import { appendMessage, createMessage, Message, messages } from "./messages";
import { getStaticTools, getUserTools } from "./tools";

// This is a simple example of how to use the TinyAgent with multiple tools provided
// at multiple levels. This allows you to compose agents in ways that don't require
// additional instances and it helps limit resource usage.
//
// Example:
// 1. You have 3 tiers of user plan at TinyCorp: Free, Pro, and Enterprise.
//    Each tier moving up has access to all the previous tiers tools and clients, and additional ones.
// 2. There are some tools which don't require any user specific context from the database and/or anything external to the conversation.
// 3. There are some tools who will rely on a user context that is not from the conversation. (ie: a user private key)
//
// For point 1 & 2: You can initialize an agent instance with the minimum set of tools and clients
// For point 3: At some point prior to generating a response, you can load the user context from the database and build the tools for them.
//   Then these tools can be passed in dynmically to the generateText method.
//
// For .putTool() this would be used more so in situations where you had 'specified' agents who may load tools themselves in a dynamic way.
// For example: if your agent subscribed to a specific channel that notified them of available resources.
// We implement this in the `subscribe method and the `putToolEvent` method. Every 10 seconds a tool is dynamically added to the agent.
// The tools are named tool_<timestamp> so you can identify them in the console.

const toolChannel = new EventEmitter();
function subscribe(agent: TinyAgent) {
  toolChannel.on("tool", async (tool: TinyTool) => {
    agent.putTool(tool);
  });
}

function putToolEvent() {
  toolChannel.emit(
    "tool",
    new TinyTool(`tool_${Date.now()}`, {
      description: "A random tool",
    })
  );
}

async function main() {
  // Suppose your application had a static set of tools and mcp clients
  // available to all users.
  const clients = createMcpClients();

  // Get the static tools for the application that apply to all users
  const tools = getStaticTools();

  // Now construct an agent for this "request"
  const agent = new TinyAgent({
    provider: new TinyAnthropic({ apiKey: ANTHROPIC_API_KEY }),
    clients,
    tools,
  });

  // Subscribe agent to external tool channel
  subscribe(agent);

  // I use a global messages array to keep track of the conversation
  // you would decide how you want to store them, if you want to store them
  // and where you want to store them.
  await loop(agent, messages);
}

async function loop(agent: TinyAgent, messages: Message[]) {
  let userMessage = "";

  // Load the user context from the database and build the tools for them.
  const userTools = getUserTools({
    timezone: "America/New_York",
  });

  printIntro();

  const interval = setInterval(() => {
    putToolEvent();
  }, 10000);

  // Keep the conversation going until the user says "goodbye"
  while (userMessage.toLowerCase() !== "goodbye") {
    const tools = await agent.tools();
    printTools(tools);

    userMessage = await input({
      message: "You: ",
      validate: (input) => {
        return input.trim() !== "" ? true : "Please enter a message.";
      },
    });

    // add user message to bottom of message history
    const userMessages = appendMessage({
      messages,
      message: createMessage("user", userMessage),
    });

    // Additionally you can supply user tools to the genrate function and they are
    // discarded after the request is complete.
    const response = await agent.generateText({
      messages: userMessages,
      tools: userTools,
    });

    // add the response to the bottom of the message history
    appendMessage({
      messages,
      message: createMessage("assistant", response.data.text),
    });

    console.log("Agent: ", messages[messages.length - 1].content);
  }

  clearInterval(interval);
  return;
}

main();

process.on("SIGINT", () => {
  process.exit(0);
});

process.on("SIGTERM", () => {
  process.exit(0);
});
