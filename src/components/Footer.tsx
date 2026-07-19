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
            alt="Toll"
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

          {/* rok credits — bigger */}
          <div className="mt-8 flex flex-col items-center gap-3">
            <a
              href="https://rok.com.ar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 opacity-70 transition-opacity hover:opacity-100"
            >
              <span className="font-body text-sm font-light text-white/70">
                Desarrollado por
              </span>
              <Image
                src="/rok-logo.png"
                alt="rok.studio"
                width={100}
                height={28}
                className="h-6 w-auto"
              />
            </a>
          </div>

          <p className="font-body text-xs font-light text-white/30">
            &copy; 2026 Toll
          </p>
        </div>
      </div>
    </footer>
  );
}
