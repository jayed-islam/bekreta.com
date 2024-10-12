// import Image from "next/image";
// import Link from "next/link";
// import React from "react";
// import { Icon } from "@iconify-icon/react/dist/iconify.js";
// import { linksData } from "./config-navigation";
// import logo from "../../../public/assets/logo.jpg";

// export const Footer = () => {
//   const socialIcons = [
//     "ic:round-facebook",
//     "bi:instagram",
//     "line-md:twitter-x-alt",
//     "simple-line-icons:social-linkedin",
//     "uil:github",
//   ];

//   const renderedLinks = linksData.map((section, index) => (
//     <div key={index}>
//       <p className="font-medium text-gray-900">{section.title}</p>
//       <ul className="mt-6 space-y-4 text-sm">
//         {section.links.map((link, idx) => (
//           <li key={idx}>
//             <Link
//               href={link.url}
//               className="text-gray-700 transition hover:opacity-75"
//             >
//               {link.title}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   ));

//   return (
//     <footer className="bg-gray-900 border-t">
//       <div className="mx-auto max-w-6xl space-y-8 px-5 py-16 lg:px-0 lg:space-y-16">
//         <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
//           <div>
//             <div className="flex items-center">
//               <Link
//                 className="inline-block text-slate-600 flex-shrink-0"
//                 href="/"
//               >
//                 <div className="flex items-end gap-2">
//                   <Image
//                     alt="Logo"
//                     className="block h-10 md:h-12 w-auto"
//                     src={logo}
//                   />
//                 </div>
//                 {/* <p className="hidden md:block text-xs text-gray-400">
//                   Online superium shoping center
//                 </p> */}
//               </Link>
//             </div>

//             <p className="mt-4 max-w-xs text-gray-500">
//               Discover quality products for every need at competitive prices.
//             </p>

//             <ul className="mt-8 flex gap-6">
//               {socialIcons.map((icon, index) => (
//                 <li>
//                   <Link
//                     href="#"
//                     rel="noreferrer"
//                     target="_blank"
//                     className="text-gray-700 transition hover:opacity-75"
//                   >
//                     <span className="sr-only">Facebook</span>
//                     <Icon icon={icon} className="text-xl" />
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
//             {renderedLinks}
//           </div>
//         </div>

//         <p className="text-xs text-gray-500">
//           &copy; {new Date().getFullYear()}. Company Name. All rights reserved.
//         </p>
//       </div>
//     </footer>
//   );
// };
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Icon } from "@iconify-icon/react";
import { linksData } from "./config-navigation";
import logo from "../../../public/assets/logo.jpg";

export const Footer = () => {
  const socialIcons = [
    {
      icon: "ic:round-facebook",
      label: "Facebook",
      link: "https://facebook.com",
    },
    { icon: "bi:instagram", label: "Instagram", link: "https://instagram.com" },
    {
      icon: "line-md:twitter-x-alt",
      label: "Twitter",
      link: "https://twitter.com",
    },
    {
      icon: "simple-line-icons:social-linkedin",
      label: "LinkedIn",
      link: "https://linkedin.com",
    },
    { icon: "uil:github", label: "GitHub", link: "https://github.com" },
  ];

  const renderedLinks = linksData.map((section, index) => (
    <div key={index}>
      <p className="font-medium text-gray-100">{section.title}</p>
      <ul className="mt-4 space-y-2">
        {section.links.map((link, idx) => (
          <li key={idx}>
            <Link
              href={link.url}
              className="text-gray-400 transition-colors duration-200 hover:text-white"
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  ));

  return (
    <footer className="bg-gray-900 border-t border-gray-700">
      <div className="mx-auto max-w-6xl px-5 py-10  xl:px-0">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Company Information */}
          <div>
            <Link href="/" className="flex items-center space-x-2">
              <Image alt="Company Logo" src={logo} className="h-10 w-auto" />
            </Link>
            <p className="mt-4 max-w-xs text-gray-400">
              Discover quality products at competitive prices, designed to meet
              your every need.
            </p>
            <ul className="mt-6 flex space-x-6">
              {socialIcons.map((icon, index) => (
                <li key={index}>
                  <Link
                    href={icon.link}
                    rel="noreferrer"
                    target="_blank"
                    aria-label={icon.label}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Icon icon={icon.icon} className="text-2xl" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-10 lg:col-span-2 lg:grid-cols-4">
            {renderedLinks}
          </div>
        </div>

        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Company Name. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
