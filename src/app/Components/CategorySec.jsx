import React from 'react'
import Image from 'next/image'
const Category = [
    {
        category: "Phones",
        Icon: "/assets/icons/Category-CellPhone.svg"
    }, {
        category: "Computers",
        Icon: "/assets/icons/Category-Computer.svg"
    }, {
        category: "SmartWatch",
        Icon: "/assets/icons/Category-SmartWatch.svg"
    }, {
        category: "Camera",
        Icon: "/assets/icons/Category-Camera.svg"
    }, {
        category: "HeadPhones",
        Icon: "/assets/icons/Category-Headphone.svg"
    }, {
        category: "Gaming",
        Icon: "/assets/icons/Category-Gamepad.svg"
    }
]
export default function CategorySec() {
    return (
        <div className='mx-[135px] mt-[80px] flex flex-col gap-[40px]'>
            <div className=' flex   justify-between'>
                <div className=' flex flex-col gap-[24px]'>
                    <div className='flex items-center gap-[16px]'>
                        <div className=' bg-[#DB4444] w-[20px] h-[40px] rounded-[4px]'></div>
                        <h1 className=' font-[Poppins] font-[600] text-[16px] leading-[20px] text-[#DB4444]'>Categories</h1>
                    </div>
                    <h1 className='font-[Poppins] font-[600] text-[36px] leading-[48px] text-black'>Browse by Categories</h1>
                </div>
                <div className='flex gap-[8px]'>
                    <button className='w-[46px] h-[46px] rounded-full justify-center items-center flex bg-[#F5F5F5] rotate-180' ><Image src="/assets/icons/BlackRightArrow.svg" className=" " width={24} height={24} /></button>
                    <button className='w-[46px] h-[46px] bg-[#F5F5F5]  rounded-full justify-center items-center flex' ><Image src="/assets/icons/BlackRightArrow.svg" className="" width={24} height={24} /></button>
                </div>

            </div>
            <div className=' flex gap-[30px]  w-full'>
                {Category.map((cat, index) => (<div key={index} className='min-w-[170px] w-full min-h-[145px] h-full  gap-[16px] flex flex-col justify-center items-center rounded-[4px] border-[1px] border-[#0000004D]'>
                    <Image src={cat.Icon} width={56} height={56} />
                    <h1 className='font-[Poppins] font-[400] text-[16px] leading-[24px]
                    '>{cat.category}</h1>
                </div>))}
            </div>

        </div>
    )
}
