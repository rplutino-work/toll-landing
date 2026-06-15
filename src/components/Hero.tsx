"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-verde-noche px-6">
      {/* Logo grande */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="mb-8 w-full max-w-3xl"
      >
        <Image
          src="/logo-secundario.png"
          alt="TOLL"
          width={800}
          height={200}
          className="h-auto w-full"
          priority
        />
      </motion.div>

      {/* Tagline 1 */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mb-3 max-w-xl text-center font-body text-base font-light leading-relaxed text-white/90 md:text-lg"
      >
        Estudio creativo de contenido, estrategia y pauta digital.
      </motion.p>

      {/* Tagline 2 */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="max-w-xl text-center font-body text-base font-light leading-relaxed text-white/90 md:text-lg"
      >
        Ayudamos a marcas a{" "}
        <span className="font-display italic text-lima">conectar</span> con su
        audiencia.
      </motion.p>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-10 flex flex-col items-center gap-2"
      >
        <span className="font-body text-[10px] font-medium tracking-[0.3em] text-white/40">
          SCROLL
        </span>
        <div className="animate-bounce-subtle">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 4V16M10 16L5 11M10 16L15 11"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
