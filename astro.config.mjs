import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

/**
 * site и base приходят из окружения, чтобы один и тот же код работал
 * и локально, и на GitHub Pages (подпапка /repo/), и на GitLab Pages,
 * и на своём домене.
 *
 *   SITE_URL=https://blackojack.github.io
 *   BASE_PATH=/devops-landing/
 */
const site = process.env.SITE_URL || "https://example.com";
const base = process.env.BASE_PATH || "/";

export default defineConfig({
  site,
  base,
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
