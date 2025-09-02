import Image from "next/image";
import { Poppins } from "next/font/google";
import Header from "./Components/header";
import Navbar from "./Components/navbar";
import BannerSec from "./Components/banner/bannerSec";
import SaleSec from "./Components/SaleSec";
import CategorySec from "./Components/CategorySec";
import BestProduct from "./Components/BestProduct";
import ExploreProduct from "./Components/ExploreProductSec";
import Banner2 from "./Components/banner2";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function Home() {
  return (
    <div className=" bg-white h-full">
      <Header />
      <Navbar />
      <BannerSec />
      <SaleSec />
      <div className=" border-b-[0.5px] mx-[135px] mt-[60px] border-[#000000]/30 h-[10px] w-[1170]"></div>
      <CategorySec />
      <div className=" border-b-[0.5px] mx-[135px] mt-[60px] border-[#000000]/30 h-[10px] w-[1170]"></div>
      <BestProduct />
      <Banner2 />
      <ExploreProduct />
    </div>
  );
}
