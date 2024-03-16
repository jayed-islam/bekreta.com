import Link from "next/link";
import React from "react";

const HomeheaderCategoryView = () => {
  const categories2 = [
    {
      name: "Pill",
      keyword: "pills",
      image:
        "https://img.freepik.com/free-photo/olive-oil-bottle-marble-table_114579-18137.jpg?size=626&ext=jpg",
    },
    {
      name: "Clothing",
      keyword: "clothing",
      image:
        "https://img.freepik.com/free-photo/clothes_144627-25214.jpg?size=626&ext=jpg",
    },
    {
      name: "Home Decor",
      keyword: "homedecor",
      image:
        "https://img.freepik.com/premium-photo/interior-green-wall-with-green-sofa-living-room-3d-rendering_41470-3667.jpg?size=626&ext=jpg",
    },
    {
      name: "Beauty",
      keyword: "beauty",
      image:
        "https://img.freepik.com/free-psd/cosmetics-cream-jar-with-tube-icon-isolated-3d-render-illustration_47987-11649.jpg?size=626&ext=jpg",
    },
    {
      name: "Health",
      keyword: "health",
      image:
        "https://img.freepik.com/free-photo/3d-medical-background-with-virus-cells-dna-strand_1048-8470.jpg?size=626&ext=jpg",
    },
    {
      name: "Drinks",
      keyword: "drinks",
      image:
        "https://img.freepik.com/free-photo/refreshing-cold-soda-can-with-water-drops_53876-145620.jpg?size=626&ext=jpg",
    },
    {
      name: "Toys",
      keyword: "toys",
      image:
        "https://img.freepik.com/free-photo/set-children-toys_93675-130772.jpg?size=626&ext=jpg",
    },
    {
      name: "Jewelry",
      keyword: "jewelry",
      image:
        "https://img.freepik.com/free-photo/pair-gold-earrings-with-green-stones-black-background_1340-42887.jpg?size=626&ext=jpg",
    },
    {
      name: "Gadghets",
      keyword: "gadghets",
      image:
        "https://img.freepik.com/free-photo/levitating-music-headphones-display_23-2149817605.jpg?size=626&ext=jpg",
    },
    {
      name: "Automotive",
      keyword: "automotive",
      image:
        "https://img.freepik.com/premium-photo/headlights-hood-black-sports-car_146671-5564.jpg?size=626&ext=jpg",
    },
    {
      name: "Books",
      keyword: "books",
      image:
        "https://img.freepik.com/free-photo/front-view-stacked-books-ladders-education-day_23-2149241046.jpg?size=626&ext=jpg",
    },
    {
      name: "Watch",
      keyword: "Watch",
      image:
        "https://img.freepik.com/premium-psd/smart-watch-series-6-mockup_1332-25541.jpg?size=626&ext=jpg",
    },
    {
      name: "T-Shirts",
      keyword: "tshirts",
      image:
        "https://img.freepik.com/free-psd/white-t-shirt-mock-up_1310-233.jpg?size=626&ext=jpg",
    },
    {
      name: "Kitchen",
      keyword: "kitchen",
      image:
        "https://img.freepik.com/premium-photo/kitchen-counter-with-variety-kitchen-utensils-hanging-wall_192217-269.jpg?size=626&ext=jpg",
    },
    {
      name: "Pets",
      keyword: "pets",
      image:
        "https://img.freepik.com/free-photo/close-up-gray-kitten-nature_167946-121.jpg?size=626&ext=jpg",
    },
    {
      name: "Baby",
      keyword: "baby",
      image:
        "https://img.freepik.com/free-photo/beauty-product-still-life_23-2147817672.jpg?size=626&ext=jpg",
    },
  ];

  return (
    <div className="">
      <div className="overflow-x-auto scrollbar-hide max-w-7xl mx-auto py-5">
        <div className="xl:flex hidden">
          {categories2.map((category, i) => (
            <Link
              href={`/category?category=${category.keyword}`}
              key={i}
              className="w-20 md:w-32 flex-shrink-0 flex flex-col rounded-xl items-center justify-center cursor-pointer "
            >
              <img
                src={category.image}
                className="h-14 w-14 md:h-24 md:w-24 rounded-full hover:p-2 bg-white transition-all duration-200 ease-in-out shadow-md border"
                alt=""
              />
              <h3 className="text-xs sm:text-sm font-semibold transition-all duration-100 ease-in mt-2 md:mt-3 group-hover:text-red-500 text-center">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
        <div className="xl:hidden flex">
          {categories2.map((category, i) => (
            <Link
              href={`/category?category=${category.keyword}`}
              key={i}
              className="w-20 md:w-32 flex-shrink-0 flex flex-col rounded-xl items-center justify-center cursor-pointer "
            >
              <img
                src={category.image}
                className="h-14 w-14 md:h-24 md:w-24 rounded-full hover:p-2 bg-white transition-all duration-200 ease-in-out shadow-md border"
                alt=""
              />
              <h3 className="text-xs sm:text-sm font-semibold transition-all duration-100 ease-in mt-2 md:mt-3 group-hover:text-red-500 text-center">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeheaderCategoryView;
