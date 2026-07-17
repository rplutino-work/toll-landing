import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { verifyAdmin } from "@/lib/auth";
import { getPortfolioConfig, savePortfolioConfig } from "@/lib/storage";
import type { PortfolioConfig } from "@/lib/portfolio";

export async function GET() {
  const config = await getPortfolioConfig();
  return NextResponse.json(config);
}

export async function PUT(request: Request) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const config = (await request.json()) as PortfolioConfig;
  await savePortfolioConfig(config);
  revalidatePath("/");

  return NextResponse.json({ ok: true });
}
