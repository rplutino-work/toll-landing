"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Project {
  name: string;
  category: string;
  image: string;
  size: "large" | "medium";
}

const PROJECTS: Project[] = [
  { name: "Aria", category: "Social Media & Contenido", image: "/fotos/aria/hero.jpg", size: "large" },
  { name: "Calupe Store", category: "E-commerce", image: "/fotos/calupe/hero.jpg", size: "medium" },
  { name: "Nena Cafe", category: "Social Media & Contenido", image: "/fotos/nena-cafe/hero.jpg", size: "medium" },
  { name: "Compact Fit Power Series", category: "E-commerce & Contenido", image: "/fotos/cf-power/hero.jpg", size: "large" },
  { name: "La Focacceria", category: "Social Media & Contenido", image: "/fotos/la-focacceria/hero.jpg", size: "medium" },
  { name: "Plataci", category: "Social Media & Contenido", image: "/fotos/plataci/hero.jpg", size: "medium" },
  { name: "Cruz DZ", category: "Fotografía", image: "/fotos/cruz-dz/hero.jpg", size: "large" },
  { name: "Mele Roller", category: "E-commerce", image: "/fotos/mele-roller/hero.jpg", size: "medium" },
  { name: "Magna", category: "E-commerce", image: "/fotos/magna/hero.jpg", size: "medium" },
  { name: "Compact Fit Pilates Basics", category: "E-commerce & Contenido", image: "/fotos/cf-pilates/hero.jpg", size: "large" },
  { name: "Jwan", category: "Fotografía", image: "/fotos/jwan/hero.jpg", size: "medium" },
  { name: "15 de Mora", category: "Eventos & Social", image: "/fotos/15-de-mora/hero.jpg", size: "medium" },
  { name: "Paseo Bynnon", category: "Eventos & Social", image: "/fotos/paseo-bynnon/hero.jpg", size: "large" },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
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
      />
      {/* Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-verde-noche/80 via-transparent to-transparent p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <h3 className="font-display text-2xl text-white">{project.name}</h3>
        <p className="mt-1 font-body text-xs font-medium tracking-[0.15em] text-lima">
          {project.category.toUpperCase()}
        </p>
      </div>
      {/* Always-visible label on mobile */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-verde-noche/70 to-transparent p-4 md:hidden">
        <h3 className="font-display text-lg text-white">{project.name}</h3>
        <p className="font-body text-[10px] font-medium tracking-[0.15em] text-lima">
          {project.category.toUpperCase()}
        </p>
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
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
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
