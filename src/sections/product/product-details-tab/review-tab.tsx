import useBoolean from "@/hooks/use-boolean";
import AuthModal from "@/layouts/common/modal/auth-modal";
import QuestionModal from "@/layouts/common/modal/question-modal";
import { IProductItem } from "@/types/products";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import React from "react";

interface ReviewTabProps {
  activeTab: string;
  questions: number;
  product: IProductItem;
}

const ReviewTab: React.FC<ReviewTabProps> = ({
  activeTab,
  questions,
  product,
}) => {
  const reviewModal = useBoolean();
  return (
    <div
      className={`bg-white px-5 pt-5 pb-7 shadow-sm mt-6 ${
        activeTab === "Reviews" ? "" : "hidden"
      }`}
    >
      <div className="flex items-start sm:items-center gap-3 sm:gap-0 flex-col sm:flex-row justify-between pb-7">
        <div>
          <h3 className="font-semibold text-xl">Reviews (0)</h3>
          <p className="text-md text-gray-500 pt-2">
            Get specific details about this product from customers who own it.
          </p>
        </div>
        <button
          disabled
          onClick={reviewModal.setTrue}
          className="border-2 border-indigo-700 rounded px-5 py-2 hover:bg-indigo-700 text-indigo-700 hover:text-white transition-all duration-200 ease-in text-md font-semibold cursor-pointer"
        >
          Write a Review
        </button>
      </div>
      <div className="border-t pt-5">
        {questions === 0 ? (
          <div className="flex items-center justify-center flex-col w-full py-9">
            <div className="bg-indigo-100 h-20 w-20 rounded-full flex items-center justify-center ">
              <Icon
                icon="material-symbols-light:rate-review-outline-sharp"
                className="text-4xl"
              />
            </div>
            <p className="text-md text-gray-500 pt-5">
              This product has no reviews yet. Be the first one to write a
              review.
            </p>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <AuthModal dialog={reviewModal} />
    </div>
  );
};

export default ReviewTab;
