const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const apiBaseUrl =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3900";

export const siteConfig = {
  name: "NexTop",
  description: "NexTop",
  siteUrl,
  apiBaseUrl,
  author: {
    name: "Biprodas Roy",
    website: "https://biprodas.me",
  },
  links: {
    linkedIn: "https://www.linkedin.com/in/biprodas-roy",
    github: "https://github.com/biprodas/nextop",
  },
};

export type SiteConfig = typeof siteConfig;
