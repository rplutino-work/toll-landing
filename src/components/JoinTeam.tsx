"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CVModal from "./CVModal";

export default function JoinTeam() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <section id="sumate" className="bg-verde-noche px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
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
            className="mx-auto mb-10 max-w-lg font-body text-base font-light leading-relaxed text-white/70"
          >
            ¿Tenés experiencia en contenido, diseño, pauta o estrategia
            digital? Estamos buscando personas con ganas de sumarse a nuevos
            proyectos. Envianos tu CV y te contactamos.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            onClick={() => setShowModal(true)}
            className="rounded-full border border-lima bg-transparent px-10 py-3 font-body text-sm font-medium tracking-[0.15em] text-lima transition-all duration-300 hover:bg-lima hover:text-verde-noche"
          >
            ENVIÁ TU CV
          </motion.button>
        </div>
      </section>

      <AnimatePresence>
        {showModal && <CVModal onClose={() => setShowModal(false)} />}
      </AnimatePresence>
    </>
  );
}
