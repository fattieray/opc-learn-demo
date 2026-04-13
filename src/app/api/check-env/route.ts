import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    apiUrl: process.env.NEXT_PUBLIC_API_URL || "NOT SET",
    nodeEnv: process.env.NODE_ENV,
    vercel: process.env.VERCEL || "not deployed",
    vercelEnv: process.env.VERCEL_ENV || "not set",
  });
}
