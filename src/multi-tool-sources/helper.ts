import { Tool } from "ai";

export function printTools(tools: Record<string, Tool>) {
  console.log(
    `\nAvailable Tools \n=================\n- ${Object.keys(tools).join(
      "\n- "
    )}\n=================\n\n`
  );
}

export function printIntro() {
  console.log("\n\nWelcome to the Tiny Agent!\n===========================\n");
  console.log("This is a simple conversation loop. Type 'goodbye' to exit.\n");
  console.log("You can ask me anything, and I'll do my best to help you.\n");
}
