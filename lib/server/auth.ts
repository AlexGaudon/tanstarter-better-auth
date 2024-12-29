import { betterAuth, Session, User } from "better-auth";
import { db } from "./db";

import { drizzleAdapter } from "better-auth/adapters/drizzle";

export type Auth =
  | { isAuthenticated: false; user: null; session: null }
  | { isAuthenticated: true; user: User; session: Session };

export const auth = betterAuth({
  trustedOrigins: ["http://localhost:3000", "http://localhost:3000/signin"],
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  socialProviders: {
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    },
  },
});
