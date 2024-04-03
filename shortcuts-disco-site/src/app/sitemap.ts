import { MetadataRoute } from "next";
import { getAllShortcuts } from "@/lib/shortcuts";

const ChangeFrequency = {
  ALWAYS: "always",
  HOURLY: "hourly",
  DAILY: "daily",
  WEEKLY: "weekly",
  MONTHLY: "monthly",
  YEARLY: "yearly",
  NEVER: "never",
} as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitePages = [
    {
      url: "https://shortcuts.solomk.in",
      lastModified: new Date(),
      changeFrequency: ChangeFrequency.WEEKLY,
      priority: 1,
    },
    {
      url: "https://shortcuts.solomk.in/raycast-extension",
      lastModified: new Date(),
      changeFrequency: ChangeFrequency.WEEKLY,
      priority: 0.8,
    },
    {
      url: "https://solomk.in/about",
      lastModified: new Date(),
      changeFrequency: ChangeFrequency.WEEKLY,
      priority: 0.5,
    },
  ];

  const shortcuts = await getAllShortcuts();
  shortcuts.applications.forEach(app => {
    sitePages.push({
      url: `https://solomk.in/apps/${app.slug}`,
      lastModified: new Date(),
      changeFrequency: ChangeFrequency.WEEKLY,
      priority: 0.9,
    });
  });

  console.log("Generated sitemap: ", sitePages);
  return sitePages;
}