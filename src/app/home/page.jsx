"use client";
import BannerSec from "../../Components/banner/BannerSec";
import SaleSection from "../../Components/SaleSec";
import CategorySec from "../../Components/CategorySec";
import BestProduct from "../../Components/BestProduct";
import ExploreProduct from "../../Components/ExploreProductSec";
import Banner2 from "../../Components/Banner2";
import NewArivalSec from "../../Components/NewArivalSec";
import FeatureSec from "../../Components/FeatureSec";
import Navbar from "../../Components/NavBar";
import React, { useEffect, useState } from "react";
import Loader from "./../../Components/loader";


export default function Home() {
    const [products, SetProducts] = useState([]);
    useEffect(() => {
        if (products.length === 0) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [products]);


    return (
        <div className=" bg-white h-full justify-center items-center flex flex-col overflow-hidden overflow-x-hidden">

            <Navbar ShowCart={true} ShowProfile={true} ShowWishlist={true} />
            {products.length === 0 && <Loader />}

            <BannerSec />
            <SaleSection
                products={products}
                showTimer={true}
                showSwiper={true}
                slidesPerView={4}
                showNavigation={true}
                showViewAll={true}
                title="Flash Sale"
                subtitle="Today’s"
                className="max-w-[1440px]"
            />
            <div className=" border-b-[0.5px] mx-[135px] mt-[60px] border-[#000000]/30 h-[10px] w-[1170]"></div>
            <CategorySec onItemFetch={SetProducts} />
            <div className=" border-b-[0.5px] mx-[135px] mt-[60px] border-[#000000]/30 h-[10px] w-[1170]"></div>
            <BestProduct products={products} />
            <Banner2 />
            <ExploreProduct products={products} />
            <NewArivalSec />
            <FeatureSec />
        </div>
    );
}
