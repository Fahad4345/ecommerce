
"use client"
import React, { useState } from "react";
import Image from 'next/image'
import { Camera, Phone, Computer, GamePad, HeadPhone, Watch } from "./svg/Svg";


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
    }
]


export default function CategorySec() {
    const [selected, setSelected] = useState(0);

    const handlenext = () => {
        setSelected((prev) => (prev + 1) % Category.length);
    }
    const handleprev = () => {
        setSelected((prev) =>
            prev === 0 ? Category.length - 1 : prev - 1
        );
    }
    return (
        <div className=' cursor-pointer mx-[135px] mt-[80px] flex flex-col gap-[40px] max-w-[1170px] w-full'>
            <div className=' flex   justify-between'>
                <div className=' flex flex-col gap-[24px]'>
                    <div className='flex items-center gap-[16px]'>
                        <div className=' bg-[#DB4444] w-[20px] h-[40px] rounded-[4px]'></div>
                        <h1 className=' font-[Poppins] font-[600] text-[16px] leading-[20px] text-[#DB4444]'>Categories</h1>
                    </div>
                    <h1 className='font-[Poppins] font-[600] text-[36px] leading-[48px] text-black'>Browse by Categories</h1>
                </div>
                <div className='flex gap-[8px]'>
                    <button onClick={handleprev} className='w-[46px] h-[46px] rounded-full justify-center cursor-pointer items-center flex bg-[#F5F5F5] rotate-180' ><Image src="/assets/icons/BlackRightArrow.svg" className=" " alt="" width={24} height={24} /></button>
                    <button onClick={handlenext} className='w-[46px] h-[46px] bg-[#F5F5F5]  rounded-full justify-center cursor-pointer items-center flex' ><Image src="/assets/icons/BlackRightArrow.svg" className="" alt="" width={24} height={24} /></button>
                </div>

            </div>
            <div className="flex gap-[30px] w-full">
                {Category.map((cat, index) => {
                    const isActive = index === selected;
                    return (
                        <div
                            key={index}
                            onClick={() => setSelected(index)}
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
                        </div>
                    );
                })}
            </div>

        </div>



    )
}
