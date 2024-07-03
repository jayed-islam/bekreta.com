import { paths } from "@/layouts/paths";

const bannerImages = [
  "https://img.freepik.com/premium-photo/shopping-cart-moves-speed-light-backdrop-with-balloons-gift-boxes-all-live-futuristic-atmosphere-3d-render_172660-11.jpg?size=626&ext=jpg",
  "https://img.freepik.com/free-photo/arrangement-black-friday-shopping-carts-with-copy-space_23-2148667047.jpg?size=626&ext=jpg",
  "https://img.freepik.com/free-vector/online-shopping-landing-page_33099-1725.jpg?size=626&ext=jpg",
];

const categories = [
  {
    name: "Quran",
    keyword: "quran",
    image: "assets/images/category/quran-q.avif",
  },
  {
    name: "Jainamaj",
    keyword: "jainama",
    image: "assets/images/category/prayer-pati.jpg",
  },
  {
    name: "Books",
    keyword: "books",
    image: "assets/images/category/books.jpg",
  },
  {
    name: "Pills",
    keyword: "pills",
    image: "assets/images/category/pill-pot.jpg",
  },
  {
    name: "Bags",
    keyword: "bag",
    image: "assets/images/category/bag.jpg",
  },
  {
    name: "Cloths",
    keyword: "cloths",
    image: "assets/images/category/t-shart.jpg",
  },
  {
    name: "Toys",
    keyword: "toys",
    image: "assets/images/category/toy.avif",
  },
  {
    name: "Jewelry",
    keyword: "jewelry",
    image: "assets/images/category/jewelry.avif",
  },
  {
    name: "Gadghets",
    keyword: "gadghets",
    image: "assets/images/category/gadghets.avif",
  },
  {
    name: "Watch",
    keyword: "watch",
    image: "assets/images/category/watch.jpg",
  },
  // {
  //   name: "Books",
  //   keyword: "books",
  //   image:
  //     "https://img.freepik.com/free-photo/front-view-stacked-books-ladders-education-day_23-2149241046.jpg?size=626&ext=jpg",
  // },
  // {
  //   name: "Watch",
  //   keyword: "Watch",
  //   image:
  //     "https://img.freepik.com/premium-psd/smart-watch-series-6-mockup_1332-25541.jpg?size=626&ext=jpg",
  // },
  // {
  //   name: "T-Shirts",
  //   keyword: "tshirts",
  //   image:
  //     "https://img.freepik.com/free-psd/white-t-shirt-mock-up_1310-233.jpg?size=626&ext=jpg",
  // },
  // {
  //   name: "Kitchen",
  //   keyword: "kitchen",
  //   image:
  //     "https://img.freepik.com/premium-photo/kitchen-counter-with-variety-kitchen-utensils-hanging-wall_192217-269.jpg?size=626&ext=jpg",
  // },
  // {
  //   name: "Pets",
  //   keyword: "pets",
  //   image:
  //     "https://img.freepik.com/free-photo/close-up-gray-kitten-nature_167946-121.jpg?size=626&ext=jpg",
  // },
  // {
  //   name: "Baby",
  //   keyword: "baby",
  //   image:
  //     "https://img.freepik.com/free-photo/beauty-product-still-life_23-2147817672.jpg?size=626&ext=jpg",
  // },
];

const socialInfo = [
  {
    name: "Share",
    link: "",
    icon: "logos:meta-icon",
    title: "facebook",
  },
  {
    name: "Twitter",
    link: "",
    icon: "logos:twitter",
    title: "tweet",
  },
  {
    name: "Whatsapp",
    link: "",
    icon: "logos:whatsapp-icon",
    title: "whatsapp",
  },
];

const queries = [
  // {
  //   id: "specification",
  //   name: "Specification",
  // },
  {
    id: "description",
    name: "Description",
  },
  // {
  //   id: "questions",
  //   name: "Questions",
  // },
  {
    id: "reviews",
    name: "Reviews",
  },
];

const features = [
  {
    icon: "bi:truck",
    title: "Free shipping",
    description: "On orders over $50.00",
    bg: "bg-red-50",
  },
  {
    icon: "streamline:return-2-solid",
    title: "Very easy to return",
    description: "Just phone number.",
    bg: "bg-yellow-50",
  },
  {
    icon: "mdi:truck-fast-outline",
    title: "Nationwide Delivery",
    description: "Fast delivery nationwide.",
    bg: "bg-green-50",
  },
  {
    icon: "gridicons:refund",
    title: "Refunds policy",
    description: "60 days return for any reason",
    bg: "bg-gray-50",
  },
];

const payment_methode = [
  {
    type: "Direct bank transfer",
    name: "direct_bank_transfer",
  },
  {
    type: "Check payments",
    name: "check_payments",
  },
  {
    type: "Cash on delivery",
    name: "cash_on_delivery",
  },
];

const profileInfo = [
  {
    title: "My Account",
    path: paths.account.root,
    icon: "solar:user-outline",
  },
  {
    title: "My Orders",
    path: paths.account.orders,
    icon: "solar:document-broken",
  },
  {
    title: "Wishlist",
    path: paths.account.wistlist,
    icon: "ph:heart-light",
  },
];

const actionButtonsInfo = [
  {
    icon: "ph:heart-light",
    action: () => {
      console.log("action, wishlist");
    },
    title: "Add to wishlist",
  },
  {
    icon: "carbon:view",
    action: () => {
      console.log("action, view");
    },
    title: "View Detail",
  },
  // {
  //   icon: "solar:bag-4-linear",
  //   action: () => {
  //     console.log("action, view");
  //   },
  //   title: "Add to cart",
  // },
];

const addressOptions = [
  { value: "home", label: "Home" },
  { value: "office", label: "Office" },
  { value: "others", label: "Others" },
];

const addressData = [
  {
    id: "home",
    type: "Home",
    district: "District A",
    division: "Division 1",
    subdistrict: "Subdistrict X",
    detailedAddress: "123 Main St, Hometown, HT 12345",
    details: "This is the home address.",
  },
  // {
  //   id: "office",
  //   type: "Office",
  //   district: "District B",
  //   division: "Division 2",
  //   subdistrict: "Subdistrict Y",
  //   detailedAddress: "456 Corporate Blvd, City, CT 67890",
  //   details: "This is the office address.",
  // },
  // {
  //   id: "others",
  //   type: "Others",
  //   district: "District C",
  //   division: "Division 3",
  //   subdistrict: "Subdistrict Z",
  //   detailedAddress: "789 Rural Rd, Village, VT 10111",
  //   details: "This is another address.",
  // },
];

const availabilities = [
  { label: "In Stock", value: "IN_STOCK" },
  { label: "Out of Stock", value: "OUT_OF_STOCK" },
  { label: "Discounted", value: "DISCOUNTED" },
  { label: "Featured", value: "FEATURED" },
];

export {
  bannerImages,
  categories,
  socialInfo,
  queries,
  features,
  payment_methode,
  profileInfo,
  actionButtonsInfo,
  addressOptions,
  addressData,
  availabilities,
};
