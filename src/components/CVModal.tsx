"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

interface FormErrors {
  name?: string;
  lastName?: string;
  email?: string;
  file?: string;
}

export default function CVModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEsc);
    };
  }, [handleEsc]);

  function validate(): FormErrors {
    const e: FormErrors = {};
    if (!name.trim()) e.name = "Ingresá tu nombre";
    if (!lastName.trim()) e.lastName = "Ingresá tu apellido";
    if (!email.trim()) {
      e.email = "Ingresá tu email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      e.email = "Email inválido";
    }
    if (!file) {
      e.file = "Adjuntá tu CV";
    } else {
      const ext = file.name.split(".").pop()?.toLowerCase();
      if (!["pdf", "doc", "docx"].includes(ext || "")) {
        e.file = "Solo archivos PDF, DOC o DOCX";
      } else if (file.size > 10 * 1024 * 1024) {
        e.file = "El archivo no puede superar 10MB";
      }
    }
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSending(true);
    setServerError("");

    try {
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("lastName", lastName.trim());
      formData.append("email", email.trim());
      formData.append("file", file!);

      const res = await fetch("/api/cv", { method: "POST", body: formData });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setServerError("Error al enviar. Intentá de nuevo.");
    }
    setSending(false);
  }

  function clearError(field: keyof FormErrors) {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-verde-noche/95 px-6 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md rounded-2xl border border-white/10 bg-verde-oscuro p-8"
      >
        {sent ? (
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-lima/20">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path
                  d="M8 16L14 22L24 10"
                  stroke="#D7FFA9"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="font-display text-2xl text-white">¡CV enviado!</h3>
            <p className="font-body text-sm font-light text-white/60">
              Gracias {name}, revisamos tu perfil y te contactamos pronto.
            </p>
            <button
              onClick={onClose}
              className="mt-4 rounded-full border border-lima px-8 py-2 font-body text-sm font-medium text-lima transition-all hover:bg-lima hover:text-verde-noche"
            >
              Cerrar
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-display text-2xl text-white">Enviá tu CV</h3>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full text-white/40 transition-colors hover:text-white"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M4 4L12 12M12 4L4 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
              <div>
                <input
                  type="text"
                  placeholder="Nombre"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    clearError("name");
                  }}
                  className={`w-full border-b bg-transparent px-0 py-3 font-body text-sm font-light text-white outline-none transition-colors placeholder:text-white/40 ${
                    errors.name ? "border-red-400" : "border-white/20 focus:border-lima"
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 font-body text-xs text-red-400">{errors.name}</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Apellido"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    clearError("lastName");
                  }}
                  className={`w-full border-b bg-transparent px-0 py-3 font-body text-sm font-light text-white outline-none transition-colors placeholder:text-white/40 ${
                    errors.lastName ? "border-red-400" : "border-white/20 focus:border-lima"
                  }`}
                />
                {errors.lastName && (
                  <p className="mt-1 font-body text-xs text-red-400">{errors.lastName}</p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    clearError("email");
                  }}
                  className={`w-full border-b bg-transparent px-0 py-3 font-body text-sm font-light text-white outline-none transition-colors placeholder:text-white/40 ${
                    errors.email ? "border-red-400" : "border-white/20 focus:border-lima"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 font-body text-xs text-red-400">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  className={`flex cursor-pointer items-center gap-3 border-b py-3 transition-colors ${
                    errors.file ? "border-red-400" : "border-white/20"
                  }`}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
                    <path
                      d="M10 14V4M6 8L10 4L14 8"
                      stroke="rgba(255,255,255,0.4)"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 14V15C3 16.1 3.9 17 5 17H15C16.1 17 17 16.1 17 15V14"
                      stroke="rgba(255,255,255,0.4)"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span
                    className={`truncate font-body text-sm font-light ${
                      file ? "text-lima" : "text-white/40"
                    }`}
                  >
                    {file ? file.name : "Adjuntar CV (PDF, DOC, DOCX)"}
                  </span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    className="hidden"
                    onChange={(e) => {
                      setFile(e.target.files?.[0] || null);
                      clearError("file");
                    }}
                  />
                </label>
                {errors.file && (
                  <p className="mt-1 font-body text-xs text-red-400">{errors.file}</p>
                )}
              </div>

              {serverError && (
                <p className="rounded-lg bg-red-500/10 px-3 py-2 font-body text-xs text-red-400">
                  {serverError}
                </p>
              )}

              <button
                type="submit"
                disabled={sending}
                className="mt-2 rounded-full bg-lima px-8 py-3 font-body text-sm font-semibold text-verde-noche transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {sending ? "Enviando..." : "Enviar CV"}
              </button>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
