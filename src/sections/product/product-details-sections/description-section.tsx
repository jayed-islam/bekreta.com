import { Icon } from "@iconify-icon/react/dist/iconify.js";
import React from "react";

interface DescriptionTabProps {
  activeTab: string;
  descriptions: string[];
}

const DescriptionSection: React.FC<DescriptionTabProps> = ({
  activeTab,
  descriptions,
}) => {
  return (
    <div id="description" className={`bg-white px-5 pt-5 pb-7 shadow-sm mt-6`}>
      <h3 className="font-semibold text-xl">Description</h3>
      <div className="flex flex-col gap-2 mt-5">
        {descriptions.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </div>
    </div>
  );
};

export default DescriptionSection;
