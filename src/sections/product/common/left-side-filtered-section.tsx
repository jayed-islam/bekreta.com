import React from "react";
import { Range, getTrackBackground } from "react-range";

interface LeftSideFilterProps {
  //   values: number[];
  //   setValues: React.Dispatch<React.SetStateAction<number[]>>;
  values: [number, number]; // Values should be a tuple of two numbers
  setValues: React.Dispatch<React.SetStateAction<[number, number]>>;
  selectedFilters: string[];
  handleFilterChange: (filter: string) => void;
  selectedBrands: string[];
  handleBrandChange: (brandName: string) => void;
  uniqueBrandNames: string[];
  availabilities: { name: string; keyword: string }[];
}

const LeftSideFilter: React.FC<LeftSideFilterProps> = ({
  values,
  setValues,
  selectedFilters,
  handleFilterChange,
  selectedBrands,
  handleBrandChange,
  uniqueBrandNames,
  availabilities,
}) => {
  return (
    <div className="w-full lg:w-[281px]">
      <div className="bg-white w-full rounded-lg shadow-sm pb-5">
        <h3 className="text-md font-semibold px-5 py-3 border-b">
          Price Range
        </h3>
        <div className="px-5 mt-5">
          <div>
            <Range
              values={values}
              step={1}
              min={0}
              max={3001}
              onChange={(values) => {
                setValues(values as [number, number]);
              }}
              renderTrack={({ props, children }) => (
                <div
                  onMouseDown={props.onMouseDown}
                  onTouchStart={props.onTouchStart}
                  style={{
                    ...props.style,
                    height: "36px",
                    display: "flex",
                    width: "100%",
                  }}
                >
                  <div
                    ref={props.ref}
                    style={{
                      height: "5px",
                      width: "100%",
                      borderRadius: "4px",
                      background: getTrackBackground({
                        values,
                        colors: ["#ccc", "#548BF4", "#ccc"],
                        min: 0,
                        max: 3001,
                        rtl: false,
                      }),
                      alignSelf: "center",
                    }}
                  >
                    {children}
                  </div>
                </div>
              )}
              renderThumb={({ props, isDragged }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: "21px",
                    width: "21px",
                    borderRadius: "50%",
                    backgroundColor: "#FFF",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow: "0px 2px 6px #AAA",
                  }}
                >
                  <div
                    style={{
                      height: "11px",
                      width: "11px",
                      borderRadius: "50%",
                      backgroundColor: isDragged ? "#548BF4" : "#CCC",
                    }}
                  />
                </div>
              )}
            />
          </div>

          <div className="flex justify-between space-x-5 mt-5">
            <div>
              {/* <label for="minPrice" className="block text-sm font-medium text-neutral-70">Min price
                                    </label> */}
              <div className="mt-1 relative rounded-md">
                <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-neutral-500 sm:text-sm">
                  $
                </span>
                <input
                  id="maxPrice"
                  className="block w-24 pr-10 pl-4 py-2 sm:text-sm border  border-neutral-400 rounded-full bg-transparent outline-none"
                  type="text"
                  name="maxPrice"
                  value={values[0]}
                />
              </div>
            </div>
            <div>
              {/* <label for="maxPrice" className="block text-sm font-medium text-neutral-700">Max price
                                    </label> */}
              <div className="mt-1 relative rounded-md">
                <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-neutral-500 sm:text-sm">
                  $
                </span>
                <input
                  id="maxPrice"
                  className="block w-24 pr-10 pl-4 py-2 sm:text-sm border  border-neutral-400 rounded-full bg-transparent outline-none"
                  type="text"
                  name="maxPrice"
                  value={values[1]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white w-full rounded-lg shadow-sm mt-2">
        <h3 className="text-md font-semibold px-5 py-3 border-b">
          Availability
        </h3>

        <div className="flex flex-col px-5 py-6 space-y-5">
          {availabilities.map((item, i) => (
            <div key={i} className="">
              <div className="flex text-sm sm:text-base items-center cursor-pointer">
                <input
                  id={item.name}
                  className="focus:ring-action-primary text-primary-500 rounded border-slate-400 hover:border-slate-700 bg-transparent focus:ring-primary-500 w-4 h-4"
                  type="checkbox"
                  checked={selectedFilters.includes(item.keyword)}
                  onChange={() => handleFilterChange(item.keyword)}
                />
                <label
                  htmlFor={item.name}
                  className="pl-2.5 sm:pl-3.5 flex flex-col flex-1 justify-center select-none"
                >
                  <span className="text-slate-900 font-medium">
                    {item.name}
                  </span>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white w-full rounded-lg shadow-sm mt-2">
        <h3 className="text-md font-semibold px-5 py-3 border-b">Brands</h3>

        <div className="flex flex-col px-5 py-6 space-y-5">
          {uniqueBrandNames.map((brandName, index) => (
            <div
              key={index}
              className="flex text-sm sm:text-base items-center cursor-pointer"
            >
              <input
                id={brandName}
                className="focus:ring-action-primary text-primary-500 rounded border-slate-400 hover:border-slate-700 bg-transparent focus:ring-primary-500 w-4 h-4 cursor-pointer"
                type="checkbox"
                checked={selectedBrands.includes(brandName)}
                onChange={() => handleBrandChange(brandName)}
              />
              <label
                htmlFor={brandName}
                className="pl-2.5 sm:pl-3.5 flex flex-col flex-1 justify-center select-none"
              >
                <span className="text-slate-900 font-medium">{brandName}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeftSideFilter;
