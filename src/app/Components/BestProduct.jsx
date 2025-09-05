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
                {products.map((product) => (<Link key={product.id} href="/Pages/ProductDetail"> <div > <div

                    className=" flex flex-col min-w-[270px] w-full min-h-[350px] h-full gap-[16px] "

                >

                    <div className=' relative bg-[#F5F5F5] px-[12px] py-[12px] min-h-[250px] h-full  flex  justify-center items-center  '>

                        <span className="   absolute top-[12px] left-[12px] font-[Poppins]  h-[26px] font-[400] text-[12px]  leading-[18px]  px-[12px] py-[4px] bg-[#DB4444] text-white  rounded-[4px]">
                            {product.discount}
                        </span>


                        <div className="
                                        absolute top-[12px] right-[12px] flex flex-col gap-2  items-end justify-end">
                            <button className=" w-[34px] h-[34px] bg-white rounded-full  justify-center items-center flex shadow hover:bg-gray-100">
                                <Heart size={24} />
                            </button>
                            <button className=" w-[34px] h-[34px] bg-white rounded-full justify-center items-center flex  shadow hover:bg-gray-100">
                                <Eye size={24} />
                            </button>
                        </div>
                        <div className='  '>
                            <Image src="/assets/images/Led.png" width={172} height={129} alt="" />
                        </div>



                    </div>
                    <div className=' gap-[8px] flex flex-col'>
                        <h3 className="font-[Poppins]  font-[500] text-[16px]  leading-[24px] ">{product.name}</h3>
                        <div className="flex items-center gap-2 ">
                            <span className="text-red-600 font-[Poppins]  font-[500] text-[16px]  leading-[24px] ">${product.price}</span>
                            <span className="line-through text-gray-400 font-[Poppins]  font-[500] text-[16px]  leading-[24px] ">
                                ${product.oldPrice}
                            </span>
                        </div>

                        <div className="flex items-center  text-yellow-400 text-[20px]">
                            {"★".repeat(Math.round(product.rating))}
                            {"☆".repeat(5 - Math.round(product.rating))}
                            <span className="ml-2 text-gray-500 font-[Poppins]  font-[600] text-[14px]  leading-[21px] ">
                                ({product.reviews})
                            </span>
                        </div>

                        {/* Add to Cart Button (hover) */}
                        {/* <button className="w-full  bg-black text-white py-2 rounded hover:bg-gray-800">
                            Add To Cart
                        </button>
                     */}
                    </div>


                </div>


                </div></Link>))}
            </div>


        </div>
    )
}
