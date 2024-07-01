import Link from "next/link";
import { ReactNode } from "react";

interface ProductDetailTabProps {
  children: ReactNode;
  activeTab: string;
  onClick: (label: string) => void;
  label: string;
  value: string;
}

const Tab: React.FC<ProductDetailTabProps> = ({
  label,
  activeTab,
  onClick,
  value,
}) => {
  const isActive = activeTab === label;

  return (
    <Link href={`#${value}`}>
      <button
        className={`px-5 py-2 text-lg font-semibold rounded-md shadow-sm ${
          isActive
            ? "bg-green-600 text-white"
            : "bg-white hover:bg-green-600 hover:text-white"
        }`}
        onClick={() => onClick(label)}
      >
        {label}
      </button>
    </Link>
  );
};

export default Tab;
