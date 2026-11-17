import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();

/** Pathname without a trailing slash, except for the site root. */
export function sitemapPath(url: string): string {
  const path = new URL(url).pathname.replace(/\/$/, "");
  return path || "/";
}

function maxDate(...dates: Array<string | undefined>): string | undefined {
  let best: number | undefined;
  for (const date of dates) {
    if (!date) continue;
    const time = new Date(date).getTime();
    if (Number.isNaN(time)) continue;
    if (best === undefined || time > best) best = time;
  }
  return best === undefined ? undefined : new Date(best).toISOString();
}

/**
 * Commits at the edge of a shallow clone (hosts such as Vercel fetch only the
 * most recent commits). Git reports every older file as last changed in one of
 * these, so a date taken from them is newer than the real change.
 */
function shallowBoundary(): Set<string> {
  try {
    const gitDir = execFileSync("git", ["rev-parse", "--absolute-git-dir"], {
      cwd: ROOT,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    return new Set(
      readFileSync(join(gitDir, "shallow"), "utf8").split(/\s+/).filter(Boolean),
    );
  } catch {
    return new Set();
  }
}

const BOUNDARY = shallowBoundary();

/** Commit time of the newest commit touching `paths`, or undefined when unknown. */
function changed(paths: string[]): string | undefined {
  try {
    const out = execFileSync(
      "git",
      ["log", "-1", "--format=%H %cI", "--", ...paths],
      { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] },
    ).trim();
    const [hash, date] = out.split(" ");
    if (!hash || !date || BOUNDARY.has(hash)) return undefined;
    return date;
  } catch {
    return undefined;
  }
}

function postLastmod(file: string): string | undefined {
  const raw = readFileSync(file, "utf8");
  const frontmatter = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1];
  if (!frontmatter || /^draft:\s*true\s*$/m.test(frontmatter)) return undefined;

  const updated = frontmatter.match(
    /^updatedDate:\s*["']?(\d{4}-\d{2}-\d{2})/m,
  )?.[1];
  const published = frontmatter.match(
    /^pubDate:\s*["']?(\d{4}-\d{2}-\d{2})/m,
  )?.[1];
  const day = updated ?? published;
  return day ? new Date(`${day}T00:00:00.000Z`).toISOString() : undefined;
}

/**
 * Last modification time for each public pathname.
 * Posts use frontmatter dates. Other pages use the newest commit that
 * touched that page, shared chrome, or the content it renders. A page gets no
 * lastmod when git history cannot date it: none is better than a wrong one.
 */
export function buildLastmodMap(): Map<string, string> {
  const map = new Map<string, string>();
  const postDates: string[] = [];
  const blogDir = join(ROOT, "src/content/blog");

  for (const slug of readdirSync(blogDir)) {
    const file = join(blogDir, slug, "index.mdx");
    if (!statSync(file, { throwIfNoEntry: false })?.isFile()) continue;
    const lastmod = postLastmod(file);
    if (!lastmod) continue;
    map.set(`/blog/${slug}`, lastmod);
    postDates.push(lastmod);
  }

  const chrome = changed([
    "src/components/Header.astro",
    "src/components/Footer.astro",
    "src/components/BaseHead.astro",
    "src/layouts/BaseLayout.astro",
    "src/styles/global.css",
  ]);

  /** Sets a page's lastmod only when its own sources and the chrome are both dated. */
  const setPage = (path: string, sources: string[], extra: string[] = []) => {
    const own = changed(sources);
    if (!own || !chrome) return;
    const lastmod = maxDate(own, chrome, ...extra);
    if (lastmod) map.set(path, lastmod);
  };

  setPage("/blog", ["src/pages/blog"], postDates);

  setPage(
    "/",
    [
      "src/pages/index.astro",
      "src/components/Hero.astro",
      "src/components/About.astro",
      "src/components/Experience.astro",
      "src/components/ProjectCard.astro",
      "src/components/Skills.astro",
      "src/components/PostCard.astro",
      "src/components/Contact.astro",
      "src/components/jsonld",
      "src/data/projects.ts",
      "src/data/site.ts",
      "src/data/experience.ts",
      "src/data/skills.ts",
    ],
    postDates,
  );

  setPage("/games", [
    "src/pages/games",
    "src/data/games.ts",
    "src/components/GameCard.astro",
    "src/components/BaaalanceCover.astro",
  ]);

  setPage("/hgraph", ["src/pages/hgraph.astro"]);

  return map;
}
