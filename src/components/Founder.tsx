"use client";

import { motion } from "framer-motion";

export default function Founder() {
  return (
    <section className="bg-verde-noche px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 font-display text-5xl text-white md:text-7xl"
        >
          Founder.
        </motion.h2>

        <div className="flex flex-col items-center gap-12 md:flex-row md:items-start md:gap-20">
          {/* Photo placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative h-80 w-64 flex-shrink-0 overflow-hidden rounded-lg bg-verde-oscuro md:h-[450px] md:w-[340px]"
            style={{ filter: "grayscale(100%)" }}
          >
            {/* Placeholder initials */}
            <div className="flex h-full w-full items-center justify-center">
              <span className="font-display text-6xl text-white/20 md:text-8xl">
                TG
              </span>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col items-center md:items-start md:pt-12"
          >
            <h3 className="mb-4 font-display text-4xl text-white md:text-5xl">
              Tomás Guzmán
            </h3>
            <p className="font-body text-base font-light text-white/70 md:text-lg">
              Desde Adrogué para el mundo digital.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
