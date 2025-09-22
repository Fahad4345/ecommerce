"use client"
import React, { useEffect, useState, useContext } from 'react'
import Image from 'next/image'
import { Heart, Eye } from "lucide-react";
import Link from 'next/link'
import { useWishlist } from '../Api1/wishlist';
import { useRouter } from 'next/navigation';
import { InsertCart } from "./../Api1/Cart/insertCart"
import { MyContext } from "../context/MyContext";
import { GetCart } from '../Api1/Cart/getCart';

export default function BestProduct({ products }) {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const { insertItem, removeItem } = useWishlist();
    const { cartLength, setcartLength, wishlistIds, addToWishlist, removeFromWishlist } = useContext(MyContext);
    const router = useRouter();
    const [cartIds, setCartIds] = useState([]);

    const syncCartItems = async () => {
        try {
            const data = await GetCart();
            if (data && data.cart && Array.isArray(data.cart)) {
                const itemIds = data.cart.map(item => item.itemId._id);
                setCartIds(itemIds);
                localStorage.setItem("CartItems", JSON.stringify(itemIds));
            } else {
                setCartIds([]);
                localStorage.setItem("CartItems", JSON.stringify([]));
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

        try {
            await InsertCart(productId);


            if (!cartIds.includes(productId)) {
                const updatedCartIds = [...cartIds, productId];
                setCartIds(updatedCartIds);
                localStorage.setItem("CartItems", JSON.stringify(updatedCartIds));
            }


            setcartLength(cartLength + 1);

            alert("Item Added Successfully");
        } catch (error) {
            console.error("Error adding to cart:", error);
            alert("Failed to add item to cart");
        }
    };

    useEffect(() => {
        const filtered = products.filter((item) => item.rating >= 4.5).slice(0, 4);
        setFilteredProducts(filtered)
    }, [products]);

    return (
        <div className=' mx-[135px] mt-[145px] flex flex-col gap-[40px] items-center'>
            <div className='flex w-full justify-between'>
                <div className='flex flex-col gap-[24px]'>
                    <div className='flex items-center gap-[16px]'>
                        <div className='bg-[#DB4444] w-[20px] h-[40px] rounded-[4px]'></div>
                        <h1 className='font-[Poppins] font-[600] text-[16px] leading-[20px] text-[#DB4444]'>This Month</h1>
                    </div>
                    <h1 className='font-[Poppins] font-[600] text-[36px] leading-[48px] text-black'>Best Selling Products</h1>
                </div>
                <button
                    onClick={() => router.push("/allProduct?viewAll=true")}
                    className='rounded-[4px] text-[#FAFAFA] w-fit font-[Poppins] font-[400] text-[16px] leading-[24px] px-[38px] py-[16px] h-fit cursor-pointer bg-[#DB4444]'
                >
                    View All
                </button>
            </div>

            <div className='flex gap-[30px]'>
                {filteredProducts.map((product, id) => {
                    const wishlisted = wishlistIds?.includes(product._id);
                    const inCart = cartIds?.includes(product._id);

                    return (
                        <Link key={id} href={`/productDetail/${product._id}`}>
                            <div className="flex flex-col min-w-[270px] w-full min-h-[350px] h-full gap-4">
                                <div className="group relative bg-[#F5F5F5] px-3 py-3 min-h-[250px] flex justify-center items-center overflow-hidden">
                                    {product.discount && (
                                        <span className="absolute top-3 left-3 font-[Poppins] font-[400] text-[12px] px-[12px] py-[4px] bg-[#DB4444] text-white rounded-[4px]">
                                            {product.discount}%
                                        </span>
                                    )}

                                    <div className="absolute top-[12px] right-[12px] flex flex-col gap-2 items-end justify-end">
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();

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

                                <div className="flex flex-col gap-2">
                                    <h3 className="font-[500] font-[Poppins] text-[16px]">{product.name}</h3>

                                    <div className="flex items-center gap-2">
                                        <span className="text-red-600 font-[Poppins] font-[500] text-[16px]">
                                            ${product.price}
                                        </span>
                                        {product.discountPrice && (
                                            <span className="line-through text-gray-400 font-[Poppins] font-[500] text-[16px]">
                                                ${product.discountPrice}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center text-yellow-400 text-[16px]">
                                        {"★".repeat(Math.round(product.rating))}
                                        {"☆".repeat(5 - Math.round(product.rating))}
                                        <span className="ml-2 text-gray-500 font-[Poppins] font-[600] text-[14px]">
                                            ({product.review})
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}