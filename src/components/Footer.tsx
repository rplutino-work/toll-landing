import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-verde-noche px-6 py-16 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Separator */}
        <div className="mb-12 h-px w-full bg-verde-oscuro" />

        <div className="flex flex-col items-center gap-8">
          {/* Logo */}
          <Image
            src="/logo-secundario.png"
            alt="Toll Studio"
            width={90}
            height={24}
            className="h-6 w-auto"
          />

          {/* Nav links */}
          <div className="flex flex-wrap justify-center gap-8">
            {["PORTAFOLIO", "SERVICIOS", "NOSOTROS", "CONTACTO"].map(
              (link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="font-body text-xs font-medium tracking-[0.2em] text-white/50 transition-colors hover:text-lima"
                >
                  {link}
                </a>
              )
            )}
          </div>

          {/* Social */}
          <a
            href="https://instagram.com/toll.studio"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-sm font-light text-white/50 transition-colors hover:text-lima"
          >
            @toll.studio
          </a>

          {/* Credits */}
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="font-body text-xs font-light text-white/30">
              Desarrollado por{" "}
              <a
                href="https://rok.com.ar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 transition-colors hover:text-lima"
              >
                rok.studio
              </a>
            </p>
            <p className="font-body text-xs font-light text-white/30">
              &copy; 2026 Toll Studio
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
