"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { PortfolioProject } from "@/lib/portfolio";

export default function Carousel({ projects }: { projects: PortfolioProject[] }) {
  const images = projects.map((p) => ({ src: p.image, alt: p.name }));
  if (images.length === 0) return null;

  return (
    <section className="overflow-hidden bg-verde-noche py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 font-display text-4xl text-white md:text-6xl"
        >
          Esto también es{" "}
          <span className="italic text-lima">Toll.</span>
        </motion.h2>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="animate-marquee flex w-max gap-4">
          {[...images, ...images].map((img, i) => (
            <div
              key={`${img.src}-${i}`}
              className="relative h-64 flex-shrink-0 overflow-hidden rounded-lg md:h-80"
              style={{ width: i % 3 === 0 ? "360px" : i % 3 === 1 ? "280px" : "320px" }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="360px"
                className="object-cover"
                loading="lazy"
                unoptimized={img.src.includes("vercel-storage")}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
