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
          &copy; {new Date().getFullYear()} Bekreta. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
