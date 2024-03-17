"use client";

import { Icon } from "@iconify-icon/react/dist/iconify.js";
import React, { useEffect, useState } from "react";

const HomeBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const bannerImages = [
    "https://img.freepik.com/premium-photo/shopping-cart-moves-speed-light-backdrop-with-balloons-gift-boxes-all-live-futuristic-atmosphere-3d-render_172660-11.jpg?size=626&ext=jpg",
    "https://img.freepik.com/free-photo/arrangement-black-friday-shopping-carts-with-copy-space_23-2148667047.jpg?size=626&ext=jpg",
    "https://img.freepik.com/free-vector/online-shopping-landing-page_33099-1725.jpg?size=626&ext=jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 3500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === bannerImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? bannerImages.length - 1 : prevIndex - 1
    );
  };

  // "https://img.freepik.com/free-vector/online-shopping-banner-mobile-app-templates-concept-flat-design_1150-34862.jpg?size=626&ext=jpg"

  // "https://img.freepik.com/free-photo/composition-black-friday-shopping-cart-with-copy-space_23-2148667046.jpg?size=626&ext=jpg"
  return (
    <div className="bg-gray-100 w-full">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row lg:gap-5 items-start  pt-2">
        <div className="lg:w-[351px] w-full px-3 xl:px-0 mt-3 lg:mt-0 flex flex-col-reverse lg:flex-col">
          <img
            src="https://img.freepik.com/premium-vector/shopping-concept-online-shopping-online-website-mobile-application-vector-concept-marketing_196604-68.jpg?size=626&ext=jpg"
            className="w-full h-44 lg:h-56 mt-3 lg:mt-0"
            alt=""
          />

          <div className="bg-yellow-100 px-5 py-5 lg:mt-5">
            <div className="flex flex-col items-center justify-center">
              <h3 className="font-semibold text-lg">Pre Order</h3>
              <p className="text-sm text-gray-400">Say your Favirote Product</p>
            </div>
            <textarea
              type="text"
              className="w-full px-3 py-1.5 h-28 outline-none"
              placeholder="Product details..."
            />
            <div className="mt-1 flex itmes-center gap-2">
              <input
                type="email"
                className="w-full px-3 py-2 outline-none text-sm"
                placeholder="Login Email..."
              />
              <button
                type="submit"
                className=" bg-white hover:bg-orange-600 transition-all duration-150 ease-in text-xl"
              >
                <Icon
                  icon="bi:send"
                  className="text-orange-600 w-9 flex items-end justify-center hover:text-white text-lg"
                />
              </button>
            </div>
          </div>
        </div>
        <div className="relative w-full lg:flex-1 px-3 xl:px-0">
          <div className="flex items-center justify-center w-full h-52 md:h-96 lg:h-[501px] ">
            <img
              src={bannerImages[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              className="w-full h-full object-cover "
            />
            <div className="absolute inset-0 left-5 right-5 flex items-center justify-between">
              <button
                onClick={goToPrevSlide}
                className="text-white h-11 flex items-center justify-center w-11 bg-black bg-opacity-50 rounded-full hover:text-orange-600 transition-all duration-150"
              >
                <Icon icon="iconamoon:arrow-left-2-thin" className="text-3xl" />
              </button>
              <button
                onClick={goToNextSlide}
                className="text-white h-11 flex items-center justify-center w-11 bg-black bg-opacity-50 rounded-full hover:text-orange-600 transition-all duration-150"
              >
                <Icon
                  icon="iconamoon:arrow-right-2-thin"
                  className="text-3xl"
                />
              </button>
            </div>

            <div className="flex justify-center mt-3 absolute bottom-5">
              {bannerImages.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 mx-1 rounded-full ${
                    index === currentIndex ? "bg-orange-600" : "bg-black"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
