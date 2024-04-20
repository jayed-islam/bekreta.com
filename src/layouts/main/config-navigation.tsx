import { paths } from "../paths";

interface MenuItem {
  text: string;
  icon: string;
  subItems?: { text: string; icon: string; route: string }[];
  route: string;
}

export const mainMenuItems: MenuItem[] = [
  { text: "Home", icon: "tabler:api-app", route: paths.root },
  { text: "About us", icon: "tabler:api-app", route: paths.root },

  { text: "Products", icon: "tabler:api-app", route: paths.root },
  { text: "Blogs", icon: "tabler:api-app", route: paths.root },
];

export const linksData = [
  {
    title: "Services",
    links: [
      { title: "1on1 Coaching", url: "#" },
      { title: "Company Review", url: "#" },
      { title: "Accounts Review", url: "#" },
      { title: "HR Consulting", url: "#" },
      { title: "SEO Optimisation", url: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { title: "About", url: "#" },
      { title: "Meet the Team", url: "#" },
      { title: "Accounts Review", url: "#" },
    ],
  },
  {
    title: "Helpful Links",
    links: [
      { title: "Contact", url: "#" },
      { title: "FAQs", url: "#" },
      { title: "Live Chat", url: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { title: "Accessibility", url: "#" },
      { title: "Returns Policy", url: "#" },
      { title: "Refund Policy", url: "#" },
      { title: "Hiring Statistics", url: "#" },
    ],
  },
];
