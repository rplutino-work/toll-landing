import { NextResponse } from "next/server";
import { put, head } from "@vercel/blob";
import { verifyAdmin } from "@/lib/auth";

interface CVSubmission {
  id: string;
  name: string;
  lastName: string;
  email: string;
  fileUrl: string;
  fileName: string;
  date: string;
}

interface CVConfig {
  submissions: CVSubmission[];
}

const CV_CONFIG_PATH = "cv-submissions.json";

async function getCVSubmissions(): Promise<CVConfig> {
  try {
    const blob = await head(CV_CONFIG_PATH);
    const res = await fetch(blob.url, { cache: "no-store" });
    return (await res.json()) as CVConfig;
  } catch {
    return { submissions: [] };
  }
}

async function saveCVSubmissions(config: CVConfig): Promise<void> {
  await put(CV_CONFIG_PATH, JSON.stringify(config), {
    access: "public",
    addRandomSuffix: false,
    contentType: "application/json",
  });
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const file = formData.get("file") as File | null;

  if (!name?.trim() || !lastName?.trim() || !email?.trim() || !file) {
    return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Email inválido" }, { status: 400 });
  }

  const ext = file.name.split(".").pop()?.toLowerCase();
  if (!["pdf", "doc", "docx"].includes(ext || "")) {
    return NextResponse.json({ error: "Tipo de archivo no permitido" }, { status: 400 });
  }

  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json({ error: "Archivo demasiado grande (máx 10MB)" }, { status: 400 });
  }

  const blob = await put(`cvs/${Date.now()}-${file.name}`, file, {
    access: "public",
    addRandomSuffix: false,
  });

  const config = await getCVSubmissions();
  config.submissions.unshift({
    id: Math.random().toString(36).substring(2, 10),
    name: name.trim(),
    lastName: lastName.trim(),
    email: email.trim(),
    fileUrl: blob.url,
    fileName: file.name,
    date: new Date().toISOString(),
  });
  await saveCVSubmissions(config);

  return NextResponse.json({ ok: true });
}

export async function GET(request: Request) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const config = await getCVSubmissions();
  return NextResponse.json(config);
}
