import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import Marquee from "react-fast-marquee";

const FeaturedTopHeader = () => {
  return (
    <div className="w-full bg-slate-800">
      <div className="flex items-center justify-center sm:justify-between px-5 sm:px-20 md:px-11 lg:px-5 xl:px-0 max-w-5xl mx-auto gap-20">
        <div className="sm:flex items-center gap-9 text-white bg-green-500 h-full py-2 px-5 hidden">
          <div className="flex items-center gap-2 cursor-pointer text-sm md:text-[16px]">
            <Icon icon="line-md:email-opened-twotone-alt" />
            <h2>bekreta@gmail.com</h2>
          </div>
        </div>
        {/* <SocialMedia /> */}
        <Marquee className="text-white" pauseOnHover pauseOnClick speed={41}>
          এই পণ্যটি আমাদের সেরা পণ্যের মধ্যে একটি। এটি বিশেষভাবে বাছাই করা
          হয়েছে আপনাদের জন্য। বিশেষ অফারের জন্য এই পণ্যটি নির্বাচন করা হয়েছে।
          দ্রুত সংগ্রহ করুন!
        </Marquee>
      </div>
    </div>
  );
};

export default FeaturedTopHeader;
