export interface PortfolioProject {
  id: string;
  name: string;
  category: string;
  image: string;
  size: "large" | "medium";
  enabled: boolean;
}

export interface PortfolioConfig {
  projects: PortfolioProject[];
}

export const DEFAULT_PROJECTS: PortfolioProject[] = [
  { id: "aria", name: "Aria", category: "Social Media & Contenido", image: "/fotos/aria/hero.jpg", size: "large", enabled: true },
  { id: "calupe", name: "Calupe Store", category: "E-commerce", image: "/fotos/calupe/hero.jpg", size: "medium", enabled: true },
  { id: "nena-cafe", name: "Nena Cafe", category: "Social Media & Contenido", image: "/fotos/nena-cafe/hero.jpg", size: "medium", enabled: true },
  { id: "cf-power", name: "Compact Fit Power Series", category: "E-commerce & Contenido", image: "/fotos/cf-power/hero.jpg", size: "large", enabled: true },
  { id: "la-focacceria", name: "La Focacceria", category: "Social Media & Contenido", image: "/fotos/la-focacceria/hero.jpg", size: "medium", enabled: true },
  { id: "plataci", name: "Plataci", category: "Social Media & Contenido", image: "/fotos/plataci/hero.jpg", size: "medium", enabled: true },
  { id: "cruz-dz", name: "Cruz DZ", category: "Fotografía", image: "/fotos/cruz-dz/hero.jpg", size: "large", enabled: true },
  { id: "mele-roller", name: "Mele Roller", category: "E-commerce", image: "/fotos/mele-roller/hero.jpg", size: "medium", enabled: true },
  { id: "magna", name: "Magna", category: "E-commerce", image: "/fotos/magna/hero.jpg", size: "medium", enabled: true },
  { id: "cf-pilates", name: "Compact Fit Pilates Basics", category: "E-commerce & Contenido", image: "/fotos/cf-pilates/hero.jpg", size: "large", enabled: true },
  { id: "jwan", name: "Jwan", category: "Fotografía", image: "/fotos/jwan/hero.jpg", size: "medium", enabled: true },
  { id: "15-de-mora", name: "15 de Mora", category: "Eventos & Social", image: "/fotos/15-de-mora/hero.jpg", size: "medium", enabled: true },
  { id: "paseo-bynnon", name: "Paseo Bynnon", category: "Eventos & Social", image: "/fotos/paseo-bynnon/hero.jpg", size: "large", enabled: true },
];
