"use client";

import LightGallery from "lightgallery/react";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

import Image from "next/image";
import Link from "next/link";

interface IProps {
  images: string[];
}

export default function ImageGallery({ images }: IProps) {
  return (
    <LightGallery
      elementClassNames="flex items-center gap-2 justify-start"
      speed={500}
      plugins={[lgThumbnail, lgZoom]}
    >
      {images?.map((image, index) => (
        <Link
          className={`border p-2 border-gray-300 ${
            index === 0 && "border-green-700"
          }`}
          key={index}
          href={image}
        >
          <Image
            className="h-11 w-11 sm:h-16 sm:w-16 object-cover"
            src={image}
            height={500}
            width={500}
            alt={`image-${index}`}
          />
        </Link>
      ))}
    </LightGallery>
  );
}
