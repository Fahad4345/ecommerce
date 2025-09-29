"use client";
import React, { useEffect, useRef, useContext } from "react";
import Image from "next/image";
import { Heart, Eye } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import Link from "next/link";
import { useWishlist } from "../Api1/wishlist"
import FlashSaleTimer from "./FlashTimer";
import { InsertCart } from '../Api1/Cart/insertCart';
import { MyContext } from "../context/MyContext";
import { GetCart } from '../Api1/Cart/getCart';
import { showToast } from "./toast";

export default function SaleSection({
    title = "",
    subtitle = "",
    className = "",
    products,
    showSwiper = true,
    showNavigation = true,
    showViewAll = true,
    slidesPerView = 4,
    showTimer = false,
}) {
    const { insertItem, removeItem, } = useWishlist();
    const { cartLength, setcartLength, wishlistIds, addToWishlist, removeFromWishlist, cartIds, setCartIds } = useContext(MyContext);
    const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user")) : null;
    const swiperRef = useRef(null);


    const syncCartItems = async () => {
        try {
            if (user) {
                const data = await GetCart();
                if (data && data.cart && Array.isArray(data.cart)) {
                    const itemIds = data.cart.map(item => item.itemId._id);
                    setCartIds(itemIds);
                    localStorage.setItem("CartItems", JSON.stringify(itemIds));
                } else {
                    setCartIds([]);
                    localStorage.setItem("CartItems", JSON.stringify([]));
                }
            }
        } catch (error) {
            console.error("Error syncing cart items:", error);
        }
    };


    useEffect(() => {
        syncCartItems();
    }, []);


    useEffect(() => {
        const handleVisibilityChange = () => {
            if (!document.hidden) {

                syncCartItems();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);


    const handleAddToCart = async (productId, e) => {
        e.preventDefault();
        e.stopPropagation();
        if (user) {
            try {
                await InsertCart(productId);


                if (!cartIds.includes(productId)) {
                    const updatedCartIds = [...cartIds, productId];
                    setCartIds(updatedCartIds);
                    localStorage.setItem("CartItems", JSON.stringify(updatedCartIds));
                }


                setcartLength(cartLength + 1);

            } catch (error) {
                console.error("Error adding to cart:", error);
                alert("Failed to add item to cart");
            }
        }
        else {
            showToast("Login to Add", "error");
        }
    };

    function ProductCard({ product }) {
        const wishlisted = wishlistIds?.includes(product._id);
        const inCart = cartIds?.includes(product._id);
        console.log("wishlist ID", wishlistIds, "productId", product._id);
        return (
            <Link key={product._id} href={`/productDetail/${product._id}`}>
                <div className={`flex flex-col cursor-pointer ${showSwiper === true ? "w-full" : "max-w-[270px] min-w-[270px] w-full"} max-w-[270px] min-w-[270px] w-full min-h-[350px] h-full gap-[16px]`}>
                    <div className="relative group overflow-hidden bg-[#F5F5F5] px-[12px] py-[12px] min-h-[250px] flex justify-center items-center">
                        <span className="absolute top-[12px] left-[12px] font-[Poppins] h-[26px] font-[400] text-[12px] leading-[18px] px-[12px] py-[4px] bg-[#DB4444] text-white rounded-[4px]">
                            {`${product.discount}%`}
                        </span>

                        <div className={`absolute top-[12px] right-[12px] flex flex-col gap-2 items-end justify-end`}>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    if (!user) {

                                        showToast(" Login to Add ", "error");
                                        return;
                                    }
                                    if (wishlisted) {
                                        removeItem(product._id);
                                        removeFromWishlist(product._id);
                                    } else {
                                        insertItem(product._id);
                                        addToWishlist(product._id);
                                    }
                                }}
                                className="w-[34px] h-[34px] cursor-pointer bg-white rounded-full flex justify-center items-center shadow hover:bg-gray-100"
                            >
                                <Heart fill={wishlisted ? "red" : "none"} color={wishlisted ? "red" : "black"} size={20} />
                            </button>
                            <button className="w-[34px] h-[34px] cursor-pointer bg-white rounded-full flex justify-center items-center shadow hover:bg-gray-100">
                                <Eye size={20} />
                            </button>
                        </div>

                        <Image
                            src={product.image[0]}
                            width={172}
                            height={129}
                            alt={product.name}
                        />

                        <button
                            onClick={(e) => handleAddToCart(product._id, e)}
                            disabled={inCart}
                            className={`font-[Poppins] cursor-pointer font-[500] text-[16px] leading-[24px] absolute bottom-0 left-0 w-full py-2 text-sm translate-y-full group-hover:translate-y-0 transition-all duration-300 ${inCart
                                ? "bg-green-600 text-white cursor-not-allowed"
                                : "bg-black text-white hover:bg-gray-800"
                                }`}
                        >
                            {inCart ? "Added to Cart" : "Add To Cart"}
                        </button>
                    </div>

                    <div className="flex flex-col gap-[8px]">
                        <h3 className="font-[Poppins] font-[500] text-[16px] leading-[24px]">
                            {product.name}
                        </h3>
                        <div className="flex items-center gap-2">
                            <span className="text-red-600 font-[Poppins] font-[500] text-[16px] leading-[24px]">
                                ${product.price}
                            </span>
                            <span className="line-through text-gray-400 font-[Poppins] font-[500] text-[16px] leading-[24px]">
                                ${product.discountPrice}
                            </span>
                        </div>
                        <div className="flex items-center text-yellow-400 text-[20px]">
                            {"★".repeat(Math.round(product.rating))}
                            {"☆".repeat(5 - Math.round(product.rating))}
                            <span className="ml-2 text-gray-500 font-[Poppins] font-[600] text-[14px] leading-[21px]">
                                ({product.review})
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        );
    }

    return (
        <div className={` w-full max-w-[1170px] mx-[135px]  ${className} overflow-hidden w-full mt-[145px] flex flex-col gap-[40px]`}>
            <div className="flex items-end justify-between max-w-[1170px] mx-[135px] w-full">
                <div className="flex flex-row justify-end items-end gap-[87px]">
                    <div className="flex flex-col gap-[24px]">
                        <div className="flex items-center gap-[16px]">
                            <div className="bg-[#DB4444] w-[20px] h-[40px] rounded-[4px]"></div>
                            <h1 className="font-[Poppins] font-[600] text-[16px] leading-[20px] text-[#DB4444]">
                                {subtitle}
                            </h1>
                        </div>
                        <h1 className="font-[Poppins] font-[600] text-[36px] leading-[48px] text-black">
                            {title}
                        </h1>
                    </div>
                    {showTimer && (<FlashSaleTimer />)}
                </div>

                {showNavigation && showSwiper && (
                    <div className="flex gap-[8px]">
                        <button
                            className="w-[46px] cursor-pointer h-[46px] rounded-full flex justify-center items-center bg-[#F5F5F5] rotate-180"
                            onClick={() => swiperRef.current?.slidePrev()}
                        >
                            <Image
                                src="/assets/icons/BlackRightArrow.svg"
                                alt="prev"
                                width={24}
                                height={24}
                            />
                        </button>
                        <button
                            className="cursor-pointer w-[46px] h-[46px] rounded-full flex justify-center items-center bg-[#F5F5F5]"
                            onClick={() => swiperRef.current?.slideNext()}
                        >
                            <Image
                                src="/assets/icons/BlackRightArrow.svg"
                                alt="next"
                                width={24}
                                height={24}
                            />
                        </button>
                    </div>
                )}
            </div>

            {showSwiper ? (
                <Swiper
                    modules={[Navigation]}
                    slidesPerView={slidesPerView}
                    spaceBetween={30}
                    onBeforeInit={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    allowTouchMove={false}
                    className="w-full max-w-[1170px]"
                >
                    {products.map((product) => (
                        <SwiperSlide className="max-w-[270px] w-full" key={product._id}>
                            <ProductCard product={product} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <div className="grid grid-cols-4 gap-[30px] w-fit">
                    {products.map((product, id) => (
                        <ProductCard key={id} product={product} />
                    ))}
                </div>
            )}

            {showViewAll && (
                <div className="w-full max-w-[1170px] mx-[135px] items-center flex justify-center">
                    <Link href="/allProduct?viewAll=true">
                        <div className="rounded-[4px] text-[#FAFAFA] w-fit font-[Poppins] font-[400] text-[16px] leading-[24px] px-[38px] py-[16px] cursor-pointer bg-[#DB4444] items-center">
                            View All Products
                        </div>
                    </Link>
                </div>
            )}
        </div>
    );
}