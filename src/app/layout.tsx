import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { env } from "@/lib/env";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: env.NEXT_PUBLIC_APP_NAME,
    template: `%s | ${env.NEXT_PUBLIC_APP_NAME}`,
  },
  description: "Boilerplate Next.js yang AI-agent-friendly",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={inter.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
