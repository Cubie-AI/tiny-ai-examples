import { BuildToolParams } from "@cubie-ai/tiny-ai";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import jsonSchemaToZod, { JsonSchema } from "json-schema-to-zod";
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

export function convertMCPToolsToTools(
  mcpClient: Client,
  tools: {
    name: string;
    inputSchema: unknown;
    description?: string;
  }[]
) {
  let toolSet: Record<string, BuildToolParams> = {};

  tools.forEach((tool) => {
    toolSet[tool.name] = {
      description: tool.description ?? "",
      parameters: jsonSchemaToZod(tool.inputSchema as JsonSchema),
      handler: async (params) => {
        const data = await mcpClient.callTool({
          name: tool.name,
          params,
        });
        return data.contents;
      },
    };
  });

  return toolSet;
}

export function convertResourcesToTools(
  mcpClient: Client,
  resources: { uri: string; name: string; description?: string }[]
) {
  let toolSet: Record<string, BuildToolParams> = {};

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
