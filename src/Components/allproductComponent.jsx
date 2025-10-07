"use client";
import React, { useState, useEffect, Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "./NavBar";
import CategorySec from "./CategorySec";
import SaleSection from "./SaleSec";
import { GetDataByCategory } from "../Api1/getData";
import Loader from "../Components/loader";

export default function AllProduct() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchApplied, setSearchApplied] = useState(false);
    const [visibleCount, setVisibleCount] = useState(8);

    const searchParams = useSearchParams();
    const searchQuery = searchParams.get("search");
    const fromViewAll = searchParams.get("viewAll");
    const fromCategory = searchParams.get("category");

    const categories = useMemo(
        () => ["Phones", "Computers", "SmartWatch", "Camera", "HeadPhones", "Gaming"],
        []
    );


    const shouldShowCategorySec =
        !searchQuery && !fromCategory && !fromViewAll !== "true";


    useEffect(() => {
        async function fetchCategoryProducts() {
            if (fromCategory) {
                setIsLoading(true);
                setVisibleCount(8);
                try {
                    const data = await GetDataByCategory(fromCategory);
                    setProducts(data?.item || []);
                } catch (error) {
                    console.error("Error fetching category products:", error);
                    setProducts([]);
                } finally {
                    setIsLoading(false);
                }
            }
        }
        fetchCategoryProducts();
    }, [fromCategory]);


    useEffect(() => {
        const fetchAllProducts = async () => {
            if (fromViewAll === "true") {
                setIsLoading(true);
                setVisibleCount(8);
                try {
                    let allProducts = [];
                    for (const category of categories) {
                        const data = await GetDataByCategory(category);
                        if (data?.item && Array.isArray(data.item)) {
                            allProducts.push(...data.item);
                        }
                    }
                    setProducts(allProducts);
                } catch (error) {
                    console.error("Error fetching all products:", error);
                    setProducts([]);
                } finally {
                    setIsLoading(false);
                }
            }
        };
        fetchAllProducts();
    }, [fromViewAll, categories]);


    useEffect(() => {
        const performSearch = async () => {
            if (searchQuery && searchQuery.trim() && fromViewAll !== "true") {
                setIsLoading(true);
                setSearchApplied(true);
                setVisibleCount(8);

                try {
                    const query = searchQuery.toLowerCase().trim();
                    const categoryMappings = {
                        phone: "Phones",
                        phones: "Phones",
                        mobile: "Phones",
                        computer: "Computers",
                        computers: "Computers",
                        laptop: "Computers",
                        pc: "Computers",
                        smartwatch: "SmartWatch",
                        watch: "SmartWatch",
                        watches: "SmartWatch",
                        camera: "Camera",
                        cameras: "Camera",
                        headphone: "HeadPhones",
                        headphones: "HeadPhones",
                        earphone: "HeadPhones",
                        earphones: "HeadPhones",
                        gaming: "Gaming",
                        game: "Gaming",
                        games: "Gaming",
                        gamepad: "Gaming",
                    };

                    let targetCategory = categories.find(
                        (cat) => cat.toLowerCase() === query
                    );
                    if (!targetCategory) targetCategory = categoryMappings[query];

                    if (targetCategory) {
                        const data = await GetDataByCategory(targetCategory);
                        setProducts(data?.item || []);
                    } else {
                        let allSearchResults = [];
                        for (const category of categories) {
                            try {
                                const data = await GetDataByCategory(category);
                                if (data?.item && Array.isArray(data.item)) {
                                    const filtered = data.item.filter(
                                        (product) =>
                                            product.name?.toLowerCase().includes(query) ||
                                            product.description?.toLowerCase().includes(query) ||
                                            category.toLowerCase().includes(query)
                                    );
                                    allSearchResults.push(...filtered);
                                }
                            } catch (error) {
                                console.error(`Error searching in ${category}:`, error);
                            }
                        }


                        const uniqueResults = allSearchResults.filter(
                            (product, index, self) =>
                                index === self.findIndex((p) => p._id === product._id)
                        );
                        setProducts(uniqueResults);
                    }
                } catch (error) {
                    console.error("Error performing search:", error);
                    setProducts([]);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        if (searchQuery && fromViewAll !== "true") performSearch();
    }, [searchQuery, fromViewAll, categories]);


    const handleProductsFetch = (fetchedProducts) => {
        if (!searchApplied || fromViewAll === "true") {
            setProducts(fetchedProducts);
            setVisibleCount(8);
            setIsLoading(false);
        }
    };


    const getTitle = () => {
        if (fromCategory) return `${fromCategory} Products`;
        if (searchQuery && fromViewAll !== "true") {
            const matchedCategory = categories.find(
                (cat) => cat.toLowerCase() === searchQuery.toLowerCase()
            );
            if (matchedCategory) return `${matchedCategory} Products`;
            return `Search Results for "${searchQuery}"`;
        }
        return "All Products";
    };

    const getSubtitle = () => {
        if (fromCategory)
            return `Explore our collection of ${fromCategory} products`;
        if (searchQuery && fromViewAll !== "true")
            return `Found ${products.length} products matching "${searchQuery}"`;
        return "Check out all our products";
    };


    const visibleProducts = products.slice(0, visibleCount);


    return (
        <Suspense fallback={<Loader />}>
            <div className="flex flex-col justify-center items-center">
                <Navbar ShowCart={true} ShowProfile={true} ShowWishlist={true} />

                {shouldShowCategorySec && (
                    <CategorySec onItemFetch={handleProductsFetch} />
                )}

                {isLoading ? (
                    <Loader />
                ) : (
                    <>
                        {products.length === 0 ? (
                            <div className="flex flex-col justify-center items-center py-[100px]">
                                <p className="font-[Poppins] text-[18px] text-gray-500">
                                    No products found.
                                </p>
                            </div>
                        ) : (
                            <>
                                <SaleSection
                                    title={getTitle()}
                                    subtitle={getSubtitle()}
                                    products={visibleProducts}
                                    showNavigation={false}
                                    showViewAll={false}
                                    showSwiper={false}
                                    className="max-w-[1170px]"
                                />


                                {visibleCount < products.length && (
                                    <button
                                        onClick={() => setVisibleCount((prev) => prev + 8)}
                                        className="bg-[#DB4444] mt-[40px] cursor-pointer text-white font-[Poppins] px-6 py-3 rounded-md mb-10"
                                    >
                                        Load More
                                    </button>
                                )}
                            </>
                        )}
                    </>
                )}
            </div>
        </Suspense>
    );
}