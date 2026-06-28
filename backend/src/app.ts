import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import api from "./api";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5473",
  }),
);

app.use(express.json());

app.get("/api/v1/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/v1", api);

export default app;
