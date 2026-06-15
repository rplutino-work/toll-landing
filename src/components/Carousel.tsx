"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const CAROUSEL_IMAGES = [
  { src: "/fotos/aria/extra4.jpg", alt: "Aria" },
  { src: "/fotos/calupe/extra1.jpg", alt: "Calupe Store" },
  { src: "/fotos/plataci/extra1.jpg", alt: "Plataci" },
  { src: "/fotos/cf-power/extra1.jpg", alt: "Compact Fit Power Series" },
  { src: "/fotos/nena-cafe/extra3.jpg", alt: "Nena Cafe" },
  { src: "/fotos/jwan/extra1.jpg", alt: "Jwan" },
  { src: "/fotos/15-de-mora/extra2.jpg", alt: "15 de Mora" },
  { src: "/fotos/la-focacceria/extra1.jpg", alt: "La Focacceria" },
  { src: "/fotos/cruz-dz/extra2.jpg", alt: "Cruz DZ" },
  { src: "/fotos/cf-pilates/extra1.jpg", alt: "Compact Fit Pilates Basics" },
  { src: "/fotos/paseo-bynnon/extra1.jpg", alt: "Paseo Bynnon" },
  { src: "/fotos/magna/extra1.jpg", alt: "Magna" },
  { src: "/fotos/aria/extra5.jpg", alt: "Aria" },
  { src: "/fotos/nena-cafe/extra4.jpg", alt: "Nena Cafe" },
  { src: "/fotos/15-de-mora/extra3.jpg", alt: "15 de Mora" },
  { src: "/fotos/aria/extra6.jpg", alt: "Aria" },
];

export default function Carousel() {
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

      {/* Infinite marquee */}
      <div className="relative w-full overflow-hidden">
        <div className="animate-marquee flex w-max gap-4">
          {/* Double the images for seamless loop */}
          {[...CAROUSEL_IMAGES, ...CAROUSEL_IMAGES].map((img, i) => (
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
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
