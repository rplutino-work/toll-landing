"use client";

import { motion } from "framer-motion";

const POINTS = [
  "Un cambio en la estrategia se refleja automáticamente en la web, la pauta y el contenido.",
  "Coherencia estética y técnica en todos los puntos de contacto.",
  "Un solo contacto. Nosotros nos encargamos del resto.",
];

export default function About() {
  return (
    <section id="nosotros" className="bg-verde-noche px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 max-w-3xl font-display text-4xl leading-tight text-white md:text-6xl"
        >
          La solución de{" "}
          <span className="italic text-lima">contacto&nbsp;único.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-16 max-w-2xl font-body text-base font-light leading-relaxed text-white/80 md:text-lg"
        >
          Somos una agencia diseñada para resolver todas las necesidades
          digitales de tu marca bajo un mismo techo. Sin múltiples proveedores,
          sin dispersión, sin errores de comunicación.
        </motion.p>

        {/* Highlighted points */}
        <div className="mb-16 flex flex-col gap-8">
          {POINTS.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="flex items-start gap-5"
            >
              <div className="mt-2 h-3 w-3 flex-shrink-0 rounded-sm bg-lima" />
              <p className="max-w-xl font-body text-base font-light leading-relaxed text-white/90 md:text-lg">
                {point}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Location */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-body text-xs font-medium tracking-[0.3em] text-white/40"
        >
          BASED IN ADROGUÉ / BUENOS AIRES
        </motion.p>
      </div>
    </section>
  );
}
