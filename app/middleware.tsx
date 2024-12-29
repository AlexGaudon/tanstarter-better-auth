import { defineMiddleware } from "vinxi/http";
import { Auth, auth } from "~/lib/server/auth";

export default defineMiddleware({
  onRequest: async (event) => {
    const session = await auth.api.getSession({
      headers: event.headers,
    });

    const authResult: Auth = !session
      ? { isAuthenticated: false, user: null, session: null }
      : {
          isAuthenticated: true,
          user: session.user,
          session: session.session,
        };

    event.context.auth = authResult;
  },
});
