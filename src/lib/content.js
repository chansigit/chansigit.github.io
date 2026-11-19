// Markdown content, loaded at build time.
const slugOf = (path) => path.split("/").pop().replace(/\.md$/, "");

export const projects = Object.entries(import.meta.glob("../content/projects/*.md", { eager: true }))
  .map(([path, mod]) => ({
    slug: slugOf(path),
    ...mod.frontmatter,
    Content: mod.Content,
    html: mod.compiledContent,
  }))
  .sort((a, b) => a.importance - b.importance);

// Post files are named YYYY-MM-DD-title.md and live at /blog/YYYY/title/.
export const posts = Object.entries(import.meta.glob("../content/posts/*.md", { eager: true }))
  .map(([path, mod]) => {
    const [, date, name] = slugOf(path).match(/^(\d{4}-\d{2}-\d{2})-(.+)$/);
    return { slug: `${date.slice(0, 4)}/${name}`, date, ...mod.frontmatter, date, Content: mod.Content };
  })
  .sort((a, b) => b.date.localeCompare(a.date));
