// Minimal BibTeX reader for src/data/papers.bib (no dependencies).
// Supports @string macros, {braced} and "quoted" values, and % comment lines.
import raw from "../data/papers.bib?raw";

function matchBrace(s, open) {
  let depth = 0;
  for (let k = open; k < s.length; k++) {
    if (s[k] === "{") depth++;
    else if (s[k] === "}" && --depth === 0) return k;
  }
  throw new Error("papers.bib: unbalanced braces");
}

function parseFields(s, strings) {
  const out = {};
  const name = /[\s,]*([A-Za-z_][\w-]*)\s*=\s*/y;
  let i = 0;
  while (true) {
    name.lastIndex = i;
    const m = name.exec(s);
    if (!m) break;
    i = name.lastIndex;
    let value;
    if (s[i] === "{") {
      const end = matchBrace(s, i);
      value = s.slice(i + 1, end);
      i = end + 1;
    } else if (s[i] === '"') {
      const end = s.indexOf('"', i + 1);
      value = s.slice(i + 1, end);
      i = end + 1;
    } else {
      const bare = /[^\s,]+/y;
      bare.lastIndex = i;
      const token = bare.exec(s)[0];
      value = strings[token.toLowerCase()] ?? token;
      i = bare.lastIndex;
    }
    out[m[1].toLowerCase()] = value;
  }
  return out;
}

const clean = (v) =>
  v.replace(/\\&/g, "&").replace(/[{}]/g, "").replace(/--/g, "–").replace(/\s+/g, " ").trim();

function parseAuthors(value) {
  return value.split(/\s+and\s+/).map((a) => {
    a = a.trim();
    if (a === "others") return { name: "et al.", me: false };
    if (a.startsWith("{")) return { name: clean(a), me: false };
    // "Chen, Sijie*" -> "Sijie Chen*" (the star marks equal contribution)
    const star = a.endsWith("*") ? "*" : "";
    const [last, first] = a.replace(/\*$/, "").split(",").map((x) => x.trim());
    const name = clean(first ? `${first} ${last}` : last) + star;
    return { name, me: /\bSijie\b/.test(name) && /\bChen\b/.test(name) };
  });
}

function parse(src) {
  src = src
    .split("\n")
    .filter((l) => !l.trim().startsWith("%"))
    .join("\n");
  const strings = {};
  const entries = [];
  const head = /@(\w+)\s*\{/g;
  let m;
  while ((m = head.exec(src))) {
    const open = head.lastIndex - 1;
    const end = matchBrace(src, open);
    const body = src.slice(open + 1, end);
    head.lastIndex = end + 1;
    const type = m[1].toLowerCase();
    if (type === "string") {
      Object.assign(strings, parseFields(body, strings));
      continue;
    }
    const comma = body.indexOf(",");
    const f = parseFields(body.slice(comma + 1), strings);
    const venueParts = [clean(f.journal ?? f.booktitle ?? "")];
    let vol = f.volume ? clean(f.volume) : "";
    if (vol && f.number) vol += `(${clean(f.number)})`;
    if (vol && f.pages) vol += `:${clean(f.pages)}`;
    else if (!vol && f.pages) vol = clean(f.pages);
    if (vol) venueParts.push(vol);
    entries.push({
      key: body.slice(0, comma).trim(),
      title: clean(f.title ?? ""),
      authors: parseAuthors(f.author ?? ""),
      venue: venueParts.filter(Boolean).join(" "),
      year: Number(clean(f.year ?? "0")),
      url: f.html ?? f.url ?? null,
      note: f.note ? clean(f.note) : null,
      abstract: f.abstract ? clean(f.abstract) : null,
      selected: f.selected === "true",
    });
  }
  return entries;
}

// Newest first; within a year, keep the order of the .bib file.
export const publications = parse(raw)
  .map((p, i) => ({ ...p, i }))
  .sort((a, b) => b.year - a.year || a.i - b.i);
