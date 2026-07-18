"use client";

import { useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { PortfolioProject } from "@/lib/portfolio";

export default function ProjectModal({
  project,
  onClose,
}: {
  project: PortfolioProject;
  onClose: () => void;
}) {
  const allMedia = [project.image, ...(project.gallery || [])];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[60] overflow-y-auto bg-verde-noche/[0.98]"
    >
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between bg-verde-noche/90 px-6 py-5 backdrop-blur-md lg:px-10">
        <div className="flex items-center gap-4">
          {project.logo && (
            <Image
              src={project.logo}
              alt=""
              width={48}
              height={24}
              className="h-6 w-auto object-contain"
              unoptimized={project.logo.includes("vercel-storage")}
            />
          )}
          <div>
            <h2 className="font-display text-2xl text-white md:text-3xl">
              {project.name}
            </h2>
            <p className="font-body text-[10px] font-medium tracking-[0.2em] text-lima">
              {project.category.toUpperCase()}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/60 transition-colors hover:border-lima hover:text-lima"
          aria-label="Cerrar"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M4 4L14 14M14 4L4 14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Gallery */}
      <div className="mx-auto max-w-7xl px-6 pb-16 pt-4 lg:px-10">
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {allMedia.map((src, i) => {
            const isVideo = /\.(mp4|webm|mov)$/i.test(src);
            return (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="mb-4 break-inside-avoid overflow-hidden rounded-lg"
              >
                {isVideo ? (
                  <video
                    src={src}
                    controls
                    playsInline
                    className="w-full rounded-lg"
                    preload="metadata"
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={src}
                    alt={`${project.name} - ${i + 1}`}
                    className="w-full rounded-lg"
                    loading={i < 4 ? "eager" : "lazy"}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
