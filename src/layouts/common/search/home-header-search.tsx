import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setSearchTerm } from "@/redux/reducers/product/productSlice";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";
import { paths } from "@/layouts/paths";

export default function HomeHeaderSearch() {
  const { searchTerm } = useAppSelector((state) => state.product);

  const dispatch = useAppDispatch();

  const router = useRouter();

  // Handle search input change
  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    dispatch(setSearchTerm(searchValue));
  };

  const handleSearchSubmit = () => {
    router.push(`${paths.product.products}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  return (
    <div className="w-[400px] xl:w-[500px]">
      <div className="relative w-[400px] xl:w-[500px]">
        <>
          <div className="bg-white flex items-center rounded-md w-[400px] xl:w-[500px] relative z-50">
            <input
              type="text"
              placeholder="Search for products..."
              className="flex-grow bg-white px-5 rounded-md h-[55px] w-full border-none focus:outline-none"
              value={searchTerm}
              onChange={handleSearchInputChange}
              onKeyDown={handleKeyDown}
            />
            <div className="flex items-center justify-center h-7 w-7 absolute right-4">
              <Icon
                icon="teenyicons:search-outline"
                onClick={handleSearchSubmit}
                className="text-xl mt-1 text-gray-600 cursor-pointer"
              />
            </div>
          </div>
        </>
      </div>
    </div>
  );
}
