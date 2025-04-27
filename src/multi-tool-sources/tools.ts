import { TinyTool, TinyToolConfig } from "@cubie-ai/tiny-ai";
import z from "zod";

interface RunTimeContext {
  timezone: string;
}
interface GetTimeParams {
  format: "12-hour" | "24-hour";
}

function getTime(params: GetTimeParams, context: RunTimeContext) {
  const date = new Date();
  return date.toLocaleString("en-US", { timeZone: context.timezone });
}

function getWeather(params: { location: string }) {
  return {
    location: params.location,
    temperature: Math.floor(Math.random() * 100),
    condition: "Sunny",
  };
}

export function getStaticTools(): TinyTool[] {
  return Object.entries(TOOL_REGISTRY)
    .filter(([, tool]) => tool.static)
    .map(([name, tool]) => new TinyTool(name, tool));
}

// This is a function that builds a set of tools but it additionally includes a context
// into the tool config passed into the TinyTool constructor.
export function getUserTools(context: RunTimeContext) {
  return Object.entries(TOOL_REGISTRY)
    .filter(([, tool]) => !tool.static)
    .map(([name, tool]) => new TinyTool(name, { ...tool, context }));
}

// This is a application level context that you as the developer would
// create because the specific tools you made require it.
interface MyContext {
  timezone: string;
}

// You can easily extendthe internal TinyToolConfig to add your specific context type
// which will be preserved.
interface MyToolConfig extends TinyToolConfig<MyContext> {
  // This is a static tool that does not require any user context
  static: boolean;
}

// All the static tools that are available to the agent
const TOOL_REGISTRY: Record<string, MyToolConfig> = {
  // A tool to get the weather for a given location.
  // The parameters are parsed from the user input (ie prompt or messages)
  // Example: "What is the weather in New York?"
  getWeather: {
    static: true,
    description: "Get the weather for a given location",
    parameters: z
      .object({
        location: z.string().describe("The location to get the weather for"),
      })
      .describe("Get the weather for a given location"),
    handler: getWeather,
  },

  // A tool to get the current time in a user's timezone.
  // An optional format parameter may be extracted from the user input
  // The users context will store their timezone
  // Example: "What time is it in my timezone?"
  getTime: {
    static: false,
    description: "Get the current time in a user's timezone",
    parameters: z
      .object({
        format: z.enum(["12-hour", "24-hour"]).default("24-hour"),
      })
      .describe("Get the current time in a user's timezone"),
    handler: getTime,
  },
};
