import { TinyTool, TinyToolConfig } from "@cubie-ai/tiny-ai";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { jsonSchema } from "ai";
import z from "zod";

function captureUriParameters(uri: string) {
  const regex = /{([^}]+)}/g;
  const matches = uri.match(regex);
  if (!matches) {
    return [];
  }
  return matches.map((match) => match.slice(1, -1));
}

function replaceUriParameters(uri: string, params: Record<string, string>) {
  let newUri = uri;
  for (const [key, value] of Object.entries(params)) {
    newUri = newUri.replace(`{${key}}`, value);
  }
  return newUri;
}

type ToolItem = {
  name: string;
  inputSchema: unknown;
  description?: string;
};

function buildTinyTool(client: Client, item: ToolItem): TinyTool {
  return new TinyTool(item.name, {
    description: item.description ?? "",
    parameters: jsonSchema(item.inputSchema),
    handler: async (params) => {
      try {
        return await client.callTool({
          name: item.name,
          arguments: params,
        });
      } catch (error) {
        console.error("Error executing tool:", error);
        throw error;
      }
    },
  });
}

// TODO: move to @cubie-ai/tiny-ai => This is a helper function to convert MCP server tools to tools compatible with TinyAI
export function convertMCPToolsToTools(client: Client, tools: ToolItem[]) {
  let toolSet: Record<string, TinyTool> = {};
  for (const tool of tools) {
    toolSet[tool.name] = buildTinyTool(client, tool);
  }

  return toolSet;
}

// TODO: move to @cubie-ai/tiny-ai => This is a helper function to convert MCP resources to tools compatible with TinyAI
export function convertResourcesToTools(
  mcpClient: Client,
  resources: { uri: string; name: string; description?: string }[]
) {
  let toolSet: Record<string, TinyToolConfig> = {};

  // Iterate through the resources and extract their "path" parameters
  // Each path paramter in the URI template will be a tool paramter the agent will infer from the user
  for (const resource of resources) {
    const parameterNames = captureUriParameters(resource.uri);

    const parameters = z.object({
      ...Object.fromEntries(
        parameterNames.map((param) => [
          param,
          z.string().describe(`The ${param} of the resource.`),
        ])
      ),
    });

    toolSet[resource.name] = {
      description: resource.description ?? "",
      parameters,
      handler: async (params: Record<string, string>) => {
        const resourceUri = replaceUriParameters(resource.uri, params);
        console.log(
          `Executing tool: ${resource.name} for resource: ${resourceUri}`
        );
        const data = await mcpClient.readResource({
          uri: resourceUri,
        });
        return data.contents;
      },
    };
  }

  return toolSet;
}
