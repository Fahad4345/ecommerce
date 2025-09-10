import BannerSec from "../../Components/banner/BannerSec";
import SaleSection from "../../Components/SaleSec";
import CategorySec from "../../Components/CategorySec";
import BestProduct from "../../Components/BestProduct";
import ExploreProduct from "../../Components/ExploreProductSec";
import Banner2 from "../../Components/Banner2";
import NewArivalSec from "../../Components/NewArivalSec";
import FeatureSec from "../../Components/FeatureSec";
import Navbar from "../../Components/NavBar";

const products = [
    {
        id: 1,
        name: "HAVIT HV-G92 Gamepad",
        price: 120,
        oldPrice: 160,
        discount: "-40%",
        image: "/assets/images/Led.png",
        rating: 4.5,
        reviews: 88,
    },
    {
        id: 2,
        name: "/assets/images/Led.png",
        price: 960,
        oldPrice: 1160,
        discount: "-35%",
        image: "/assets/images/Led.png",
        rating: 4.7,
        reviews: 75,
    },
    {
        id: 3,
        name: "IPS LCD Gaming Monitor",
        price: 370,
        oldPrice: 400,
        discount: "-30%",
        image: "/assets/images/Led.png",
        rating: 4.8,
        reviews: 99,
    },
    {
        id: 4,
        name: "S-Series Comfort Chair",
        price: 375,
        oldPrice: 400,
        discount: "-25%",
        image: "/assets/images/Led.png",
        rating: 4.8,
        reviews: 99,
    },
    {
        id: 5,
        name: "S-Series Comfort Chair",
        price: 375,
        oldPrice: 400,
        discount: "-25%",
        image: "/assets/images/Led.png",
        rating: 4.8,
        reviews: 99,
    },
    {
        id: 6,
        name: "S-Series Comfort Chair",
        price: 375,
        oldPrice: 400,
        discount: "-25%",
        image: "/assets/images/Led.png",
        rating: 4.8,
        reviews: 99,
    },
];

export default function Home() {
    return (
        <div className=" bg-white h-full justify-center items-center flex flex-col overflow-hidden overflow-x-hidden">
            <Navbar ShowCart={true} ShowProfile={true} ShowWishlist={true} />
            <BannerSec />
            <SaleSection
                products={products}
                showSwiper={true}
                showNavigation={true}
                showViewAll={true}
                title="Flash Sale"
                subtitle="Today’s"
                className="max-w-[1440px]"
            />
            <div className=" border-b-[0.5px] mx-[135px] mt-[60px] border-[#000000]/30 h-[10px] w-[1170]"></div>
            <CategorySec />
            <div className=" border-b-[0.5px] mx-[135px] mt-[60px] border-[#000000]/30 h-[10px] w-[1170]"></div>
            <BestProduct />
            <Banner2 />
            <ExploreProduct />
            <NewArivalSec />
            <FeatureSec />
        </div>
    );
}
