import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function navbar() {
    return (
        <div className=' mt-[40px] pb-[16px] gap-[148px] flex border-b-[1px]  justify-center items-center w-full border-[#000000]/30'>
            <div className='flex gap-[190px] '><div>
                <h1 className='  font-[Poppins] font-[700] text-[24px] leading-[24px] tracking-[3%] text-black'>Exclusive</h1>
            </div>
                <div className=' flex gap-[48px]'>
                    {["Home", "Contact", "About", "Signup", "Account"].map((nav, index) => (
                        <Link key={index} href={`/Pages/${nav}`}>
                            <p className='font-[Poppins] text-black font-[400] text-[16px] leading-[24px] tracking-[0%]  cursor-pointer hover:underline'>{nav}</p>
                        </Link>
                    ))}

                </div>
            </div>
            <div className='flex gap-[24px]'>
                <div className=' py-[7px] pl-[20px] pr-[12px] flex  gap-[24px] bg-[#F5F5F5] rounded-[4px] items-center'>
                    <input type="text" placeholder='What are you looking for?' className='  w-[160px] font-[400] text-[12px] leading-[18px] tracking-[0%]  font-[Poppins] cursor-pointer ' />
                    <Image src="/assets/icons/search.svg" alt="" width={16} height={16} />
                </div>
                <div className=' flex gap-[16px]'>
                    <Link href="/Pages/wishlist"><Image src="/assets/icons/Wishlist.svg" alt="" width={32} height={32} /></Link>
                    <Link href="/Pages/Cart"><Image src="/assets/icons/cart.svg" alt="" width={32} height={32} /></Link>

                </div>
            </div>

        </div>
    )
}
