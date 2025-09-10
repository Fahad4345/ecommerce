"use client"
import React, { useState } from 'react'

import FeatureSec from '../../Components/FeatureSec'
import Image from 'next/image'
import Navbar from "../../Components/NavBar";
import "swiper/css";
import "swiper/css/navigation";

import { Shop, Bag, MoneyBag, Sale, Twitter, Insta, LinkedIn } from "../../Components/svg/Svg";


const employees = [
    {
        name: "Tom Criuse",
        position: "Founder & Chairman",
        image: "/assets/images/TomCruise.png",
        className: " w-[236px] h-[391px]"
    },
    {
        name: "Emma Watson",
        position: "Managing Director",
        image: "/assets/images/EmmaWatson.png",
        className: " w-[294px] h-[397px]"
    },
    {
        name: "Will Smith",
        position: "Product Designer",
        image: "/assets/images/WillSmith.png",
        className: " w-[326px] h-[392px]"
    },
]
const featureSec = [
    {
        icon: Shop,
        title: "10.5k ",
        desc: "Sallers active our site"

    },
    {
        icon: Sale,
        title: "33k",
        desc: "Mopnthly Produduct Sale"

    }, {
        icon: Bag,
        title: "45.5k",
        desc: "Customer active in our site"

    }, {
        icon: MoneyBag,
        title: "25k",
        desc: "Anual gross sale in our site"

    }
]
export default function About() {
    const [selected, setSelected] = useState(0);
    return (
        <div className=' bg-white h-full flex justify-center items-center flex-col'>
            <Navbar ShowCart={true} ShowProfile={true} ShowWishlist={true} />

            <div>
                <div className='  justify-center items-center flex flex-row gap-[75px]  mt-[42px]'>
                    <div className=' flex flex-col gap-[40px] ml-[135px] max-w-[525px] w-full'>
                        <h1 className=' font-[Inter] font-[600] text-[54px] leading-[64px] tracking-[6%]'>Our Story</h1>
                        <div>
                            <h1 className='font-[Poppins] font-[400] text-[16px] leading-[26px] tracking-[0%]'>Launced in 2015, Exclusive is South Asia’s premier online shopping makterplace with an active presense in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region. </h1>
                            <h1 className=' font-[Poppins] font-[400] max-w-[505px] text-[16px] leading-[26px] tracking-[0%] mt-[24px]'>Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assotment in categories ranging  from consumer.</h1>
                        </div>
                    </div>
                    <div className=''><Image src="/assets/images/AboutImage.png" width={705} height={609} alt="" /></div>

                </div>


            </div>

            <div className=' flex gap-[30px] mx-[135px] mt-[140px] max-w-[1170px]'>
                {featureSec.map((feature, index) => {
                    const isActive = index === selected
                    return (
                        <div key={index} onClick={() => setSelected(index)} className={` flex flex-col justify-center  border-[1px]  border-[#0000004D]  rounded-[4px] items-center gap-[24px] min-w-[270px] min-h-[230px] transition
                            ${isActive
                                ? "bg-[#DB4444] text-white border-[#DB4444]"
                                : "bg-white text-black border-[#0000004D]"
                            }}`}>
                            <div className=' w-[80px] h-[80px]  bg-[#2F2E30]/30 rounded-full p-[11px] flex '> <div className={`w-[58px]  h-[58px] flex  justify-center items-center rounded-full ${isActive ? " bg-white text-black" : "bg-black text-white"}`}> <feature.icon /></div></div>
                            <div className='flex justify-center items-center flex-col gap-[8px]'>
                                <h1 className='  font-[Poppins] font-[700] text-[32px] leading-[30px] tracking-[4%]'>{feature.title}</h1>
                                <h1 className='  font-[Poppins] font-[400] text-[16px] leading-[24px]'>{feature.desc}</h1>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className=' gap-[30px] flex mt-[140px] '>
                {employees.map((emp, index) => {
                    return (
                        <div key={index} className='  rounded-[4px] min-w-[370px]  max-h-[564px] h-full w-full flex flex-col  gap-[32px]'>
                            <div className=' bg-[#F5F5F5]  min-h-[430px] h-full w-full items-end flex justify-center' >
                                <Image src={emp.image} width={326} height={392} alt={emp.name} className={emp.className} />
                            </div>
                            <div className=' flex flex-col gap-[16px]'>
                                <div className=' flex flex-col gap-[8px] '>
                                    <h2 className=' font-[Poppins] font-[500] text-[32px] leading-[30px] tracking-[4%]'>{emp.name}</h2>
                                    <p className=' font-[Poppins] font-[400] text-[16px] leading-[24px]'>{emp.position}</p>
                                </div>
                                <div className=' flex  gap-[16px] '>
                                    <Twitter />
                                    <Insta />
                                    <LinkedIn />

                                </div>
                            </div>

                        </div>
                    )
                })}
            </div>
            <FeatureSec />


        </div>
    )
}
