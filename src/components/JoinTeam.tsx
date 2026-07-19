"use client";

import { motion } from "framer-motion";

export default function JoinTeam() {
  return (
    <section id="sumate" className="bg-verde-noche px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
          {/* Left — text */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-8 font-display text-5xl leading-[1.1] text-white md:text-7xl"
            >
              Sumate
              <br />
              <span className="italic text-lima">al equipo.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mb-10 max-w-md font-body text-base font-light leading-relaxed text-white/70"
            >
              ¿Tenés experiencia en contenido, diseño, pauta o estrategia
              digital? Estamos buscando personas con ganas de sumarse a nuevos
              proyectos. Envianos tu CV y te contactamos.
            </motion.p>

            <motion.a
              href="mailto:contacto@toll.com.ar?subject=CV%20—%20Quiero%20sumarme%20al%20equipo"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-block rounded-full border border-lima bg-transparent px-10 py-3 font-body text-sm font-medium tracking-[0.15em] text-lima transition-all duration-300 hover:bg-lima hover:text-verde-noche"
            >
              ENVIÁ TU CV
            </motion.a>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-6 font-body text-sm font-light text-white/40"
            >
              contacto@toll.com.ar
            </motion.p>
          </div>

          {/* Right — decorative */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center"
          >
            <div className="relative flex aspect-square w-full max-w-sm items-center justify-center rounded-3xl border border-white/5 bg-verde-oscuro/30">
              <div className="flex flex-col items-center gap-4">
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 64 64"
                  fill="none"
                  className="text-lima/60"
                >
                  <path
                    d="M32 8V56M8 32H56"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                </svg>
                <p className="font-body text-xs font-medium tracking-[0.2em] text-white/30">
                  TU LUGAR
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
