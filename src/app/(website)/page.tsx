// import { HomePageView } from "@/sections/home/view/home-page-view";
// import React from "react";

// const HomePage = () => {
//   return <HomePageView />;
// };

// export default HomePage;
import { HomePageView } from "@/sections/home/view/home-page-view";
import Head from "next/head";
import React from "react";

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Bekreta - Shop the Best Products Online</title>
        <meta
          name="description"
          content="Discover a wide range of products at the best prices. Shop now for electronics, fashion, home goods, and more on Your E-commerce Website."
        />
        <meta
          property="og:title"
          content="Bekreta - Shop the Best Products Online"
        />
        <meta
          property="og:description"
          content="Discover a wide range of products at the best prices. Shop now for electronics, fashion, home goods, and more on Bekreta"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bekreta.vercel.app" />
        <meta
          property="og:image"
          content="https://img.freepik.com/free-photo/realistic-b-letter-with-leaves_23-2150458489.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <HomePageView />
    </>
  );
};

export default HomePage;
