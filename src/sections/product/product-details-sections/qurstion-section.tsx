import useBoolean from "@/hooks/use-boolean";
import QuestionModal from "@/layouts/common/modal/question-modal";
import { IProduct, IProductItem } from "@/types/products";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import React from "react";

interface QuestionTabProps {
  activeTab: string;
  questions: number;
  product: IProduct;
}

const QuestionSection: React.FC<QuestionTabProps> = ({
  activeTab,
  questions,
  product,
}) => {
  const questionModal = useBoolean();
  return (
    <div>
      <div className={`bg-white px-5 pt-5 pb-7 shadow-sm mt-6 `}>
        <div className="flex items-start sm:items-center gap-3 sm:gap-0 flex-col sm:flex-row justify-between pb-7">
          <div>
            <h3 className="font-semibold text-xl">Questions (0)</h3>
            <p className="text-md text-gray-500 pt-2">
              Have question about this product? Get specific details about this
              product from expert.
            </p>
          </div>
          <div>
            <button
              onClick={questionModal.setTrue}
              className="border-2 border-indigo-700 rounded px-5 py-2 hover:bg-indigo-700 text-indigo-700 hover:text-white transition-all duration-200 ease-in text-md font-semibold cursor-pointer"
            >
              Ask Question
            </button>
          </div>
        </div>
        <div className="border-t pt-5">
          {questions === 0 ? (
            <div className="flex items-center justify-center flex-col w-full py-9">
              <div className="bg-indigo-100 h-20 w-20 rounded-full flex items-center justify-center ">
                <Icon icon="octicon:question-24" className="text-4xl" />
              </div>
              <p className="text-md text-gray-500 pt-5">
                There are no questions asked yet. Be the first one to ask a
                question.
              </p>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      {/* <QuestionModal dialog={questionModal} product={product} /> */}
    </div>
  );
};

export default QuestionSection;
