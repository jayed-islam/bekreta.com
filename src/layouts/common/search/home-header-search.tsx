import useBoolean from "@/hooks/use-boolean";
import { paths } from "@/layouts/paths";
import { useAppSelector } from "@/redux/hooks";
import { Popover, Transition } from "@headlessui/react";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";

export default function HomeHeaderSearch() {
  const { categories } = useAppSelector((state) => state.category);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const router = useRouter();

  const onSubmit = (searchTerm: string) => {
    router.push(`${paths.product.category}?search=${searchTerm}`);
  };

  const onSubmitCategory = (searchTerm: string) => {
    router.push(`${paths.product.category}?category=${searchTerm}`);
  };

  const handleInputFocus = () => {
    setIsPopoverOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsPopoverOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [router]);

  return (
    <div className="w-[400px] xl:w-[500px]">
      <Popover className="relative w-[400px] xl:w-[500px]">
        {({ open }) => (
          <>
            <div className="bg-white flex items-center rounded-md w-[400px] xl:w-[500px] relative z-50">
              <input
                ref={inputRef}
                onFocus={handleInputFocus}
                type="text"
                placeholder="Search for products..."
                className="flex-grow bg-white px-5 rounded-md h-[55px] w-full border-none focus:outline-none"
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setIsPopoverOpen(false);
                    onSubmit(query);
                  }
                }}
              />
              <div className="flex items-center justify-center h-7 w-7 absolute right-4">
                <Icon
                  icon="teenyicons:search-outline"
                  onClick={() => {
                    onSubmit(query);
                    setIsPopoverOpen(false);
                  }}
                  className="text-xl mt-1 text-gray-600"
                />
              </div>
            </div>
            <Transition
              show={isPopoverOpen}
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-0 right-0 z-10 mt-3 transform">
                {({ close }) => (
                  <div className="overflow-hidden rounded-lg shadow-lg bg-white p-5 h-[300px] overflow-y-auto">
                    <div className="lg:flex flex-col items-center gap-2 w-full">
                      {categories?.map((caterory, index) => (
                        <div
                          onClick={async () => {
                            onSubmitCategory(caterory.title);
                            close();
                          }}
                          key={index}
                          className="w-full hover:bg-gray-200 px-5 py-2 rounded-md text-left cursor-pointer"
                        >
                          <h2 className="text-sm lowercase">{caterory.name}</h2>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
