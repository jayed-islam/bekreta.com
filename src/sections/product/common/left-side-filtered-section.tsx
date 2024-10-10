import { availabilities } from "@/constants";
import { scrollToTop } from "@/hooks/use-clicktoTop";
import { useAppSelector } from "@/redux/hooks";
import { useGetCategoriesQuery } from "@/redux/reducers/category/categoryApi";
import { IProductFilters, ProductStatus } from "@/types/products";
import { Button, FormControlLabel, Radio, Skeleton } from "@mui/material";
import React, { useCallback } from "react";
import { Range, getTrackBackground } from "react-range";

interface LeftSideFilterProps {
  filters: IProductFilters;
  values: [number, number];
  setValues: React.Dispatch<React.SetStateAction<[number, number]>>;
  onFilters: (name: string, value: string | number | string[]) => void;
  resetFilter: () => void;
}

const LeftSideFilter: React.FC<LeftSideFilterProps> = ({
  values,
  setValues,
  onFilters,
  resetFilter,
  filters,
}) => {
  // const { categories } = useAppSelector((state) => state.category);
  const { data, isLoading } = useGetCategoriesQuery();
  const handleFilterChange = useCallback(
    (name: string, event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);
      onFilters(name, value);
      setValues((prevValues) => {
        if (name === "minPrice") {
          return [value, prevValues[1]];
        } else {
          return [prevValues[0], value];
        }
      });
    },
    [onFilters]
  );

  const handleStatusFilterChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      const checked = event.target.checked;

      onFilters(
        "status",
        checked
          ? [...filters.status, value]
          : filters.status.filter((s) => s !== value)
      );
    },
    [onFilters, filters.status]
  );

  const handlePriceRangeChange = useCallback(
    (values: [number, number]) => {
      setValues(values);
      onFilters("minPrice", values[0]);
      onFilters("maxPrice", values[1]);
    },
    [setValues, onFilters]
  );

  const handleCategoryChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      onFilters("category", value);
      scrollToTop();
    },
    [onFilters]
  );

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
              onChange={(values) =>
                handlePriceRangeChange(values as [number, number])
              }
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
                  id="minPrice"
                  className="block w-24 pr-10 pl-4 py-2 sm:text-sm border  border-neutral-400 rounded-full bg-transparent outline-none"
                  type="text"
                  name="minPrice"
                  value={values[0]}
                  onChange={(e) => handleFilterChange("minPrice", e)}
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
                  onChange={(e) => handleFilterChange("maxPrice", e)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white w-full rounded-lg shadow-sm mt-3">
        <div className="px-5">
          <Button
            variant="contained"
            color="success"
            fullWidth
            onClick={resetFilter}
            sx={{
              textTransform: "capitalize",
            }}
          >
            Reset filters
          </Button>
        </div>
        <h3 className="text-md font-semibold px-5 py-3 border-b">
          Availability
        </h3>

        <div className="flex flex-col px-5 py-6 space-y-5">
          {availabilities.map((item, index) => (
            <div key={index} className="">
              <div className="flex text-sm sm:text-base items-center cursor-pointer">
                <input
                  id={item.label}
                  value={item.value}
                  className="focus:ring-action-primary text-primary-500 rounded border-slate-400 hover:border-slate-700 bg-transparent focus:ring-primary-500 w-4 h-4"
                  type="checkbox"
                  onChange={handleStatusFilterChange}
                  checked={filters.status.includes(item.value as ProductStatus)}
                />
                <label
                  htmlFor={item.label}
                  className="pl-2.5 sm:pl-3.5 flex flex-col flex-1 justify-center select-none"
                >
                  <span className="text-slate-900 font-medium">
                    {item.label}
                  </span>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white w-full rounded-lg shadow-sm mt-3">
        <h3 className="text-md font-semibold px-5 py-3 border-b">Categories</h3>

        <div className="flex flex-col px-5 py-3 space-y-5">
          {isLoading
            ? [1, 2, 3].map((_, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 animate-pulse"
                >
                  <Skeleton variant="circular" width={24} height={24} />

                  <Skeleton variant="text" width={100} height={20} />
                </div>
              ))
            : data?.data.map((category) => (
                <FormControlLabel
                  key={category._id}
                  control={
                    <Radio
                      value={category._id}
                      checked={filters.category === category._id}
                      onChange={handleCategoryChange}
                      inputProps={{ "aria-label": category.name }}
                    />
                  }
                  label={category.name}
                  className="text-sm sm:text-base cursor-pointer"
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default LeftSideFilter;
