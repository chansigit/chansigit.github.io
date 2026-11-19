# chansigit.github.io

Personal website of Sijie Chen, built with [Astro](https://astro.build). Pushing to `main` builds and publishes it through GitHub Actions.

```bash
npm install
npm run dev      # local preview at http://localhost:4321
npm run build    # static output in dist/
```

## Where things live

| Content | File |
| --- | --- |
| About text | `src/content/about.md` |
| News items | `src/content/news/*.md` (needs a `date`) |
| Projects | `src/content/projects/*.md`. Each project page is a slide deck: every `## Heading` starts a new slide, so keep each section short enough for one slide |
| Blog posts | `src/content/posts/YYYY-MM-DD-title.md`, served at `/blog/YYYY/title/` |
| Publications | `src/data/papers.bib` (`selected = {true}` shows a paper on the home page) |
| Name, email, navigation | `src/lib/site.js` |
| Styles | `src/styles/global.css` |
| CV page | `public/cv/index.html`, copied as is from `site/index.html` of the private `cv` repo, with its fonts in `public/cv/fonts/` |

The previous al-folio (Jekyll) version of the site is kept on the `al-folio-backup` branch.
