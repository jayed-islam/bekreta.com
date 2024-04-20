import { ReactNode } from "react";

interface ProductDetailTabProps {
  children: ReactNode;
  activeTab: string;
  onClick: (label: string) => void;
  label: string;
}

const Tab: React.FC<ProductDetailTabProps> = ({
  label,
  activeTab,
  onClick,
}) => {
  const isActive = activeTab === label;

  return (
    <button
      className={`px-5 py-2 text-xs md:text-lg font-semibold rounded-md shadow-sm ${
        isActive
          ? "bg-orange-600 text-white"
          : "bg-white hover:bg-orange-600 hover:text-white"
      }`}
      onClick={() => onClick(label)}
    >
      {label}
    </button>
  );
};

export default Tab;
