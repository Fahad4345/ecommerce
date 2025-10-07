
"use client"
import React, { useEffect, useState, useRef } from "react";
import Image from 'next/image'
import { Camera, Phone, Computer, GamePad, HeadPhone, Watch } from "./svg/Svg";
import { GetDataByCategory } from "../Api1/getData"
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";



const Category = [
    {
        category: "Phones",
        Icon: Phone
    }, {
        category: "Computers",
        Icon: Computer
    }, {
        category: "SmartWatch",
        Icon: Watch
    }, {
        category: "Camera",
        Icon: Camera
    }, {
        category: "HeadPhones",
        Icon: HeadPhone
    }, {
        category: "Gaming",
        Icon: GamePad
    }, {
        category: "Men's Fashion",
        Icon: Phone
    },
    {
        category: "Women's Fashion",
        Icon: Phone
    }, {
        category: "Medicine",
        Icon: Phone
    },
]


export default function CategorySec({ onItemFetch }) {
    const [SelectedIndex, setSelectedIndex] = useState(null);
    const SelectedCategory = Category[SelectedIndex]?.category;
    const swiperRef = useRef(null);

    useEffect(() => {
        async function fetchData() {
            const data = await GetDataByCategory(SelectedCategory);
            onItemFetch?.(data.item);

        }

        fetchData();

    }, [SelectedCategory])


    const handlenext = () => {
        setSelectedIndex((prev) => (prev + 1) % Category.length);
    }
    const handleprev = () => {
        setSelectedIndex((prev) =>
            prev === 0 ? Category.length - 1 : prev - 1
        );
    }
    return (
        <div className='  mx-[135px] mt-[80px] flex flex-col gap-[40px] max-w-[1170px] w-full'>
            <div className=' flex   justify-between'>
                <div className=' flex flex-col gap-[24px]'>
                    <div className='flex items-center gap-[16px]'>
                        <div className=' bg-[#DB4444] w-[20px] h-[40px] rounded-[4px]'></div>
                        <h1 className=' font-[Poppins] font-[600] text-[16px] leading-[20px] text-[#DB4444]'>Categories</h1>
                    </div>
                    <h1 className='font-[Poppins] font-[600] text-[36px] leading-[48px] text-black'>Browse by Categories</h1>
                </div>
                <div className='flex gap-[8px]'>
                    <button onClick={() => swiperRef.current?.slidePrev()} className='w-[46px] h-[46px] rounded-full justify-center cursor-pointer items-center flex bg-[#F5F5F5] rotate-180' ><Image src="/assets/icons/BlackRightArrow.svg" className=" " alt="" width={24} height={24} /></button>
                    <button onClick={() => swiperRef.current?.slideNext()} className='w-[46px] h-[46px] bg-[#F5F5F5]  rounded-full justify-center cursor-pointer items-center flex' ><Image src="/assets/icons/BlackRightArrow.svg" className="" alt="" width={24} height={24} /></button>
                </div>

            </div>
            <Swiper
                modules={[Navigation]}
                slidesPerView={6}
                spaceBetween={30}
                onBeforeInit={(swiper) => {
                    swiperRef.current = swiper;
                }}
                allowTouchMove={false}
                className="w-full max-w-[1170px]"
            >
                <div className="flex gap-[30px] w-full">
                    {Category.map((cat, index) => {
                        const isActive = index === SelectedIndex;
                        return (<SwiperSlide className="max-w-[270px] w-full" key={index}>
                            <div
                                key={index}
                                onClick={() => setSelectedIndex(index)}
                                className={`min-w-[170px] w-full min-h-[145px] h-full gap-[16px] flex flex-col justify-center items-center rounded-[4px] border-[1px] cursor-pointer transition
                ${isActive
                                        ? "bg-[#DB4444] text-white border-[#DB4444]"
                                        : "bg-white text-black border-[#0000004D]"
                                    }`}
                            >
                                <cat.Icon />
                                <h1 className="font-[Poppins] font-[400] text-[16px] leading-[24px]">
                                    {cat.category}
                                </h1>
                            </div></SwiperSlide>
                        );
                    })}
                </div>    </Swiper>

        </div>



    )
}
