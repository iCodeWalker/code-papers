import path from "path";
import { Command } from "commander";
import { startApp } from "@react-note-book/local-api";

interface LocalApiError {
  code: string;
}

const isLocalApiError = (err: any): err is LocalApiError => {
  return typeof err.code === "string";
};

const isProduction = process.env.NODE_ENV === "production";

export const startAppCommand = new Command()
  .command("start-app [filename]")
  .description("Starts up the react-note-book app in browser")
  .option("-p, --port <number>", "port to run server on", "4050")
  .action(async (filename = "notebook.js", options: { port: string }) => {
    try {
      const dir = path.join(process.cwd(), path.dirname(filename));

      const file = path.basename(filename);

      await startApp(parseInt(options.port), file, dir, !isProduction);

      console.log(
        `Opened ${filename}. Navigate to http://localhost:${options.port} to edit`
      );
    } catch (err) {
      if (isLocalApiError(err)) {
        if (err.code === "EADDRINUSE") {
          console.error("Port is in use. Try running on a different port.");
        }
      } else if (err instanceof Error) {
        console.log("Heres the problem", err.message);
      }
      process.exit(1);
    }
  });
