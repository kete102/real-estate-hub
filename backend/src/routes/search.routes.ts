import { Router } from "express";
import { SearchService } from "../services/search-service";

const searchRouter = Router();

searchRouter.post("/", async (req, res) => {
  const intent = req.body;
  const searchService = new SearchService();

  const result = await searchService.search(intent);

  res.json({
    result,
  });
});

export default searchRouter;
