import { Router } from "express";
import { IntentParser } from "../intent/intent.parser";

const intentRouter = Router();

intentRouter.post("/", async (req, res) => {
  try {
    const { query } = req.body;
    const parser = new IntentParser();

    console.log("User query:", query);

    const intent = await parser.parse(query);

    res.json(intent);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Intent parsing failed",
      message: err,
    });
  }
});

export default intentRouter;
