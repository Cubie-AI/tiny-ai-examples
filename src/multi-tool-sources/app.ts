import { startMcpServer } from "@cubie-ai/solana-mcp";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import express, { Request, Response } from "express";
import { SOLANA_RPC_URL } from "../constants";

const app = express();

app.use(express.json());

app.post("/mcp", async (req: Request, res: Response) => {
  console.log("Received request:", req.body);
  try {
    const transport: StreamableHTTPServerTransport =
      new StreamableHTTPServerTransport({
        sessionIdGenerator: undefined,
      });

    const server = await startMcpServer({
      transport,
      config: {
        solanaRpcUrl: SOLANA_RPC_URL,
        payerKeypair: undefined,
      },
    });
    await transport.handleRequest(req, res, req.body);

    res.on("close", () => {
      console.log("Request closed");
      transport.close();
      server.close();
    });
  } catch (error) {
    console.error("Error handling MCP request:", error);
    if (!res.headersSent) {
      res.status(500).json({
        jsonrpc: "2.0",
        error: {
          code: -32603,
          message: "Internal server error",
        },
        id: null,
      });
    }
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
