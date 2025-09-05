"use client"
import React, { useState } from 'react'
import Navbar from "@/app/Components/navbar";

import SaleSection from '@/app/Components/SaleSec'
import Image from 'next/image'
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

];
const product = [
    {
        name: "Havic HV G-92 Gamepad",
        desc: "$192.00",
        price: "PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.",
        image: ["/assets/icons/product/image 57.png", "/assets/icons/product/image 58.png", "/assets/icons/product/image 59.png", "/assets/icons/product/image 61.png"],
        MainImage: "/assets/icons/product/image 63.png",
        rating: 4.5,
        reviews: 12,
    }
]

export default function ProductDetail() {
    const [size, setSize] = useState("M");
    const [quantity, setQuantity] = useState(2);

    const handleDecrement = () => {
        setQuantity(prev => Math.max(1, prev - 1));
    };

    const handleIncrement = () => {
        setQuantity(prev => prev + 1);
    };

    return (
        <div>
            <Navbar ShowCart={true} ShowProfile={true} ShowWishlist={true} />
            <div className=' mx-[135px] mt-[80px] '>
                {product.map((item, index) => (
                    <div key={index} className='flex gap-[70px]'>
                        <div className=' flex gap-[30px]'>
                            <div className=' flex flex-col gap-[16px] '>{item.image.map((img, idx) => (<div key={idx} className=' w-[170px] h-[138px]  flex justify-center items-center rounded-[4px]  bg-[#F5F5F5]'><Image src={img} width={121} height={114} alt="" /></div>))}</div>

                            <div className=' w-[500px] h-[600px] flex justify-center items-center rounded-[4px]  bg-[#F5F5F5]'><Image src={item.MainImage} width={446} height={315} alt="" /></div>
                        </div>
                        <div className=' flex flex-col'>
                            <div className=' flex flex-col gap-[16px]'><h1 className=' font-[Inter] font-[600] text-[24px] leading-[24px] tracking-[3%]'>{item.name}</h1>
                                <div className=' flex  items-center gap-[16px]'>
                                    <div className="flex items-center  text-yellow-400 text-[20px]">
                                        {"★".repeat(Math.round(item.rating))}
                                        {"☆".repeat(5 - Math.round(item.rating))}
                                        <span className="ml-2 text-gray-500 font-[Poppins]  font-[600] text-[14px]  leading-[21px] ">
                                            ({item.reviews} Reviews)
                                        </span>
                                    </div>
                                    <div className=' w-[1px] h-[16px] bg-[#000000]/50'></div>
                                    <h1 className=' font-[Poppins] font-[400] text-[14px] leading-[21px] tracking-[0px]'>In Stock</h1>
                                </div></div>
                            <div className=' flex flex-col gap-[24px] mt-[24px]'>
                                <div className=' w-[373px]'><h1 className=' font-[Poppins] font-[400] text-[14px] leading-[21px] tracking-[0px]'>PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.</h1></div>
                                <div className=' w-[373px] h-[1px] bg-[#000000]/50'></div>
                                <div className=' flex gap-[24px]'><label htmlFor="" className=' font-[Poppins] font-[400] text-[20px] leading-[20px] tracking-[3%]'>Colours:</label> <div className=' flex gap-[8px]'><input type="radio" className=' w-[20px] h-[20px] border-[2px] rounded-full' /><input type="radio" className=' w-[20px] h-[20px] border-[2px] rounded-full' /></div></div>
                                <div className=' flex gap-[24px] items-center'><label htmlFor="" className=' font-[Poppins] font-[400] text-[20px] leading-[20px] tracking-[3%]'>Size:</label>
                                    {["XS", "S", "M", "L", "XL"].map((option, id) => (
                                        <div
                                            onClick={() => setSize(option)}
                                            key={id}
                                            className={`flex gap-[16px] w-[32px] h-[32px] border-[1px] rounded-[4px] justify-center items-center font-[Poppins] font-[500] text-[14px] leading-[21px] cursor-pointer tracking-[0%] transition-colors duration-200 ${size === option ? 'bg-[#DB4444] text-[#FFFFFF]' : 'border-[#000000]/20 text-[#000]'}`}
                                        >
                                            {option}
                                        </div>
                                    ))}
                                </div>
                                <div className=' flex justify-center items-center h-fit'>
                                    <div className='   max-w-[159px] w-full justify-center items-center flex border-[1px] border-[#00000080]'>
                                        <div className='hover:bg-[#DB4444] hover:text-white flex border-r-[1px] border-[#00000080]'>
                                            <button
                                                className='w-[40px] h-[44px] flex justify-center items-center text-[16px]'
                                                onClick={handleDecrement}
                                                type="button"
                                            >
                                                <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                                                    <rect x="5" y="9" width="10" height="2" rx="1" fill="currentColor" />
                                                </svg>
                                            </button>
                                        </div>
                                        <div className=' px-[34px] py-[8px]'>
                                            <h1 className=' font-[Poppins] font-[500] text-[20px] leading-[28px] tracking-[0%]'>{quantity}</h1>
                                        </div>
                                        <div className=' flex border-l-[1px] border-[#00000080] hover:bg-[#DB4444] hover:text-white'>
                                            <button
                                                className='w-[40px] h-[44px] flex justify-center items-center text-[16px]'
                                                onClick={handleIncrement}
                                                type="button"
                                            >
                                                <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                                                    <rect x="9" y="5" width="2" height="10" rx="1" fill="currentColor" />
                                                    <rect x="5" y="9" width="10" height="2" rx="1" fill="currentColor" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <button className='w-fit ml-[16px]  flex justify-center items-center text-[16px] bg-[#DB4444] text-white cursor-pointer rounded-[4px]'>
                                        <span className='px-[48px] py-[10px] font-[Poppins] font-[500] text-[16px] leading-[24px] tracking-[0%]'>Buy Now</span>
                                    </button>
                                    <div className=' flex justify-center items-center ml-[19px] border-[1px] border-[#00000080] w-[40px] h-[40px]'><Image src="/assets/icons/Wishlist.svg" width={32} height={32} alt="" /></div>
                                </div>
                                <div className=' border-[1px] border-[#00000080] rounded-[4px]' >
                                    {[{ icon: "/assets/icons/icon-delivery (1).svg", title: "Free Delivery", desc: "Enter your postal code for Delivery Availability" }].map((item, index) => (
                                        <div key={index} className=' pt-[24px] pl-[16px] pb-[16px] border-b-[1px] border-[#00000080] flex items-center gap-[12px]'>
                                            <div><Image src={item.icon} width={40} height={40} alt="" /></div>
                                            <div className=' flex flex-col gap-[8px]'>
                                                <h1 className=' font-[Poppins] font-[500] text-[16px] leading-[24px] tracking-[0%]'>{item.title}</h1>
                                                <h1 className=' font-[Poppins] font-[500] text-[12px] leading-[18px] hover:underline  hover-underline-black tracking-[0%]'>{item.desc}</h1>
                                            </div>
                                        </div>
                                    ))}{[{ icon: "/assets/icons/Icon-return.svg", title: "Return Delivery", desc: "Free 30 Days Delivery Returns. Details" }].map((item, index) => (
                                        <div key={index} className=' flex items-center gap-[12px] pt-[26px] pl-[16px] pb-[24px]'>
                                            <div><Image src={item.icon} width={40} height={40} alt="" /></div>
                                            <div className=' flex flex-col gap-[8px]'>
                                                <h1 className=' font-[Poppins] font-[500] text-[16px] leading-[24px] tracking-[0%]'>{item.title}</h1>
                                                <h1 className=' font-[Poppins] font-[500] text-[12px] leading-[18px] hover:underline  hover-underline-black tracking-[0%]'>{item.desc}</h1>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            </div>

                        </div>

                    </div>
                ))}
            </div>
            <SaleSection
                products={products}
                showSwiper={false}
                showNavigation={false}
                showViewAll={false}

                subtitle='Related Item'
            />


        </div>
    )
}
