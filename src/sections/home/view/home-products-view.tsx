"use client";

import React, { useState } from "react";
import BestSellerProductTab from "../product-tabs/best-seller-tab";

const TABS = [
  {
    label: "Best Seller",
    value: <BestSellerProductTab />,
  },
  {
    label: "New Arrivals",
    value: <BestSellerProductTab />,
  },
  {
    label: "Top Rated",
    value: <BestSellerProductTab />,
  },
  {
    label: "Featured",
    value: <BestSellerProductTab />,
  },
];

const HomeProductsView = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [hoverTab, setHoverTab] = useState<number | null>(null);

  const handleTabClick = (index: number) => {
    setSelectedTab(index);
    setHoverTab(null);
  };

  const handleMouseEnter = (index: number) => {
    if (index !== selectedTab) {
      setHoverTab(index);
    }
  };

  const handleMouseLeave = () => {
    setHoverTab(null);
  };

  return (
    <div className="py-5 md:py-10 bg-gray-100">
      <h3 className="text-2xl font-semibold pb-2 text-center">
        Recommended For You
      </h3>
      <div className="flex justify-center gap-5 flex-wrap">
        {TABS.map((tab, index) => (
          <div
            key={index}
            className={`relative cursor-pointer font-semibold hover:text-blue-400 ${
              index === selectedTab ? "text-blue-400" : "text-gray-500"
            }`}
            onClick={() => handleTabClick(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {tab.label}
            <div
              className="horizontal-border-effect bg-blue-400"
              style={{
                transition: "width 0.3s",
                width:
                  index === selectedTab || index === hoverTab ? "100%" : "0",
                left: index === selectedTab || index === hoverTab ? "0" : "50%",
                transform:
                  index === selectedTab || index === hoverTab
                    ? "translateX(0)"
                    : "translateX(-50%)",
              }}
            />
          </div>
        ))}
      </div>
      <div className="mt-8 md:mt-11">{TABS[selectedTab].value}</div>
    </div>
  );
};

export default HomeProductsView;
