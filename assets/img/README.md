# Image assets

Drop the following files into this directory:

| Filename            | Used by                          | Suggested size |
|---------------------|----------------------------------|----------------|
| `prof_pic.jpg`      | Homepage portrait                | 600×600 square |
| `transmap.png`      | TransMap project card / preview  | 1200×800       |
| `dynode.png`        | Dynode project card / preview    | 1200×800       |
| `scmulan.png`       | scMulan project card / preview   | 1200×800       |
| `heca.png`          | hECA project card / preview      | 1200×800       |

For paper previews (`preview:` field in `_bibliography/papers.bib`),
al-folio looks under `assets/img/publication_preview/`.

```bash
mkdir -p assets/img/publication_preview/
# Then drop figure thumbnails matching the preview names in papers.bib.
```
