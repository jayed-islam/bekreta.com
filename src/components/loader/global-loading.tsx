import Image from "next/image";
import logo from "../../public/assets/logo.jpg";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="relative flex justify-center items-center">
        <Image src={logo} className="w-20" alt="logo" />

        <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-green-500"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
