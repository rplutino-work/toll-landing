import { NextResponse } from "next/server";
import { put, del } from "@vercel/blob";
import { verifyAdmin } from "@/lib/auth";

export async function POST(request: Request) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const blob = await put(`portfolio/${file.name}`, file, {
    access: "public",
    addRandomSuffix: true,
  });

  return NextResponse.json({ url: blob.url });
}

export async function DELETE(request: Request) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { url } = (await request.json()) as { url: string };
  if (!url || !url.includes("vercel-storage.com")) {
    return NextResponse.json({ error: "URL inválida" }, { status: 400 });
  }

  await del(url);
  return NextResponse.json({ ok: true });
}
