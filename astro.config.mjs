import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://chansigit.github.io",
  trailingSlash: "always",
  // Formulas in code blocks are plain text; keep them unstyled so the site CSS applies.
  markdown: { syntaxHighlight: false },
});
