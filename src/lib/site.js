export const site = {
  name: "Sijie Chen",
  description:
    "Postdoctoral scholar at Stanford. Machine learning for biological discovery: representation learning, generative models, optimal transport, cross-domain alignment.",
  email: "chensj16@stanford.edu",
  location: "Stanford, CA",
  nav: [
    { title: "about", href: "/" },
    { title: "publications", href: "/publications/" },
    { title: "projects", href: "/projects/" },
    { title: "blog", href: "/blog/" },
    { title: "cv", href: "/cv/" },
  ],
};

export function formatDate(value) {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
