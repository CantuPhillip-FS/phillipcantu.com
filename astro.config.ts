import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import { buildLastmodMap, sitemapPath } from "./src/lib/sitemap-lastmod";

const lastmods = buildLastmodMap();

export default defineConfig({
  site: "https://phillipcantu.com",
  trailingSlash: "ignore",
  integrations: [
    mdx(),
    sitemap({
      xslURL: "/sitemap.xsl",
      namespaces: {
        news: false,
        xhtml: false,
        image: false,
        video: false,
      },
      serialize(item) {
        const lastmod = lastmods.get(sitemapPath(item.url));
        if (lastmod) item.lastmod = lastmod;
        return item;
      },
      // Posts get their own file. Everything else lands in the pages sitemap.
      chunks: {
        posts: (item) =>
          sitemapPath(item.url).startsWith("/blog") ? item : undefined,
      },
    }),
  ],
  adapter: vercel(),
  image: {
    // Responsive images everywhere: MDX/markdown images get srcset + sizes
    layout: "constrained",
  },
  markdown: {
    shikiConfig: {
      // The regular github-light theme's orange tokens fail WCAG AA contrast
      theme: "github-light-high-contrast",
    },
  },
});
