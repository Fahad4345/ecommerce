import React from 'react'
import Image from 'next/image'
import { Heart, Eye } from "lucide-react";
import Link from 'next/link'

const products = [
    {
        id: 1,
        name: "HAVIT HV-G92 Gamepad",
        price: 120,
        oldPrice: 160,
        discount: "-40%",
        image: "/products/gamepad.png",
        rating: 4.5,
        reviews: 88,
    },
    {
        id: 2,
        name: "AK-900 Wired Keyboard",
        price: 960,
        oldPrice: 1160,
        discount: "-35%",
        image: "/products/keyboard.png",
        rating: 4.7,
        reviews: 75,
    },
    {
        id: 3,
        name: "IPS LCD Gaming Monitor",
        price: 370,
        oldPrice: 400,
        discount: "-30%",
        image: "/products/monitor.png",
        rating: 4.8,
        reviews: 99,
    },
    {
        id: 4,
        name: "IPS LCD Gaming Monitor",
        price: 370,
        oldPrice: 400,
        discount: "-30%",
        image: "/products/monitor.png",
        rating: 4.8,
        reviews: 99,
    },

];


export default function BestProduct() {
    return (
        <div className=' cursor-pointer mx-[135px] mt-[145px] flex flex-col gap-[40px] items-center  '>
            <div className=' flex  w-full justify-between '>
                <div className=' flex flex-col gap-[24px]'>
                    <div className='flex items-center gap-[16px]'>
                        <div className=' bg-[#DB4444] w-[20px] h-[40px] rounded-[4px]'></div>
                        <h1 className=' font-[Poppins] font-[600] text-[16px] leading-[20px] text-[#DB4444]'>This Month</h1>
                    </div>
                    <h1 className='font-[Poppins] font-[600] text-[36px] leading-[48px] text-black'>Best Selling Products</h1>
                </div>
                <button className=' rounded-[4px]  text-[#FAFAFA] w-fit font-[Poppins] font-[400] text-[16px] leading-[24px] px-[38px] py-[16px]  h-fit cursor-pointer bg-[#DB4444]
                    '>
                    View All
                </button>


            </div>
            <div className=' flex gap-[30px]'>
                {products.map((product) => (<Link key={product.id} href="/productDetail"><div className="flex flex-col min-w-[270px] w-full min-h-[350px] h-full gap-4">

                    <div className="group relative bg-[#F5F5F5] px-3 py-3 min-h-[250px] flex justify-center items-center overflow-hidden">

                        {product.discount && (
                            <span className="absolute top-3 left-3 font-poppins font-normal text-xs px-3 py-1 bg-[#DB4444] text-white rounded">
                                {product.discount}
                            </span>
                        )}


                        <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
                            <button className="w-9 h-9 bg-white rounded-full flex justify-center items-center shadow hover:bg-gray-100">
                                <Heart size={20} />
                            </button>
                            <button className="w-9 h-9 bg-white rounded-full flex justify-center items-center shadow hover:bg-gray-100">
                                <Eye size={20} />
                            </button>
                        </div>


                        <Image
                            src="/assets/images/Led.png"
                            width={172}
                            height={129}
                            alt={product.name}
                        />


                        <button
                            className=" font-[Poppins]  font-[500] text-[16px] leading-[24px] absolute bottom-0 left-0 w-full bg-black text-white py-2 text-sm 
                 translate-y-full group-hover:translate-y-0 
                 transition-all duration-300"
                        >
                            Add To Cart
                        </button>
                    </div>


                    <div className="flex flex-col gap-2">
                        <h3 className="font-poppins font-medium text-lg">{product.name}</h3>


                        <div className="flex items-center gap-2">
                            <span className="text-red-600 font-poppins font-medium text-lg">
                                ${product.price}
                            </span>
                            {product.oldPrice && (
                                <span className="line-through text-gray-400 font-poppins font-medium text-lg">
                                    ${product.oldPrice}
                                </span>
                            )}
                        </div>


                        <div className="flex items-center text-yellow-400 text-lg">
                            {"★".repeat(Math.round(product.rating))}
                            {"☆".repeat(5 - Math.round(product.rating))}
                            <span className="ml-2 text-gray-500 font-poppins font-semibold text-sm">
                                ({product.reviews})
                            </span>
                        </div>
                    </div>
                </div>
                </Link>))}
            </div>


        </div>
    )
}
