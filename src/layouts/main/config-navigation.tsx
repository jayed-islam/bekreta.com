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

  { text: "Quran", icon: "tabler:api-app", route: paths.root },
  { text: "Blogs", icon: "tabler:api-app", route: paths.root },
  // {
  //   text: "Qlite",
  //   icon: "arcticons:quran-alt",
  //   subItems: [
  //     {
  //       text: "Create Post",
  //       icon: "gridicons:create",
  //       route: paths.dashboard.qlite.create,
  //     },
  //     {
  //       text: "Post List",
  //       icon: "ion:list",
  //       route: paths.dashboard.qlite.list,
  //     },
  //   ],
  //   route: paths.dashboard.qlite.root,
  // },
  // { text: "Login", icon: "tabler:api-app", route: paths.root },
];
