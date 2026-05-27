import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { signIn } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

async function LoginForm() {
  const handleLogin = async (formData: FormData) => {
    "use server";
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    await signIn("credentials", { email, password, redirectTo: "/dashboard" });
  };

  return (
    <form action={handleLogin} className="space-y-4">
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          placeholder="email@example.com"
        />
      </div>
      <div>
        <label htmlFor="password" className="mb-1 block text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          placeholder="••••••••"
        />
      </div>
      <Button type="submit" className="w-full">
        Masuk
      </Button>
    </form>
  );
}

export default async function LoginPage() {
  const session = await auth();
  if (session) redirect("/dashboard");

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Masuk</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <LoginForm />
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                atau
              </span>
            </div>
          </div>
          <form
            action={async () => {
              "use server";
              await signIn("github", { redirectTo: "/dashboard" });
            }}
          >
            <Button type="submit" variant="secondary" className="w-full">
              Masuk dengan GitHub
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
