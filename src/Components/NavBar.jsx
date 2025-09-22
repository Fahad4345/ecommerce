"use client"
import React, { useState, useEffect, useRef, useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { User, Cart, Wishlist } from "./svg/Svg";
import ProfileMenu from '../Components/MenuPopup'
import { MyContext } from "../context/MyContext";

export default function navbar({ ShowWishlist = false, ShowCart = false, ShowProfile = false }) {
    const { cartLength, user, WishlistLength } = useContext(MyContext);
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

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

    const pathName = usePathname();


    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {

            router.push(`/allProduct?search=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch(e);
        }
    };

    return (
        <div className='border-b-[1px] border-[#000000]/30 w-full flex justify-center items-center'>
            <div className='pt-[40px] pb-[16px] justify-between flex max-w-[1440px] w-full px-[135px] items-center'>
                <div className='flex gap-[160px]'>
                    <div>
                        <h1 className='font-[Inter] font-[700] text-[24px] leading-[24px] tracking-[3%] text-black'>Exclusive</h1>
                    </div>
                    <div className='flex gap-[48px]'>
                        {nav.map((navs, index) => {
                            if (user && navs.name === "signup") return null;

                            const isActive = pathName === navs.href;

                            return (
                                <Link key={index} href={navs.href}>
                                    <div className="group cursor-pointer transition duration-300">
                                        <p className={`capitalize border-b-[2px] ${isActive ? "border-black" : "border-transparent"}`}>
                                            {navs.name}
                                        </p>
                                        {!isActive && (
                                            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-[2px] bg-black"></span>
                                        )}
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                <div className='flex gap-[24px]'>
                    <form onSubmit={handleSearch} className='py-[7px] pl-[20px] pr-[12px] flex gap-[24px] bg-[#F5F5F5] rounded-[4px] items-center'>
                        <input
                            type="text"
                            placeholder='What are you looking for?'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className='w-[160px] font-[400] text-[12px] leading-[18px] tracking-[0%] font-[Poppins] cursor-pointer focus:outline-none focus:ring-0 focus:border-transparent bg-transparent'
                        />
                        <button type="submit" className="cursor-pointer">
                            <Image src="/assets/icons/search.svg" alt="Search" width={16} height={16} />
                        </button>
                    </form>

                    <div className='flex gap-[16px]'>
                        {ShowWishlist && (
                            <Link href="/wishlist">
                                <div className={`${pathName === "/wishlist" ? "bg-[#DB4444] text-white" : "text-black"} relative flex w-[32px] h-[32px] rounded-full px-[2px] py-[2px]`}>
                                    <Wishlist />
                                    {pathName !== "/wishlist" && WishlistLength > 0 && (
                                        <div className='text-white font-[400] text-[12px] leading-[18px] font-[Poppins] absolute left-[15px] w-[16px] h-[17px] rounded-full flex justify-center items-center bg-[#DB4444]'>
                                            {WishlistLength}
                                        </div>
                                    )}
                                </div>
                            </Link>
                        )}

                        {ShowCart && (
                            <Link href="/cart">
                                <div className='relative'>
                                    <Cart className={`${pathName === "/cart" ? "bg-[#DB4444] text-white" : "text-black"} w-[32px] h-[32px] rounded-full flex justify-center item-center px-[2px] py-[2px]`} />
                                    {pathName !== "/cart" && cartLength > 0 && (
                                        <div className='text-white font-[400] text-[12px] leading-[18px] font-[Poppins] absolute left-[18px] top-[-4px] w-[16px] h-[17px] rounded-full flex justify-center items-center bg-[#DB4444]'>
                                            {cartLength}
                                        </div>
                                    )}
                                </div>
                            </Link>
                        )}

                        {ShowProfile && (
                            <div ref={menuRef} className='relative' onClick={() => setIsOpen(true)}>
                                <User className={`${pathName === "/account" ? "bg-[#DB4444] text-white" : "text-black"} w-[32px] h-[32px] rounded-full flex justify-center item-center px-[2px] py-[2px] cursor-pointer`} />
                                {isOpen && <ProfileMenu closeMenu={() => setIsOpen(false)} />}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}