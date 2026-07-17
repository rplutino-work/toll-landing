"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { PortfolioProject } from "@/lib/portfolio";

function ProjectCard({ project, index }: { project: PortfolioProject; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className={`group relative overflow-hidden rounded-lg ${
        project.size === "large" ? "md:col-span-2 aspect-[4/3]" : "aspect-[3/4]"
      }`}
    >
      <Image
        src={project.image}
        alt={project.name}
        fill
        sizes={project.size === "large" ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
        unoptimized={project.image.includes("vercel-storage")}
      />
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
  return (
    <section id="portafolio" className="bg-verde-noche px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 font-display text-5xl text-white md:text-7xl"
        >
          Portafolio.
        </motion.h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
