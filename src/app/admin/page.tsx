"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import type { PortfolioProject, PortfolioConfig } from "@/lib/portfolio";
import { PORTFOLIO_SECTIONS } from "@/lib/portfolio";

function generateId() {
  return Math.random().toString(36).substring(2, 10);
}

function Sidebar({ mobile }: { mobile?: boolean }) {
  return (
    <aside
      className={
        mobile
          ? "border-b border-white/5 bg-verde-noche px-6 py-4 lg:hidden"
          : "fixed left-0 top-0 hidden h-screen w-60 flex-col border-r border-white/5 bg-verde-noche p-6 lg:flex"
      }
    >
      {/* Logo */}
      <div className={mobile ? "flex items-center justify-between" : "mb-10"}>
        <div className="flex items-center gap-3">
          <Image src="/logo-secundario.png" alt="Toll" width={70} height={20} className="h-5 w-auto" />
          <span className="rounded bg-lima/10 px-2 py-0.5 font-body text-[9px] font-semibold tracking-widest text-lima">
            ADMIN
          </span>
        </div>
      </div>

      {!mobile && (
        <>
          {/* Nav */}
          <nav className="mb-8 flex flex-col gap-1">
            <div className="flex items-center gap-2 rounded-lg bg-lima/10 px-3 py-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="1" width="6" height="6" rx="1" stroke="#D7FFA9" strokeWidth="1.2" />
                <rect x="9" y="1" width="6" height="6" rx="1" stroke="#D7FFA9" strokeWidth="1.2" />
                <rect x="1" y="9" width="6" height="6" rx="1" stroke="#D7FFA9" strokeWidth="1.2" />
                <rect x="9" y="9" width="6" height="6" rx="1" stroke="#D7FFA9" strokeWidth="1.2" />
              </svg>
              <span className="font-body text-xs font-medium text-lima">Proyectos</span>
            </div>
          </nav>

          {/* Divider */}
          <div className="mb-6 h-px w-full bg-white/5" />

          {/* Reference sizes */}
          <div className="flex flex-col gap-4">
            <span className="font-body text-[9px] font-semibold tracking-[0.2em] text-white/30">
              MEDIDAS DE REFERENCIA
            </span>

            <div className="flex flex-col gap-3">
              <div className="rounded-lg border border-white/5 bg-verde-oscuro/30 p-3">
                <p className="font-body text-[10px] font-semibold text-white/60">Hero (portada)</p>
                <p className="font-body text-[10px] text-white/40">1200 × 900 px</p>
                <p className="font-body text-[10px] text-white/30">Formato 4:3, landscape</p>
              </div>

              <div className="rounded-lg border border-white/5 bg-verde-oscuro/30 p-3">
                <p className="font-body text-[10px] font-semibold text-white/60">Galería</p>
                <p className="font-body text-[10px] text-white/40">800 × 1000 px</p>
                <p className="font-body text-[10px] text-white/30">Vertical u horizontal, alta res</p>
              </div>

              <div className="rounded-lg border border-white/5 bg-verde-oscuro/30 p-3">
                <p className="font-body text-[10px] font-semibold text-white/60">Logo de cliente</p>
                <p className="font-body text-[10px] text-white/40">400 × 200 px</p>
                <p className="font-body text-[10px] text-white/30">PNG con fondo transparente</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-auto pt-6">
            <a
              href="/"
              target="_blank"
              className="font-body text-[10px] text-white/20 transition-colors hover:text-white/40"
            >
              Ver sitio →
            </a>
          </div>
        </>
      )}
    </aside>
  );
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
  const [uploadTarget, setUploadTarget] = useState<{
    projectId: string;
    type: "hero" | "gallery" | "logo";
  } | null>(null);

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
      setMessage("Guardado ✓");
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
      sections: [],
      image: "",
      gallery: [],
      size: "medium",
      enabled: false,
    };
    setProjects((prev) => [...prev, newProject]);
    setDirty(true);
  }

  function toggleSection(projectId: string, sectionId: string) {
    const project = projects.find((p) => p.id === projectId);
    if (!project) return;
    const current = project.sections || [];
    const updated = current.includes(sectionId)
      ? current.filter((s) => s !== sectionId)
      : [...current, sectionId];
    updateProject(projectId, { sections: updated });
  }

  function removeGalleryImage(projectId: string, url: string) {
    const project = projects.find((p) => p.id === projectId);
    if (!project) return;
    updateProject(projectId, {
      gallery: (project.gallery || []).filter((u) => u !== url),
    });
  }

  function triggerUpload(projectId: string, type: "hero" | "gallery" | "logo") {
    setUploadTarget({ projectId, type });
    if (fileInputRef.current) {
      fileInputRef.current.multiple = type === "gallery";
      fileInputRef.current.click();
    }
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0 || !uploadTarget) return;

    const { projectId, type } = uploadTarget;
    setUploadingId(projectId);

    try {
      const urls: string[] = [];
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: getHeaders(),
          body: formData,
        });
        if (!res.ok) throw new Error();
        const { url } = (await res.json()) as { url: string };
        urls.push(url);
      }

      if (type === "hero") {
        updateProject(projectId, { image: urls[0] });
      } else if (type === "gallery") {
        const project = projects.find((p) => p.id === projectId);
        if (project) {
          updateProject(projectId, {
            gallery: [...(project.gallery || []), ...urls],
          });
        }
      } else if (type === "logo") {
        updateProject(projectId, { logo: urls[0] });
      }
    } catch {
      setMessage("Error subiendo imagen");
    }

    setUploadingId(null);
    setUploadTarget(null);
    e.target.value = "";
  }

  // ── Login Screen ──
  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-verde-noche px-6">
        <form onSubmit={handleLogin} className="flex w-full max-w-sm flex-col gap-6">
          <Image src="/logo-secundario.png" alt="Toll" width={120} height={32} className="mx-auto h-8 w-auto" />
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
      {/* Sidebar - desktop */}
      <Sidebar />
      {/* Sidebar - mobile */}
      <Sidebar mobile />

      {/* Main content */}
      <div className="lg:pl-60">
        {/* Header */}
        <header className="sticky top-0 z-40 border-b border-white/5 bg-verde-noche/95 px-6 py-4 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="font-display text-xl text-white">Proyectos</h1>
              <span className="font-body text-xs text-white/30">
                {projects.filter((p) => p.enabled).length}/{projects.length} activos
              </span>
            </div>
            <div className="flex items-center gap-4">
              {dirty && (
                <span className="hidden font-body text-xs text-lima sm:inline">Cambios sin guardar</span>
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
        <main className="px-6 py-8">
          {/* Add button */}
          <div className="mb-6 flex justify-end">
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
                  className={`rounded-xl border p-4 transition-colors ${
                    project.enabled
                      ? "border-white/10 bg-verde-oscuro/50"
                      : "border-white/5 bg-verde-oscuro/20 opacity-50"
                  }`}
                >
                  {/* Top row */}
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                    {/* Hero image */}
                    <div
                      className="relative h-24 w-24 flex-shrink-0 cursor-pointer overflow-hidden rounded-lg bg-verde-oscuro"
                      onClick={() => triggerUpload(project.id, "hero")}
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
                        <div className="flex h-full flex-col items-center justify-center gap-1">
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <rect x="2" y="4" width="16" height="12" rx="2" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" />
                            <circle cx="7" cy="9" r="1.5" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" />
                            <path d="M5 14L9 10L12 13L15 9L18 13" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" />
                          </svg>
                          <span className="font-body text-[9px] text-white/20">1200×900</span>
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
                        placeholder="Texto hover (ej: E-commerce & Contenido)"
                        className="bg-transparent font-body text-xs tracking-wide text-white/60 outline-none placeholder:text-white/20"
                      />
                      {/* Section pills */}
                      <div className="flex flex-wrap gap-1.5">
                        {PORTFOLIO_SECTIONS.map((s) => {
                          const active = (project.sections || []).includes(s.id);
                          return (
                            <button
                              key={s.id}
                              onClick={() => toggleSection(project.id, s.id)}
                              className={`rounded-full px-3 py-1 font-body text-[10px] font-medium tracking-wide transition-all ${
                                active
                                  ? "border border-lima/40 bg-lima/20 text-lima"
                                  : "border border-white/10 text-white/30 hover:border-white/20 hover:text-white/50"
                              }`}
                            >
                              {s.label}
                            </button>
                          );
                        })}
                      </div>
                      {(project.sections || []).length === 0 && project.enabled && (
                        <p className="font-body text-[10px] text-amber-400/70">
                          ⚠ Sin sección asignada — no aparecerá en el portafolio
                        </p>
                      )}
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-3">
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

                  {/* Gallery + Logo row */}
                  <div className="mt-3 flex flex-col gap-3 border-t border-white/5 pt-3 sm:flex-row sm:items-start sm:gap-8">
                    {/* Gallery */}
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-2">
                        <span className="font-body text-[10px] font-medium tracking-widest text-white/30">
                          GALERÍA
                        </span>
                        <span className="font-body text-[9px] text-white/15">800×1000px</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {(project.gallery || []).map((url) => (
                          <div
                            key={url}
                            className="group relative h-14 w-14 overflow-hidden rounded-lg bg-verde-oscuro"
                          >
                            <Image
                              src={url}
                              alt=""
                              fill
                              sizes="56px"
                              className="object-cover"
                              unoptimized={url.includes("vercel-storage")}
                            />
                            <button
                              onClick={() => removeGalleryImage(project.id, url)}
                              className="absolute inset-0 flex items-center justify-center bg-red-500/70 opacity-0 transition-opacity group-hover:opacity-100"
                            >
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M3 3L9 9M9 3L3 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                              </svg>
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => triggerUpload(project.id, "gallery")}
                          className="flex h-14 w-14 items-center justify-center rounded-lg border border-dashed border-white/15 text-white/30 transition-colors hover:border-lima/40 hover:text-lima"
                        >
                          <span className="text-lg">+</span>
                        </button>
                      </div>
                    </div>

                    {/* Logo */}
                    <div className="w-40">
                      <div className="mb-2 flex items-center gap-2">
                        <span className="font-body text-[10px] font-medium tracking-widest text-white/30">
                          LOGO
                        </span>
                        <span className="font-body text-[9px] text-white/15">PNG transp.</span>
                      </div>
                      {project.logo ? (
                        <div className="group relative flex h-14 items-center justify-center overflow-hidden rounded-lg bg-verde-oscuro/50 px-2">
                          <Image
                            src={project.logo}
                            alt="Logo"
                            width={120}
                            height={40}
                            className="h-8 w-auto object-contain"
                            unoptimized={project.logo.includes("vercel-storage")}
                          />
                          <button
                            onClick={() => updateProject(project.id, { logo: undefined })}
                            className="absolute inset-0 flex items-center justify-center bg-red-500/70 opacity-0 transition-opacity group-hover:opacity-100"
                          >
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M3 3L9 9M9 3L3 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => triggerUpload(project.id, "logo")}
                          className="flex h-14 w-full items-center justify-center rounded-lg border border-dashed border-white/15 font-body text-[10px] text-white/30 transition-colors hover:border-lima/40 hover:text-lima"
                        >
                          + Subir logo
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
