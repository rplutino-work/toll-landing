import { put, head } from "@vercel/blob";
import { type PortfolioConfig, type PortfolioProject, DEFAULT_PROJECTS } from "./portfolio";

const CONFIG_PATH = "portfolio-config.json";

const SECTION_DEFAULTS: Record<string, string[]> = {
  aria: ["gastronomico"],
  calupe: ["ecommerce"],
  "nena-cafe": ["gastronomico"],
  "cf-power": ["ecommerce", "social-media"],
  "la-focacceria": ["gastronomico"],
  plataci: ["gastronomico"],
  "cruz-dz": ["retratos"],
  "mele-roller": ["ecommerce", "social-media"],
  magna: ["ecommerce"],
  "cf-pilates": ["ecommerce"],
  jwan: ["retratos"],
  "15-de-mora": ["eventos-sociales"],
  "paseo-bynnon": ["eventos-sociales"],
};

const GALLERY_DEFAULTS: Record<string, string[]> = {
  aria: ["/fotos/aria/extra4.jpg", "/fotos/aria/extra5.jpg", "/fotos/aria/extra6.jpg"],
  calupe: ["/fotos/calupe/extra1.jpg"],
  "nena-cafe": ["/fotos/nena-cafe/extra3.jpg", "/fotos/nena-cafe/extra4.jpg"],
  "cf-power": ["/fotos/cf-power/extra1.jpg"],
  "la-focacceria": ["/fotos/la-focacceria/extra1.jpg"],
  plataci: ["/fotos/plataci/extra1.jpg"],
  "cruz-dz": ["/fotos/cruz-dz/extra2.jpg"],
  magna: ["/fotos/magna/extra1.jpg"],
  "cf-pilates": ["/fotos/cf-pilates/extra1.jpg"],
  jwan: ["/fotos/jwan/extra1.jpg"],
  "15-de-mora": ["/fotos/15-de-mora/extra2.jpg", "/fotos/15-de-mora/extra3.jpg"],
  "paseo-bynnon": ["/fotos/paseo-bynnon/extra1.jpg"],
};

function migrateProject(p: Record<string, unknown>): PortfolioProject {
  const id = p.id as string;
  return {
    id,
    name: p.name as string,
    category: p.category as string,
    sections: (p.sections as string[] | undefined) ?? SECTION_DEFAULTS[id] ?? [],
    image: p.image as string,
    gallery: (p.gallery as string[] | undefined) ?? GALLERY_DEFAULTS[id] ?? [],
    logo: (p.logo as string | undefined) ?? undefined,
    size: p.size as "large" | "medium",
    enabled: p.enabled as boolean,
  };
}

export async function getPortfolioConfig(): Promise<PortfolioConfig> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return { projects: DEFAULT_PROJECTS };
  try {
    const blob = await head(CONFIG_PATH);
    const res = await fetch(blob.url, { cache: "no-store" });
    const data = (await res.json()) as { projects: Record<string, unknown>[] };
    return { projects: data.projects.map(migrateProject) };
  } catch {
    return { projects: DEFAULT_PROJECTS };
  }
}

export async function savePortfolioConfig(config: PortfolioConfig): Promise<void> {
  await put(CONFIG_PATH, JSON.stringify(config), {
    access: "public",
    addRandomSuffix: false,
    contentType: "application/json",
  });
}
