"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { User, Cart, Wishlist } from "./svg/svg";

export default function navbar({ ShowWishlist = false, ShowCart = false, ShowProfile = false, }) {
    const pathName = usePathname();
    return (
        <div className=' pt-[40px] pb-[16px]  justify-between flex border-b-[1px]    w-full px-[135px] items-center  border-[#000000]/30'>
            <div className='flex gap-[160px]  '><div>
                <h1 className='  font-[Inter] font-[700] text-[24px] leading-[24px] tracking-[3%] text-black'>Exclusive</h1>
            </div>
                <div className=' flex gap-[48px]'>
                    {["Home", "Contact", "About", "Signup"].map((nav, index) => (
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
                    {ShowWishlist && (<Link href="/Pages/wishlist"> <div className={` ${pathName === "/Pages/wishlist" ? " bg-[#DB4444] text-white" : "text-black"}  flex w-[32px] h-[32px] rounded-full px-[2px] py-[2px] `}><Wishlist /></div></Link>)}

                    {ShowCart && (<Link href="/Pages/Cart"> <Cart className={` ${pathName === "/Pages/Cart" ? " bg-[#DB4444] text-white" : "text-black"} w-[32px] h-[32px] rounded-full  flex justify-center item-center px-[2px] py-[2px]`} /></Link>)}
                    {ShowProfile && (<Link href="/Pages/Account"><User className={` ${pathName === "/Pages/Account" ? " bg-[#DB4444] text-white" : "text-black"} w-[32px] h-[32px] rounded-full  flex justify-center item-center px-[2px] py-[2px]`} /></Link>)}

                </div>
            </div>

        </div>
    )
}
