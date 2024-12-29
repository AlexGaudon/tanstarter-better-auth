import { defineConfig } from "@tanstack/start/config";
import type { App } from "vinxi";
import tsConfigPaths from "vite-tsconfig-paths";

const tanstackApp = defineConfig({
  vite: {
    plugins: [
      tsConfigPaths({
        projects: ["./tsconfig.json"],
      }),
    ],
  },
  server: {
    preset: "node-server",
  },
});

const routers = tanstackApp.config.routers.map((r) => {
  return {
    ...r,
    middleware: r.target === "server" ? "./app/middleware.tsx" : undefined,
  };
});

const app: App = {
  ...tanstackApp,
  config: {
    ...tanstackApp.config,
    routers: routers,
  },
};

export default app;
