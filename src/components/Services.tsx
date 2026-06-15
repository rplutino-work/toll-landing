"use client";

import { motion } from "framer-motion";

const SERVICES = [
  {
    title: "Identidad & Branding",
    description: "Construcción y gestión de la identidad visual y conceptual de tu marca.",
  },
  {
    title: "Producción de Contenido",
    description: "Fotografía, producción y edición de video con estándares de alta calidad.",
  },
  {
    title: "Estrategia & Performance",
    description: "Gestión de redes sociales y pauta publicitaria con foco en ROI.",
  },
  {
    title: "Diseño Gráfico",
    description: "Piezas visuales adaptadas a cada plataforma y objetivo de campaña.",
  },
  {
    title: "Soluciones Digitales",
    description: "Desarrollo web y arquitectura técnica orientada a la conversión.",
  },
];

const PILLS = [
  "BRANDING",
  "FOTOGRAFÍA",
  "VIDEO",
  "SOCIAL MEDIA",
  "ADS",
  "DISEÑO",
  "WEB",
  "E-COMMERCE",
  "ESTRATEGIA",
];

export default function Services() {
  return (
    <section id="servicios" className="bg-verde-oscuro px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-4 font-display text-4xl text-white md:text-6xl"
        >
          <span className="italic text-lima">Potenciamos</span> tu marca
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-16 font-body text-base font-light text-white/80 md:text-lg"
        >
          Una agencia, todas las soluciones.
        </motion.p>

        {/* Service cards grid */}
        <div className="mb-20 grid grid-cols-1 gap-8 md:grid-cols-2">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group flex gap-5"
            >
              {/* Green square icon */}
              <div className="mt-1 h-4 w-4 flex-shrink-0 rounded-sm bg-lima transition-transform duration-300 group-hover:scale-125" />
              <div>
                <h3 className="mb-2 font-display text-2xl text-white md:text-3xl">
                  {service.title}
                </h3>
                <p className="font-body text-sm font-light leading-relaxed text-white/70">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pills */}
        <div className="flex flex-wrap gap-3">
          {PILLS.map((pill, i) => (
            <motion.span
              key={pill}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
              className="cursor-default rounded-full border border-white/30 px-5 py-2 font-body text-xs font-medium tracking-[0.15em] text-white/80 transition-all duration-300 hover:border-lima hover:bg-lima hover:text-verde-noche"
            >
              {pill}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
