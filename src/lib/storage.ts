import { put, head } from "@vercel/blob";
import { type PortfolioConfig, DEFAULT_PROJECTS } from "./portfolio";

const CONFIG_PATH = "portfolio-config.json";

export async function getPortfolioConfig(): Promise<PortfolioConfig> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return { projects: DEFAULT_PROJECTS };
  }

  try {
    const blob = await head(CONFIG_PATH);
    const res = await fetch(blob.url, { cache: "no-store" });
    return (await res.json()) as PortfolioConfig;
  } catch {
    return { projects: DEFAULT_PROJECTS };
  }
}

export async function savePortfolioConfig(
  config: PortfolioConfig
): Promise<void> {
  await put(CONFIG_PATH, JSON.stringify(config), {
    access: "public",
    addRandomSuffix: false,
    contentType: "application/json",
  });
}
