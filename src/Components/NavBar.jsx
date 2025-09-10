"use client"
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { User, Cart, Wishlist } from "./svg/Svg";
import ProfileMenu from '../Components/MenuPopup'


export default function navbar({ ShowWishlist = false, ShowCart = false, ShowProfile = false, }) {

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const nav = [
        { name: "home", href: "/home" },
        { name: "contact", href: "/contact" },
        { name: "about", href: "/about" },
        { name: "signup", href: "/signup" },
    ];
    const [selectednav, setSelectedNav] = useState("");
    const pathName = usePathname();
    return (
        <div className=' border-b-[1px]  border-[#000000]/30 w-full flex justify-center items-center'>
            <div className=' pt-[40px] pb-[16px]  justify-between flex     max-w-[1440px] w-full px-[135px] items-center '>
                <div className='flex gap-[160px]   '><div>
                    <h1 className='  font-[Inter] font-[700] text-[24px] leading-[24px] tracking-[3%] text-black'>Exclusive</h1>
                </div>
                    <div className=' flex gap-[48px]'>
                        {nav.map((navs, index) => (
                            <Link key={index} href={navs.href}>
                                <span
                                    onClick={() => setSelectedNav(navs)}
                                    className={`cursor-pointer capitalize pb-1 
                                  ${pathName === navs.href ? "border-b-2 border-black " : "border-b-2 border-transparent"}
                                    `}
                                >
                                    {navs.name}
                                </span>
                            </Link>
                        ))}

                    </div>
                </div>
                <div className='flex gap-[24px]'>
                    <div className=' py-[7px] pl-[20px] pr-[12px] flex  gap-[24px] bg-[#F5F5F5] rounded-[4px] items-center'>
                        <input type="text" placeholder='What are you looking for?' className='  w-[160px] font-[400] text-[12px] leading-[18px] tracking-[0%]  font-[Poppins] cursor-pointer  focus:outline-none focus:ring-0 focus:border-transparent' />
                        <Image src="/assets/icons/search.svg" alt="" width={16} height={16} />
                    </div>
                    <div className=' flex gap-[16px]'>
                        {ShowWishlist && (<Link href="/wishlist"> <div className={` ${pathName === "/wishlist" ? " bg-[#DB4444] text-white" : "text-black"}  flex w-[32px] h-[32px] rounded-full px-[2px] py-[2px] `}><Wishlist /></div></Link>)}

                        {ShowCart && (<Link href="/cart"> <Cart className={` ${pathName === "/cart" ? " bg-[#DB4444] text-white" : "text-black"} w-[32px] h-[32px] rounded-full  flex justify-center item-center px-[2px] py-[2px]`} /></Link>)}
                        {ShowProfile && (<div ref={menuRef} className='relative' onClick={() => { setIsOpen(true); console.log(isOpen) }} ><User className={` ${pathName === "/account" ? " bg-[#DB4444] text-white" : "text-black"}  relative w-[32px] h-[32px] rounded-full  flex justify-center item-center px-[2px] py-[2px] cursor-pointer`} />{isOpen && <ProfileMenu closeMenu={() => setIsOpen(false)} />}</div>)}

                    </div>
                </div>

            </div>

        </div>
    )
}
