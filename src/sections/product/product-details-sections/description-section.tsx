import { Icon } from "@iconify-icon/react/dist/iconify.js";
import React from "react";

interface DescriptionTabProps {
  activeTab: string;
}

const DescriptionSection: React.FC<DescriptionTabProps> = ({ activeTab }) => {
  return (
    <div className={`bg-white px-5 pt-5 pb-7 shadow-sm mt-6`}>
      <h3 className="font-semibold text-xl">Description</h3>
      <div className="">
        <h3 className="pt-7 text-lg font-semibold">Abul Abdullah</h3>
        <p className="text-md text-gray-500 pt-2">
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don't look even slightly believable.
          If you are going to use a passage of Lorem Ipsum, you need to be sure
          there isn't anything embarrassing hidden in the middle of text. All
          the Lorem Ipsum generators on the Internet tend to repeat predefined
          chunks as necessary, making this the first true generator on the
          Internet. It uses a dictionary of over 200 Latin words, combined with
          a handful of model sentence structures, to generate Lorem Ipsum which
          looks reasonable. The generated Lorem Ipsum is therefore always free
          from repetition, injected humour, or non-characteristic words etc.
        </p>
      </div>
    </div>
  );
};

export default DescriptionSection;
