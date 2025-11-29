import { getAuth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const handler = toNextJsHandler(getAuth());
  return handler.GET(request);
}

export async function POST(request: NextRequest) {
  const handler = toNextJsHandler(getAuth());
  return handler.POST(request);
}
