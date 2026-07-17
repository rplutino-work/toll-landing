import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Toll Studio — Contenido, Estrategia y Pauta Digital | Adrogué",
  description:
    "Estudio creativo en Adrogué, Buenos Aires. Branding, contenido, estrategia, pauta y soluciones digitales. Una agencia, todas las soluciones.",
  metadataBase: new URL("https://toll.com.ar"),
  openGraph: {
    title: "Toll Studio — Contenido, Estrategia y Pauta Digital | Adrogué",
    description:
      "Estudio creativo en Adrogué, Buenos Aires. Branding, contenido, estrategia, pauta y soluciones digitales.",
    type: "website",
    locale: "es_AR",
    siteName: "Toll Studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Toll Studio — Contenido, Estrategia y Pauta Digital",
    description:
      "Estudio creativo en Adrogué, Buenos Aires. Una agencia, todas las soluciones.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
