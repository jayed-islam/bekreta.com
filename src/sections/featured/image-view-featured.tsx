import ImageGallery from "@/components/image-gallery/image-gallery";
import { Icon } from "@mui/material";
import Image from "next/image";
import React, { RefObject, useRef, useState } from "react";

interface Props {
  images: string[];
  name: string;
  isDetailsViewDialog: boolean;
}

const ImageViewFeatured = ({ images, name, isDetailsViewDialog }: Props) => {
  const productImageRef: RefObject<HTMLImageElement> = useRef(null);
  const [currentImage, setCurrentImage] = useState(images[0]);

  return (
    <div className="w-full md:w-[41%] lg:w-[71%] lg:px-5 xl:px-0 ">
      <div className="relative">
        <div className="h-[300px] md:h-[351px] xl:h-[371px] relative border border-gray-300 sm:p-2 overflow-hidden cursor-pointer flex items-center justify-center">
          <img
            src={currentImage}
            alt="Product Image"
            className="transform transition-transform duration-300"
            ref={productImageRef}
          />
        </div>
        <div
          className={`flex items-center gap-2 justify-start mt-5 shadow-md border p-2  sm:w-[300px] mx-3 ${
            isDetailsViewDialog ? "" : "xl:-ml-11"
          }`}
        >
          {/* {images?.map((image, index) => (
            <div
              key={index}
              className={`border p-2 border-gray-300 ${
                currentImage === image && "border-green-500"
              }`}
            >
              <Image
                src={image}
                alt={name}
                className={`h-11 w-11 object-cover hover:border-green-500 hover:cursor-pointer`}
                onClick={() => setCurrentImage(images[index])}
                height={500}
                width={500}
              />
            </div>
          ))} */}
          <ImageGallery images={images} />
        </div>
      </div>
    </div>
  );
};

export default ImageViewFeatured;
