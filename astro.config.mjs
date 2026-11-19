import { defineConfig } from "astro/config";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export default defineConfig({
  site: "https://chansigit.github.io",
  trailingSlash: "always",
  // Formulas in code blocks are plain text; keep them unstyled so the site CSS applies.
  markdown: {
    syntaxHighlight: false,
    // $...$ and $$...$$ in markdown are typeset with KaTeX at build time.
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
});
