import { NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/auth";

export async function POST(request: Request) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  return NextResponse.json({ ok: true });
}
