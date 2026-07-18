"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { PortfolioProject } from "@/lib/portfolio";
import { PORTFOLIO_SECTIONS } from "@/lib/portfolio";
import ProjectModal from "./ProjectModal";

function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: PortfolioProject;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className={`group relative cursor-pointer overflow-hidden rounded-lg ${
        project.size === "large" ? "md:col-span-2 aspect-[4/3]" : "aspect-[3/4]"
      }`}
      onClick={onClick}
    >
      <Image
        src={project.image}
        alt={project.name}
        fill
        sizes={
          project.size === "large"
            ? "(max-width: 768px) 100vw, 66vw"
            : "(max-width: 768px) 100vw, 33vw"
        }
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
        unoptimized={project.image.includes("vercel-storage")}
      />
      {project.logo && (
        <div className="absolute top-4 left-4 z-10">
          <Image
            src={project.logo}
            alt=""
            width={80}
            height={40}
            className="h-8 w-auto object-contain drop-shadow-lg"
            unoptimized={project.logo.includes("vercel-storage")}
          />
        </div>
      )}
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-verde-noche/80 via-transparent to-transparent p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <h3 className="font-display text-2xl text-white">{project.name}</h3>
        <p className="mt-1 font-body text-xs font-medium tracking-[0.15em] text-lima">
          {project.category.toUpperCase()}
        </p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-verde-noche/70 to-transparent p-4 md:hidden">
        <h3 className="font-display text-lg text-white">{project.name}</h3>
        <p className="font-body text-[10px] font-medium tracking-[0.15em] text-lima">
          {project.category.toUpperCase()}
        </p>
      </div>
    </motion.div>
  );
}

export default function Portfolio({ projects }: { projects: PortfolioProject[] }) {
  const [activeSection, setActiveSection] = useState<string>(PORTFOLIO_SECTIONS[0].id);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const sectionsWithProjects = PORTFOLIO_SECTIONS.filter((s) =>
    projects.some((p) => (p.sections || []).includes(s.id))
  ).map((s) => ({
    ...s,
    projects: projects.filter((p) => (p.sections || []).includes(s.id)),
  }));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id.replace("sec-", ""));
          }
        }
      },
      { rootMargin: "-120px 0px -60% 0px" }
    );

    for (const ref of Object.values(sectionRefs.current)) {
      if (ref) observer.observe(ref);
    }

    return () => observer.disconnect();
  }, [sectionsWithProjects.length]);

  function scrollToSection(sectionId: string) {
    const el = sectionRefs.current[sectionId];
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 140;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }

  return (
    <>
      <section id="portafolio" className="bg-verde-noche px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 font-display text-5xl text-white md:text-7xl"
          >
            Portafolio.
          </motion.h2>

          {/* Sticky category pills */}
          <div className="sticky top-14 z-30 -mx-6 border-b border-white/5 bg-verde-noche/95 px-6 py-4 backdrop-blur-md lg:-mx-10 lg:px-10">
            <div className="flex gap-3 overflow-x-auto scrollbar-none">
              {sectionsWithProjects.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`shrink-0 rounded-full border px-5 py-2 font-body text-xs font-medium tracking-wider transition-all ${
                    activeSection === section.id
                      ? "border-lima bg-lima text-verde-noche"
                      : "border-white/20 text-white/60 hover:border-lima/50 hover:text-white"
                  }`}
                >
                  {section.label.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Category sections */}
          {sectionsWithProjects.map((section) => (
            <div
              key={section.id}
              id={`sec-${section.id}`}
              ref={(el) => {
                sectionRefs.current[section.id] = el;
              }}
              className="pt-20"
            >
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-8 font-display text-3xl italic text-white/80 md:text-4xl"
              >
                {section.label}
              </motion.h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {section.projects.map((project, i) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={i}
                    onClick={() => setSelectedProject(project)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            key={selectedProject.id}
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
