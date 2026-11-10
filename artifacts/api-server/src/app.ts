import express, { type Express } from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();
app.set("trust proxy", 1);

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
// Admin authentication is same-origin only; do not grant CORS access.
const publicCors = cors();
app.use((req, res, next) => {
  if (/^\/api\/admin(?:\/|$)/i.test(req.path)) {
    next();
    return;
  }
  publicCors(req, res, next);
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

// cPanel can run the website and API as one Node application on the same
// domain. The deployment build places Vite's output beside the API bundle.
const publicDir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "public",
);
app.use(express.static(publicDir, { index: "index.html" }));
app.use((req, res, next) => {
  if (
    req.method !== "GET" ||
    req.path === "/api" ||
    req.path.startsWith("/api/") ||
    path.extname(req.path)
  ) {
    next();
    return;
  }
  res.sendFile(path.join(publicDir, "index.html"), (err) => {
    if (err) next(err);
  });
});

export default app;
