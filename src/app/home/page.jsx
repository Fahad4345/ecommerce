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
import { GetDataByCategory } from "../../Api1/getData";

export default function Home() {
    const [products, SetProducts] = useState([]);
    const [product, SetProduct] = useState([]);
    const [isLoading, SetisLoading] = useState(false);
    useEffect(() => {

        const fetchItems = async () => {

            try {

                SetisLoading(true);

                const data = await GetDataByCategory();

                SetProduct(data.item);
            } catch (err) {
                console.error("Error fetching products:", err);
                SetProduct([]);
            } finally {
                SetisLoading(false);
            }
        }
        fetchItems();
    }, []);

    if (isLoading) {
        return <><Navbar ShowCart={true} ShowProfile={true} ShowWishlist={true} /><Loader /></>
    }
    return (
        <div className=" bg-white h-full justify-center items-center flex flex-col overflow-hidden overflow-x-hidden">

            <Navbar ShowCart={true} ShowProfile={true} ShowWishlist={true} />


            <BannerSec />
            <SaleSection
                products={product}
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
            <ExploreProduct products={product} />
            <NewArivalSec />
            <FeatureSec />
        </div>
    );
}
