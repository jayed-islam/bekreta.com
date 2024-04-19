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
