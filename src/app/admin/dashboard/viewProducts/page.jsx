"use client";
import Link from "next/link";
import Image from "next/image";
import Loader from "../../../../Components/loader";
import { GetDataByCategory } from "../../../../Api1/getData";
import React, { useState, useEffect } from "react";
import AdminNavBar from "../../../../Components/AdminNavBar";
import { API_BASE_URL } from "../../../../Api1/apiUrl";
import Guardwrapper from "../../../../Components/Guardwrapper";
export default function Page() {
    const [isOpen, setIsOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState("All");
    const [visibleCount, setVisibleCount] = useState(8);

    const categories = ["All", "Phones", "Computers", "SmartWatch", "Gaming", "Camera", "Men Fashion", "Women Fashion"];

    const HandleDelete = async (id) => {
        try {
            const res = await fetch(`${API_BASE_URL}/item/Delete`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`

                },
                body: JSON.stringify({ id }),
            });
            if (res.status === 200) {
                setProducts((prevProducts) =>
                    prevProducts.filter((product) => product._id !== id)
                );
            } else {
                console.log("Failed to delete product");
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                setVisibleCount(8);
                let data;
                if (category === "All") {
                    data = await GetDataByCategory();
                } else {
                    data = await GetDataByCategory(category);
                }
                setProducts(data?.item || []);
            } catch (err) {
                console.error("Error fetching products:", err);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [category]);

    if (loading) {
        return <Loader />;
    }

    function ProductCard({ product }) {
        const imageUrl =
            Array.isArray(product.image) && product.image.length > 0
                ? product.image[0]
                : "/placeholder.png";

        return (
            <div className="max-w-[270px] min-w-[270px] w-full min-h-[350px] max-h-[350px] h-full">
                <Link key={product._id} href={`/admin/dashboard/viewProducts/adminItemUpdate/${product._id}`}>
                    <div className="flex flex-col cursor-pointer max-w-[270px] min-w-[270px] w-full min-h-[350px] max-h-[350px] h-full gap-[16px]">
                        <div className="relative group overflow-hidden bg-[#F5F5F5] px-[12px] py-[12px] min-h-[250px] flex justify-center items-center">
                            <span className="absolute top-[12px] left-[12px] font-[Poppins] h-[26px] font-[400] text-[12px] leading-[18px] px-[12px] py-[4px] bg-[#DB4444] text-white rounded-[4px]">
                                {`${product.discount ?? 0}%`}
                            </span>

                            <Image
                                src={imageUrl}
                                width={270}
                                height={350}
                                className="max-h-[270px]  min-h-[350px] min-w-[270px] max-w-[270px] w-full h-full object-cover"
                                alt={product.name}
                            />
                            <div className="absolute top-[12px] right-[12px] flex flex-col gap-2 items-end justify-end">
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        HandleDelete(product._id);
                                    }}
                                    className="w-[34px] h-[34px] bg-white rounded-full justify-center items-center flex shadow hover:bg-gray-100 cursor-pointer disabled:cursor-not-allowed"
                                >
                                    <Image src="/assets/icons/delete.svg" alt="" width={24} height={24} />
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-[8px]">
                            <h3 className="font-[Poppins] font-[500] text-[16px] leading-[24px]">
                                {product.name.slice(0, 50)}
                                {product.name.length > 25 ? "..." : ""}
                            </h3>
                            <div className="flex items-center gap-2">
                                <span className="text-red-600 font-[Poppins] font-[500] text-[16px] leading-[24px]">
                                    ${product.price}
                                </span>
                                {product.discountPrice && (
                                    <span className="line-through text-gray-400 font-[Poppins] font-[500] text-[16px] leading-[24px]">
                                        ${product.discountPrice}
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center text-yellow-400 text-[20px]">
                                {"★".repeat(Math.round(product.rating || 0))}
                                {"☆".repeat(5 - Math.round(product.rating || 0))}
                                <span className="ml-2 text-gray-500 font-[Poppins] font-[600] text-[14px] leading-[21px]">
                                    ({product.review || 0})
                                </span>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        );
    }

    return (
        <Guardwrapper>
            <div className="flex flex-col justify-center items-center">
                <AdminNavBar />

                {/* Category & Create Button */}
                <div className=" max-w-[1200px] w-full flex flex-row justify-between items-center pb-[20px] pt-[20px] bg-white">
                    <div className="relative w-[500px] justify-center items-center bg-black/10 rounded-[4px] p-[10px]">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="flex items-center w-full justify-between text-black bg-transparent font-[Poppins] text-[14px] cursor-pointer "
                        >
                            <p>{category}</p>
                            <svg
                                width="20"
                                height="15"
                                viewBox="0 0 12 8"
                                fill="none"
                                className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                            >
                                <path
                                    d="M1 1L6 6L11 1"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>

                        {isOpen && (
                            <div className="absolute top-full right-0 mt-1 bg-white rounded-md shadow-lg border border-gray-200 z-50 min-w-[120px] overflow-hidden">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => {
                                            setCategory(cat);
                                            setIsOpen(false);
                                        }}
                                        className={`w-full text-left px-4 py-3 font-[Poppins] text-[14px] transition-colors ${category === cat
                                            ? "bg-[#DB4444] text-white"
                                            : "text-black hover:bg-gray-100"
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <Link href="/admin/dashboard/viewProducts/InsertItem">
                        <button className="bg-[#DB4444] h-[50px] cursor-pointer text-white font-[Poppins] text-[14px] px-[50px] py-[16px] rounded-[4px]">
                            Create Item +
                        </button>
                    </Link>
                </div>

                {/* Product Grid */}
                <div className="flex flex-wrap max-w-[1250px] justify-center w-full gap-[40px] mx-[135px] my-[40px] items-center">
                    {products.length > 0 ? (
                        products.slice(0, visibleCount).map((p) => (
                            <ProductCard key={p._id} product={p} />
                        ))
                    ) : (
                        <p>No products found.</p>
                    )}
                </div>

                {/* Load More Button */}
                {visibleCount < products.length && (
                    <button
                        onClick={() => setVisibleCount((prev) => prev + 8)}
                        className="bg-[#DB4444] cursor-pointer text-white font-[Poppins] px-6 py-3 rounded-md mb-10"
                    >
                        Load More
                    </button>
                )}
            </div></Guardwrapper>
    );
}
