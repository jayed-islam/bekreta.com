import useBoolean from "@/hooks/use-boolean";
import { paths } from "@/layouts/paths";
import { Popover, Transition } from "@headlessui/react";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";

export default function HomeHeaderSearch() {
  const topSearchWord = ["enhance", "upgrade", "maximize", "child", "book"];
  const inputRef = useRef<HTMLInputElement>(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const router = useRouter();
  const popover = useBoolean();

  const onSubmit = (data: any) => {
    router.push(`${paths.product.category}?search=${data.search}`);
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
    <div className="w-[500px]">
      <Popover className="relative w-[500px]">
        {({ open }) => (
          <>
            <div className="bg-white flex items-center rounded-md w-[500px] relative z-50">
              <input
                ref={inputRef}
                onFocus={handleInputFocus}
                type="text"
                placeholder="Search for products..."
                className="flex-grow bg-white px-5 rounded-md h-[55px] w-full border-none focus:outline-none"
                onChange={onSubmit}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setIsPopoverOpen(false);
                    onSubmit({ search: inputRef.current?.value });
                    router.push(
                      `${paths.product.category}?search=${inputRef.current?.value}`
                    );
                  }
                }}
              />
              <Icon
                icon="teenyicons:search-outline"
                onClick={() => {
                  onSubmit;
                  setIsPopoverOpen(false);
                }}
                className="text-xl mt-1 text-gray-600 absolute right-5"
              />
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
                  <div className="overflow-hidden rounded-lg shadow-lg bg-white p-5">
                    <div className="lg:flex flex-col items-center gap-2 w-full">
                      {topSearchWord.map((word, index) => (
                        <div
                          onClick={async () => {
                            router.push(
                              `${paths.product.category}?search=${word}`
                            );
                            close();
                          }}
                          key={index}
                          className="w-full hover:bg-gray-200 px-5 py-2 rounded-md text-left cursor-pointer"
                        >
                          <h2 className="text-sm ">{word}</h2>
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
