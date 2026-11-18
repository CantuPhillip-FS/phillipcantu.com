import { readdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import type { AstroIntegration } from "astro";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import { buildLastmodMap, sitemapPath } from "./src/lib/sitemap-lastmod";

const lastmods = buildLastmodMap();

// Browsers show a bare sitemap as an XML tree, and XSLT, the usual way to
// style one, is being removed from them. @astrojs/sitemap can only reference
// an XSL stylesheet, so add a CSS one to the generated files instead. The
// path is root-relative so it is same-origin on any host (www, previews).
// Must be listed after sitemap() so the files exist when this runs.
function sitemapStylesheet(): AstroIntegration {
  const xmlDeclaration = /^<\?xml\b[^>]*\?>/;
  const reference = '<?xml-stylesheet type="text/css" href="/sitemap.css"?>';
  return {
    name: "sitemap-stylesheet",
    hooks: {
      "astro:build:done": async ({ dir, logger }) => {
        const outDir = fileURLToPath(dir);
        const sitemaps = (await readdir(outDir)).filter((file) =>
          /^sitemap-.*\.xml$/.test(file),
        );
        let styled = 0;
        for (const file of sitemaps) {
          const path = `${outDir}/${file}`;
          const xml = await readFile(path, "utf8");
          if (!xmlDeclaration.test(xml) || xml.includes(reference)) continue;
          await writeFile(path, xml.replace(xmlDeclaration, `$&${reference}`));
          styled++;
        }
        if (styled === 0) {
          logger.warn("No sitemap was given a stylesheet reference.");
        } else {
          logger.info(`Added the stylesheet reference to ${styled} sitemap(s).`);
        }
      },
    },
  };
}

export default defineConfig({
  site: "https://phillipcantu.com",
  trailingSlash: "ignore",
  integrations: [
    mdx(),
    sitemap({
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
    sitemapStylesheet(),
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
