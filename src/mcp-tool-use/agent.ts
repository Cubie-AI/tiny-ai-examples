import { BuildToolParams, TinyAgent, TinyAnthropic } from "@cubie-ai/tiny-ai";
import { ANTHROPIC_API_KEY } from "../constants";

export const agent = new TinyAgent({
  name: "Cubie",
  system: "You are a helpful assistant.",
  provider: new TinyAnthropic({
    apiKey: ANTHROPIC_API_KEY,
  }),
});

// Helper function to register a map of tools
export async function attachTools(
  _agent: TinyAgent,
  tools: Record<string, BuildToolParams>
) {
  for (const [name, tool] of Object.entries(tools)) {
    _agent.registerTool(name, tool);
  }
}
