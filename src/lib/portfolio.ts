export const PORTFOLIO_SECTIONS = [
  { id: "ecommerce", label: "E-commerce" },
  { id: "gastronomico", label: "Gastronómico" },
  { id: "retratos", label: "Retratos" },
  { id: "social-media", label: "Social Media" },
  { id: "eventos-sociales", label: "Eventos Sociales" },
] as const;

export type SectionId = (typeof PORTFOLIO_SECTIONS)[number]["id"];

export interface PortfolioProject {
  id: string;
  name: string;
  category: string;
  sections: string[];
  image: string;
  gallery: string[];
  logo?: string;
  size: "large" | "medium";
  enabled: boolean;
}

export interface PortfolioConfig {
  projects: PortfolioProject[];
}

export const DEFAULT_PROJECTS: PortfolioProject[] = [
  { id: "aria", name: "Aria", category: "Social Media & Contenido", sections: ["gastronomico"], image: "/fotos/aria/hero.jpg", gallery: ["/fotos/aria/extra4.jpg", "/fotos/aria/extra5.jpg", "/fotos/aria/extra6.jpg"], size: "large", enabled: true },
  { id: "calupe", name: "Calupe Store", category: "E-commerce", sections: ["ecommerce"], image: "/fotos/calupe/hero.jpg", gallery: ["/fotos/calupe/extra1.jpg"], size: "medium", enabled: true },
  { id: "nena-cafe", name: "Nena Cafe", category: "Social Media & Contenido", sections: ["gastronomico"], image: "/fotos/nena-cafe/hero.jpg", gallery: ["/fotos/nena-cafe/extra3.jpg", "/fotos/nena-cafe/extra4.jpg"], size: "medium", enabled: true },
  { id: "cf-power", name: "Compact Fit Power Series", category: "E-commerce & Contenido", sections: ["ecommerce", "social-media"], image: "/fotos/cf-power/hero.jpg", gallery: ["/fotos/cf-power/extra1.jpg"], size: "large", enabled: true },
  { id: "la-focacceria", name: "La Focacceria", category: "Social Media & Contenido", sections: ["gastronomico"], image: "/fotos/la-focacceria/hero.jpg", gallery: ["/fotos/la-focacceria/extra1.jpg"], size: "medium", enabled: true },
  { id: "plataci", name: "Plataci", category: "Social Media & Contenido", sections: ["gastronomico"], image: "/fotos/plataci/hero.jpg", gallery: ["/fotos/plataci/extra1.jpg"], size: "medium", enabled: true },
  { id: "cruz-dz", name: "Cruz DZ", category: "Fotografía", sections: ["retratos"], image: "/fotos/cruz-dz/hero.jpg", gallery: ["/fotos/cruz-dz/extra2.jpg"], size: "large", enabled: true },
  { id: "mele-roller", name: "Mele Roller", category: "E-commerce", sections: ["ecommerce", "social-media"], image: "/fotos/mele-roller/hero.jpg", gallery: [], size: "medium", enabled: true },
  { id: "magna", name: "Magna", category: "E-commerce", sections: ["ecommerce"], image: "/fotos/magna/hero.jpg", gallery: ["/fotos/magna/extra1.jpg"], size: "medium", enabled: true },
  { id: "cf-pilates", name: "Compact Fit Pilates Basics", category: "E-commerce & Contenido", sections: ["ecommerce"], image: "/fotos/cf-pilates/hero.jpg", gallery: ["/fotos/cf-pilates/extra1.jpg"], size: "large", enabled: true },
  { id: "jwan", name: "Jwan", category: "Fotografía", sections: ["retratos"], image: "/fotos/jwan/hero.jpg", gallery: ["/fotos/jwan/extra1.jpg"], size: "medium", enabled: true },
  { id: "15-de-mora", name: "15 de Mora", category: "Eventos & Social", sections: ["eventos-sociales"], image: "/fotos/15-de-mora/hero.jpg", gallery: ["/fotos/15-de-mora/extra2.jpg", "/fotos/15-de-mora/extra3.jpg"], size: "medium", enabled: true },
  { id: "paseo-bynnon", name: "Paseo Bynnon", category: "Eventos & Social", sections: ["eventos-sociales"], image: "/fotos/paseo-bynnon/hero.jpg", gallery: ["/fotos/paseo-bynnon/extra1.jpg"], size: "large", enabled: true },
];
