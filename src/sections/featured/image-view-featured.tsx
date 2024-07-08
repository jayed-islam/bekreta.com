import { Icon } from "@mui/material";
import Image from "next/image";
import React, { RefObject, useRef, useState } from "react";

interface Props {
  images: string[];
  name: string;
}

const ImageViewFeatured = ({ images, name }: Props) => {
  const productImageRef: RefObject<HTMLImageElement> = useRef(null);
  const [currentImage, setCurrentImage] = useState(images[0]);

  //   const handleImageClick = async (index: number) => {
  //     for (let i = 0; i < images.length; i++) {
  //       if (i !== index) {
  //         await new Promise((resolve) => {
  //           const img = new Image();
  //           img.src = images[i];
  //           img.onload = resolve;
  //         });
  //       }
  //     }
  //   };

  const handleImageZoom = (e: React.MouseEvent<HTMLImageElement>) => {
    const image = productImageRef.current;
    if (image) {
      const { left, top, width, height } = image.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      const xPercent = (x / width) * 100;
      const yPercent = (y / height) * 100;
      image.style.transformOrigin = `${xPercent}% ${yPercent}%`;
      image.style.transform = "scale(1.5)";
    }
  };

  const handleImageZoomReset = () => {
    const image = productImageRef.current;
    if (image) {
      image.style.transform = "scale(1)";
    }
  };

  return (
    <div className="w-full md:w-[41%] lg:w-[71%] lg:px-5 xl:px-0">
      <div className="relative">
        <div
          className="h-[300px] md:h-[300px] xl:h-[371px] relative sm:border border-gray-300 sm:p-2 overflow-hidden cursor-pointer rounded-xl"
          onMouseMove={handleImageZoom}
          onMouseLeave={handleImageZoomReset}
        >
          <img
            src={currentImage}
            alt="Product Image"
            className="w-full h-full object-cover transform transition-transform duration-300"
            ref={productImageRef}
          />
        </div>
        <div className="flex items-center gap-2 justify-start mt-5 shadow-md border p-2 xl:-ml-11 sm:w-[300px] mx-3">
          {images?.map((image, index) => (
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageViewFeatured;
