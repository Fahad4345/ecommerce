import React from 'react'
import Image from 'next/image'

const banners = [
    {
        id: 1,
        logo: "/assets/icons/Apple.svg",
        label: "iPhone 14 Series",
        title: "Up to 10% off Voucher",




    },

]

export default function Banner() {
    return (
        <div className=' max-w-[892px] w-full max-h-[344px] mt-[40px] ml-[45px] bg-black   gap-[38px] flex overflow-hidden'>

            <div className='flex flex-col gap-[22px] ml-[64px] mt-[58px]  max-w-[294px] w-full'>
                {banners.map((data, index) => (
                    <div key={index} className=' flex flex-col gap-[20px]'>
                        <div className='flex  items-center gap-[24px]'>
                            <Image src={data.logo} width={40} height={49} />
                            <h1 className='  font-[Poppins] font-[400] text-[16px] leading-[24px] text-white'>{data.label}</h1>
                        </div>
                        <h1 className='  font-[Poppins] font-[600] text-[48px] leading-[60px] tracking-[4%] text-white'>Up to 10% off Voucher</h1>
                    </div>

                ))} <div className="group  transition duration-300 cursor-pointer ">
                    <button className=" flex  gap-[8px]">
                        <p className='text-white  font-[Poppins] font-[400] text-[16px] leading-[24px]'>Shop Now</p>
                        <Image src="/assets/icons/rightArrow.svg" className="duration-300 group-hover:translate-x-4" width={24} height={24} />
                    </button>
                    <span className="block max-w-0 group-hover:max-w-[125px] transition-all duration-500 h-0.5  bg-white"></span>
                </div>

            </div>
            <div className='pt-[16px]'>
                <Image src="/assets/images/Phone.svg" width={496} height={352} className=' w-[496px] h-[352px]' />
            </div>


        </div>
    )
}
