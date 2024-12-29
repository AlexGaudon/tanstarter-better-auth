import { Link, createFileRoute } from "@tanstack/react-router";
import { Button } from "~/lib/components/ui/button";
import { authClient } from "~/lib/utils/authClient";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const { auth } = Route.useRouteContext();

  return (
    <div className="flex flex-col gap-4 p-6">
      <h1 className="text-4xl font-bold">TanStarter</h1>
      <div className="flex items-center gap-2">
        This is an unprotected page:
        <pre className="rounded-md border bg-card p-1 text-card-foreground">
          routes/index.tsx
        </pre>
      </div>

      {auth.isAuthenticated ? (
        <div className="flex flex-col gap-2">
          <p>Welcome back, {auth.user?.name}!</p>
          <Button type="button" asChild className="w-fit" size="lg">
            <Link to="/dashboard">Go to Dashboard</Link>
          </Button>
          <div>
            More data:
            <pre>{JSON.stringify(auth, null, 2)}</pre>
          </div>

          <Button
            onClick={() => {
              authClient.signOut().then(() => {
                window.location.reload();
                window.location.href = "/";
              });
            }}
            className="w-fit"
            variant="destructive"
            size="lg"
          >
            Sign out
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <p>You are not signed in.</p>
          <Button type="button" asChild className="w-fit" size="lg">
            <Link to="/signin">Sign in</Link>
          </Button>
        </div>
      )}

      <a
        className="text-muted-foreground underline hover:text-foreground"
        href="https://github.com/alexgaudon/tanstarter-better-auth"
        target="_blank"
        rel="noreferrer noopener"
      >
        alexgaudon/tanstarter-better-auth
      </a>
      <a
        className="text-muted-foreground underline hover:text-foreground"
        href="https://github.com/dotnize/tanstarter"
        target="_blank"
        rel="noreferrer noopener"
      >
        based on dotnize/tanstarter
      </a>
    </div>
  );
}
