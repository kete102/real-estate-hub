import { Router } from "express";
import { IntentParser } from "../intent/intent.parser";
import { SearchService } from "../services/search-service";

const chatSearchRouter = Router();

chatSearchRouter.post("/", async (req, res) => {
  try {
    const parser = new IntentParser();
    const searchService = new SearchService();

    const { query } = req.body;

    const intent = await parser.parse(query);
    const result = await searchService.search(intent);

    res.json(result);
  } catch (err) {
    console.error("Chat Search Error", err);
    res.status(500).json({ error: "chat-search failed" });
  }
});

export default chatSearchRouter;
