"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import type { PortfolioProject, PortfolioConfig } from "@/lib/portfolio";

function generateId() {
  return Math.random().toString(36).substring(2, 10);
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [message, setMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  const getHeaders = useCallback(() => {
    const stored = sessionStorage.getItem("admin-pw") ?? password;
    return { "x-admin-password": stored };
  }, [password]);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/portfolio");
      const data = (await res.json()) as PortfolioConfig;
      setProjects(data.projects);
    } catch {
      setMessage("Error cargando proyectos");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const stored = sessionStorage.getItem("admin-pw");
    if (stored) {
      setPassword(stored);
      setAuthed(true);
    }
  }, []);

  useEffect(() => {
    if (authed) fetchProjects();
  }, [authed, fetchProjects]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "x-admin-password": password },
      });
      if (res.status === 401) {
        setMessage("Contraseña incorrecta");
        return;
      }
      sessionStorage.setItem("admin-pw", password);
      setAuthed(true);
      setMessage("");
    } catch {
      setMessage("Error de conexión");
    }
  }

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch("/api/portfolio", {
        method: "PUT",
        headers: { ...getHeaders(), "Content-Type": "application/json" },
        body: JSON.stringify({ projects }),
      });
      if (!res.ok) throw new Error();
      setDirty(false);
      setMessage("Guardado correctamente");
      setTimeout(() => setMessage(""), 3000);
    } catch {
      setMessage("Error al guardar");
    }
    setSaving(false);
  }

  function updateProject(id: string, updates: Partial<PortfolioProject>) {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    setDirty(true);
  }

  function removeProject(id: string) {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    setDirty(true);
  }

  function moveProject(id: string, direction: -1 | 1) {
    setProjects((prev) => {
      const idx = prev.findIndex((p) => p.id === id);
      if (idx < 0) return prev;
      const newIdx = idx + direction;
      if (newIdx < 0 || newIdx >= prev.length) return prev;
      const copy = [...prev];
      [copy[idx], copy[newIdx]] = [copy[newIdx], copy[idx]];
      return copy;
    });
    setDirty(true);
  }

  function addProject() {
    const newProject: PortfolioProject = {
      id: generateId(),
      name: "Nuevo Proyecto",
      category: "Categoría",
      image: "",
      size: "medium",
      enabled: false,
    };
    setProjects((prev) => [...prev, newProject]);
    setDirty(true);
  }

  async function handleImageUpload(projectId: string, file: File) {
    setUploadingId(projectId);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: getHeaders(),
        body: formData,
      });
      if (!res.ok) throw new Error();
      const { url } = (await res.json()) as { url: string };
      updateProject(projectId, { image: url });
    } catch {
      setMessage("Error subiendo imagen");
    }
    setUploadingId(null);
  }

  // ── Login Screen ──
  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-verde-noche px-6">
        <form onSubmit={handleLogin} className="flex w-full max-w-sm flex-col gap-6">
          <Image src="/logo-secundario.png" alt="TOLL" width={120} height={32} className="mx-auto h-8 w-auto" />
          <p className="text-center font-body text-sm text-white/50">Panel de administración</p>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-lg border border-white/10 bg-verde-oscuro px-4 py-3 font-body text-sm text-white outline-none focus:border-lima"
          />
          <button
            type="submit"
            className="rounded-lg bg-lima px-6 py-3 font-body text-sm font-semibold text-verde-noche transition-opacity hover:opacity-90"
          >
            Ingresar
          </button>
          {message && <p className="text-center font-body text-xs text-red-400">{message}</p>}
        </form>
      </div>
    );
  }

  // ── Admin Dashboard ──
  return (
    <div className="min-h-screen bg-verde-noche">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-verde-noche/95 px-6 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-center gap-4">
            <Image src="/logo-secundario.png" alt="TOLL" width={70} height={20} className="h-5 w-auto" />
            <span className="font-body text-xs tracking-widest text-white/30">ADMIN</span>
          </div>
          <div className="flex items-center gap-4">
            {dirty && (
              <span className="font-body text-xs text-lima">Cambios sin guardar</span>
            )}
            {message && (
              <span className="font-body text-xs text-white/60">{message}</span>
            )}
            <button
              onClick={handleSave}
              disabled={saving || !dirty}
              className="rounded-lg bg-lima px-5 py-2 font-body text-xs font-semibold text-verde-noche transition-opacity hover:opacity-90 disabled:opacity-30"
            >
              {saving ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-5xl px-6 py-8">
        {/* Stats + Add */}
        <div className="mb-8 flex items-center justify-between">
          <p className="font-body text-sm text-white/50">
            {projects.filter((p) => p.enabled).length} activos de {projects.length} proyectos
          </p>
          <button
            onClick={addProject}
            className="rounded-lg border border-lima/30 px-4 py-2 font-body text-xs font-medium text-lima transition-colors hover:bg-lima/10"
          >
            + Agregar Proyecto
          </button>
        </div>

        {loading ? (
          <p className="text-center font-body text-sm text-white/30">Cargando...</p>
        ) : (
          <div className="flex flex-col gap-4">
            {projects.map((project, idx) => (
              <div
                key={project.id}
                className={`flex flex-col gap-4 rounded-xl border p-4 transition-colors sm:flex-row sm:items-center ${
                  project.enabled
                    ? "border-white/10 bg-verde-oscuro/50"
                    : "border-white/5 bg-verde-oscuro/20 opacity-50"
                }`}
              >
                {/* Image */}
                <div
                  className="relative h-24 w-24 flex-shrink-0 cursor-pointer overflow-hidden rounded-lg bg-verde-oscuro"
                  onClick={() => {
                    fileInputRef.current?.setAttribute("data-project-id", project.id);
                    fileInputRef.current?.click();
                  }}
                >
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      sizes="96px"
                      className="object-cover"
                      unoptimized={project.image.includes("vercel-storage")}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="font-body text-[10px] text-white/30">+ Foto</span>
                    </div>
                  )}
                  {uploadingId === project.id && (
                    <div className="absolute inset-0 flex items-center justify-center bg-verde-noche/80">
                      <span className="font-body text-[10px] text-lima">Subiendo...</span>
                    </div>
                  )}
                </div>

                {/* Fields */}
                <div className="flex flex-1 flex-col gap-2">
                  <input
                    type="text"
                    value={project.name}
                    onChange={(e) => updateProject(project.id, { name: e.target.value })}
                    placeholder="Nombre del cliente"
                    className="bg-transparent font-display text-lg text-white outline-none placeholder:text-white/20"
                  />
                  <input
                    type="text"
                    value={project.category}
                    onChange={(e) => updateProject(project.id, { category: e.target.value })}
                    placeholder="Categoría (se muestra en hover)"
                    className="bg-transparent font-body text-xs tracking-wide text-white/60 outline-none placeholder:text-white/20"
                  />
                </div>

                {/* Controls */}
                <div className="flex items-center gap-3">
                  {/* Size */}
                  <select
                    value={project.size}
                    onChange={(e) =>
                      updateProject(project.id, {
                        size: e.target.value as "large" | "medium",
                      })
                    }
                    className="rounded border border-white/10 bg-verde-oscuro px-2 py-1 font-body text-[10px] text-white/60 outline-none"
                  >
                    <option value="large">Grande</option>
                    <option value="medium">Mediano</option>
                  </select>

                  {/* Toggle */}
                  <button
                    onClick={() => updateProject(project.id, { enabled: !project.enabled })}
                    className={`relative h-6 w-11 rounded-full transition-colors ${
                      project.enabled ? "bg-lima" : "bg-white/10"
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-transform ${
                        project.enabled ? "translate-x-5" : ""
                      }`}
                    />
                  </button>

                  {/* Move */}
                  <div className="flex flex-col gap-0.5">
                    <button
                      onClick={() => moveProject(project.id, -1)}
                      disabled={idx === 0}
                      className="rounded px-1 text-white/30 transition-colors hover:text-white disabled:opacity-20"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 3L3 7.5H11L7 3Z" fill="currentColor"/></svg>
                    </button>
                    <button
                      onClick={() => moveProject(project.id, 1)}
                      disabled={idx === projects.length - 1}
                      className="rounded px-1 text-white/30 transition-colors hover:text-white disabled:opacity-20"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 11L11 6.5H3L7 11Z" fill="currentColor"/></svg>
                    </button>
                  </div>

                  {/* Delete */}
                  <button
                    onClick={() => {
                      if (confirm(`¿Eliminar "${project.name}"?`)) removeProject(project.id);
                    }}
                    className="rounded p-1 text-white/20 transition-colors hover:text-red-400"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          const projectId = fileInputRef.current?.getAttribute("data-project-id");
          if (file && projectId) {
            handleImageUpload(projectId, file);
          }
          e.target.value = "";
        }}
      />
    </div>
  );
}
