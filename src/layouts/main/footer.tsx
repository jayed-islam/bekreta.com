import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "../../../public/assets/shop_logo.png";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { linksData } from "./config-navigation";

export const Footer = () => {
  const socialIcons = [
    "ic:round-facebook",
    "bi:instagram",
    "line-md:twitter-x-alt",
    "simple-line-icons:social-linkedin",
    "uil:github",
  ];

  const renderedLinks = linksData.map((section, index) => (
    <div key={index}>
      <p className="font-medium text-gray-900">{section.title}</p>
      <ul className="mt-6 space-y-4 text-sm">
        {section.links.map((link, idx) => (
          <li key={idx}>
            <Link
              href={link.url}
              className="text-gray-700 transition hover:opacity-75"
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  ));

  return (
    <footer className="bg-white border-t">
      <div className="mx-auto max-w-6xl space-y-8 px-5 py-16 lg:px-0 lg:space-y-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="flex items-center">
              <Link
                className="inline-block text-slate-600 flex-shrink-0"
                href="/"
              >
                <div className="flex items-end gap-2">
                  <Image
                    alt="Logo"
                    className="block h-10 md:h-12 w-auto"
                    src={logo}
                  />
                  <h3 className="text-3xl md:text-4xl font-bold text-teal-500">
                    Bazaro
                  </h3>
                </div>
                <p className="hidden md:block text-xs text-gray-400">
                  Online superium shoping center
                </p>
              </Link>
            </div>

            <p className="mt-4 max-w-xs text-gray-500">
              Discover quality products for every need at competitive prices.
            </p>

            <ul className="mt-8 flex gap-6">
              {socialIcons.map((icon, index) => (
                <li>
                  <Link
                    href="#"
                    rel="noreferrer"
                    target="_blank"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    <span className="sr-only">Facebook</span>
                    <Icon icon={icon} className="text-xl" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
            {renderedLinks}
          </div>
        </div>

        <p className="text-xs text-gray-500">
          &copy; {new Date().getFullYear()}. Company Name. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
