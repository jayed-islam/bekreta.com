import { paths } from "../paths";
import { GoHome } from "react-icons/go";
import { RiProductHuntLine } from "react-icons/ri";
import { IoList } from "react-icons/io5";
import { IoCreateOutline } from "react-icons/io5";

export const adminMenuItems = [
  { text: "Home", icon: <GoHome />, route: paths.admin.root },
  {
    text: "Products",
    icon: <RiProductHuntLine />,
    children: [
      { text: "List", icon: <IoList />, route: paths.admin.product.root },
      {
        text: "Create",
        icon: <IoCreateOutline />,
        route: paths.admin.product.new,
      },
    ],
  },
];
