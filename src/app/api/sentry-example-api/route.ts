import { NextResponse } from "next/server";

export async function GET() {
  throw new Error("Sentry Example API Error");
  return NextResponse.json({ message: "OK" });
}
