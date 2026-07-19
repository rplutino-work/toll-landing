"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hola! Soy ${nombre} (${email}). ${mensaje}`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/5411344704484?text=${encoded}`, "_blank");
  };

  return (
    <section id="contacto" className="bg-verde-oscuro px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 font-display text-5xl italic text-lima md:text-7xl"
        >
          Hablemos.
        </motion.h2>

        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <a
              href="tel:+5411344704484"
              className="font-body text-lg font-light text-white transition-colors hover:text-lima md:text-xl"
            >
              +54 11 3447 0484
            </a>
            <a
              href="mailto:contacto@toll.com.ar"
              className="font-body text-lg font-light text-white transition-colors hover:text-lima md:text-xl"
            >
              contacto@toll.com.ar
            </a>
            <p className="font-body text-base font-light text-white/60">
              Adrogué, Buenos Aires
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className="border-b border-white/20 bg-transparent px-0 py-3 font-body text-base font-light text-white outline-none transition-colors placeholder:text-white/40 focus:border-lima"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-b border-white/20 bg-transparent px-0 py-3 font-body text-base font-light text-white outline-none transition-colors placeholder:text-white/40 focus:border-lima"
            />
            <textarea
              placeholder="Mensaje"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              required
              rows={4}
              className="resize-none border-b border-white/20 bg-transparent px-0 py-3 font-body text-base font-light text-white outline-none transition-colors placeholder:text-white/40 focus:border-lima"
            />
            <button
              type="submit"
              className="mt-4 self-start rounded-full border border-lima bg-transparent px-10 py-3 font-body text-sm font-medium tracking-[0.15em] text-lima transition-all duration-300 hover:bg-lima hover:text-verde-noche"
            >
              ENVIAR
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
