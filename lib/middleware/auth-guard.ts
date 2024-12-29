import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/start";
import { getAuthSession } from "../server/auth-functions";

export const authMiddleware = createMiddleware().server(async ({ next }) => {
  const auth = await getAuthSession();

  if (!auth.isAuthenticated) {
    throw redirect({
      to: "/signin",
    });
  }

  return next({
    context: {
      auth,
    },
  });
});
