import { createFileRoute, redirect } from "@tanstack/react-router";
import { Button } from "~/lib/components/ui/button";
import { authClient } from "~/lib/utils/authClient";

export const Route = createFileRoute("/signin")({
  component: AuthPage,
  beforeLoad: async ({ context }) => {
    console.log(context);
    if (context.auth.isAuthenticated) {
      throw redirect({
        to: "/dashboard",
      });
    }
  },
});

function AuthPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-8 rounded-xl border bg-card p-10">
        Logo here
        <form method="GET" className="flex flex-col gap-2">
          <Button
            variant="outline"
            type="button"
            onClick={async () => {
              await authClient.signIn.social({
                provider: "discord",
                callbackURL: "/", //redirect to dashboard after sign in
              });
            }}
          >
            Sign in with Discord
          </Button>
        </form>
      </div>
    </div>
  );
}
