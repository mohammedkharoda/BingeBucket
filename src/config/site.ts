export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "BingeBucket",
  description: "Make better your movie experience.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Movies",
      href: "/movies",
    },
    {
      label: "Series",
      href: "/series",
    },
    {
      label: "Surprise Me",
      href: "/surprise-me",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Contact",
      href: "/contact-us",
    },
  ],
};
