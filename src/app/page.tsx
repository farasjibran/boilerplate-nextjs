import Link from "next/link";
import { env } from "@/lib/env";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Server Components",
    description: "Default rendering di server untuk performa dan keamanan.",
  },
  {
    title: "TypeScript Strict",
    description: "Type safety penuh tanpa kompromi.",
  },
  {
    title: "Tailwind CSS",
    description: "Utility-first styling dengan design tokens.",
  },
  {
    title: "Zod Validation",
    description: "Runtime type validation untuk input dan environment.",
  },
  {
    title: "Testing Ready",
    description: "Vitest + Testing Library untuk unit & component test.",
  },
  {
    title: "AI-Friendly",
    description: "Struktur deterministic untuk AI coding agent.",
  },
];

export default function HomePage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {env.NEXT_PUBLIC_APP_NAME}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Boilerplate Next.js yang dirancang agar ramah, konsisten, dan
          efektif untuk AI coding agent.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild>
            <Link href="/notes">Lihat Contoh Fitur</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/docs">Dokumentasi</Link>
          </Button>
        </div>
      </div>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title}>
            <CardHeader>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
