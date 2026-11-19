import express from "express";
import cors from "cors";
import apiRouter from "./routes/index.js";
import { notFoundMiddleware } from "./middlewares/not-found.middleware.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { fileURLToPath } from "url";

export const app = express();

app.use(express.json());

app.use(cors())

app.use("/images", express.static(fileURLToPath(new URL("../public/images/", import.meta.url))));

app.get("/", (req, res) => {
  res.json({
    message: "API working",
  });
});

app.use("/api", apiRouter);

app.use(notFoundMiddleware);

app.use(errorMiddleware);