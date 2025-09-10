import React from 'react'
import Image from 'next/image'
const featureSec = [
    {
        icon: "/assets/icons/icon-delivery.svg",
        title: "FREE AND FAST DELIVERY",
        desc: "Free delivery for all orders over $140"

    },
    {
        icon: "/assets/icons/Icon-Customer service.svg",
        title: "24/7 CUSTOMER SERVICE",
        desc: "Friendly 24/7 customer support"

    }, {
        icon: "/assets/icons/Icon-secure.svg",
        title: "MONEY BACK GUARANTEE",
        desc: "We reurn money within 30 days"

    }
]

export default function FeatureSec() {
    return (
        <div className=' flex gap-[88px]  mt-[140px] mx-[114px]'>
            {featureSec.map((feature, index) => (
                <div key={index} className=' flex flex-col justify-center items-center gap-[24px] '>
                    <div className=' w-[80px] h-[80px]  bg-[#2F2E30]/30 rounded-full p-[11px] flex '> <div className='w-[58px]  h-[58px] flex bg-black cursor-pointer justify-center items-center rounded-full'> <Image src={feature.icon} width={40} height={40} alt={feature.title} /></div></div>
                    <div className='flex flex-col gap-[8px]'>
                        <h1 className='  font-[Poppins] font-[600] text-[20px] leading-[28px]'>{feature.title}</h1>
                        <h1 className='  font-[Poppins] font-[400] text-[14px] leading-[21px]'>{feature.desc}</h1>
                    </div>
                </div>
            ))}
        </div>
    )
}



