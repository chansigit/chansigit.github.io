import { readdirSync } from "node:fs";
import { defineConfig } from "astro/config";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

// The singular /project (and /project/<name>) goes to the same pages as /projects.
const projectSlugs = readdirSync(new URL("./src/content/projects", import.meta.url))
  .filter((f) => f.endsWith(".md"))
  .map((f) => f.replace(/\.md$/, ""));
const redirects = { "/project": "/projects/" };
for (const slug of projectSlugs) redirects[`/project/${slug}`] = `/projects/${slug}/`;

export default defineConfig({
  site: "https://chansigit.github.io",
  trailingSlash: "always",
  redirects,
  // Formulas in code blocks are plain text; keep them unstyled so the site CSS applies.
  markdown: {
    syntaxHighlight: false,
    // $...$ and $$...$$ in markdown are typeset with KaTeX at build time.
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
});
