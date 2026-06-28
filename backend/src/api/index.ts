import { Router } from "express";
import intentRoutes from "../routes/intent.routes";
import searchRoutes from "../routes/search.routes";
import chatSearchRouter from "../routes/chat-search.routes";

const api = Router();

api.use("/intent", intentRoutes);
api.use("/search", searchRoutes);
api.use("/chat-search", chatSearchRouter);

export default api;
