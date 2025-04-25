import express, { NextFunction, Request, Response } from "express";
import { handleUserMessage } from "./agent.js";

const app = express();

app.use(express.json());

app.post("/api/message", async (req, res, next) => {
  try {
    const { message } = req.body;

    if (!message) {
      res.status(400).json({ error: "Message is required" });
      return;
    }
    const result = await handleUserMessage(message);
    res.status(200).json({
      text: result.data?.text,
    });
  } catch (error) {
    next(error);
  }
});

app.use((error: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error(error);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
