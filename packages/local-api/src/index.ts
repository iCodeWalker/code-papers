import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import path from "path";

import { createCellsRouter } from "./routes/cells";

export const startApp = (
  port: number,
  filename: string,
  dir: string,
  useProxy: boolean
) => {
  const app = express();

  app.use(createCellsRouter(filename, dir));

  // only works in local machine in while dvelopment. Not work in users machine
  // app.use(express.static("../../local-client/build"));

  if (useProxy) {
    app.use(
      createProxyMiddleware({
        target: "http://127.0.0.1:3000",
        ws: true,
        logLevel: "silent",
      })
    );
  } else {
    const packagePath = require.resolve(
      "@code-papers/local-app/build/index.html"
    );
    app.use(express.static(path.dirname(packagePath)));
  }

  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on("error", reject);
  });
};
