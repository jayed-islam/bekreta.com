import { IProduct } from "@/types/products";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import React, { RefObject, useRef, useState } from "react";

type TProps = {
  product: IProduct;
};

const LeftSideImageView = ({ product }: TProps) => {
  const productImageRef: RefObject<HTMLImageElement> = useRef(null);
  const [currentImage, setCurrentImage] = useState(product?.images[0]);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isLove, setIsLove] = useState(false);

  const handleImageClick = async (index: number) => {
    for (let i = 0; i < product.images.length; i++) {
      if (i !== index) {
        await new Promise((resolve) => {
          const img = new Image();
          img.src = product.images[i];
          img.onload = resolve;
        });
      }
    }

    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

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
    <div className="w-full md:w-[41%] lg:w-[51%] lg:px-5 xl:px-0">
      <div className="relative">
        <div
          className="h-[300px] md:h-[350px] xl:h-[450px] relative sm:border border-gray-300 sm:p-2 overflow-hidden cursor-pointer"
          onMouseMove={handleImageZoom}
          onMouseLeave={handleImageZoomReset}
          onClick={() => handleImageClick(0)}
        >
          <img
            src={currentImage}
            alt="Product Image"
            className="w-full h-full object-contain transform transition-transform duration-300"
            ref={productImageRef}
          />
        </div>
        <div className="flex items-center gap-2 justify-start mt-5 shadow-md border p-2 xl:-ml-11 sm:w-[300px] mx-3">
          {product?.images?.map((img, i) => (
            <div
              className={`border p-2 border-gray-300 ${
                currentImage === img && "border-green-500"
              }`}
            >
              <img
                src={img}
                alt=""
                className={`h-11 w-11 sm:h-16 sm:w-16 object-cover`}
                onClick={() => setCurrentImage(product.images[i])}
              />
            </div>
          ))}
        </div>
        <div className="absolute top-3.5 left-3.5 px-2.5 py-1.5 text-xs bg-red-500 nc-shadow-lg flex items-center justify-center text-white  ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
            className="w-3.5 h-3.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
            ></path>
          </svg>
          <span className="ml-1 leading-none">New in</span>
        </div>
      </div>
    </div>
  );
};

export default LeftSideImageView;
