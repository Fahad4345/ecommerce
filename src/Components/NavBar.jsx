"use client"
import React, { useState, useEffect, useRef, useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { User, Cart, Wishlist } from "./svg/Svg";
import ProfileMenu from '../Components/MenuPopup'
import { MyContext } from "../context/MyContext";
import { fetchWithAuth } from '../Api1/fetchWithAuth'

export default function Navbar({ ShowWishlist = false, ShowCart = false, ShowProfile = false }) {
    const { cartLength, user, WishlistLength } = useContext(MyContext);
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const router = useRouter();

    const menuRef = useRef(null);
    const searchRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const pathName = usePathname();


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
            // if (searchRef.current && !searchRef.current.contains(event.target)) {
            //     setIsDropdownVisible(false);
            // }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const nav = [
        { name: "home", href: "/home" },
        { name: "contact", href: "/contact" },
        { name: "about", href: "/about" },
        { name: "signup", href: "/signup" },
    ];

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (searchQuery.trim().length < 2) {
                setSuggestions([]);
                return;
            }

            try {
                const res = await fetchWithAuth(`/item/SearchItem/?search=${encodeURIComponent(searchQuery)}`, { method: "GET", noAuth: true });
                const data = await res.json();
                setSuggestions(data.items || []);
                setIsDropdownVisible(true);
            } catch (err) {
                console.error("Search fetch error:", err);
            }
        };

        const debounce = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(debounce);
    }, [searchQuery]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/allProduct?search=${encodeURIComponent(searchQuery.trim())}`);
            setIsDropdownVisible(false);
        }
    };

    const handleSelect = (item) => {
        setSearchQuery(item.name);
        setIsDropdownVisible(false);
        router.push(`/productDetail/${item._id}`);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSearch(e);
    };

    return (
        <div className='border-b-[1px] border-[#000000]/30 w-full flex justify-center items-center'>
            <div className='pt-[40px] pb-[16px] justify-between flex max-w-[1440px] w-full px-[135px] items-center'>
                <div className='flex gap-[160px]'>
                    <Link href="/">
                        <h1 className='cursor-pointer font-[Inter] font-[700] text-[24px] leading-[24px] tracking-[3%] text-black'>
                            Exclusive
                        </h1>
                    </Link>

                    <div className='flex gap-[48px]'>
                        {nav.map((navs, index) => {
                            if (user && navs.name === "signup") return null;
                            const isActive = pathName === navs.href;
                            return (
                                <Link key={index} href={navs.href}>
                                    <div className="group cursor-pointer transition duration-300">
                                        <p className={`capitalize font-[Poppins] text-[16px] leading-[24px] border-b-[2px] ${isActive ? "border-black" : "border-transparent"}`}>
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
                    <div ref={searchRef} className='relative'>
                        <form onSubmit={handleSearch} className='py-[7px] pl-[20px] pr-[12px] flex gap-[24px] bg-[#F5F5F5] rounded-[4px] items-center'>
                            <input
                                type="text"
                                placeholder='What are you looking for?'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyPress={handleKeyPress}
                                className='w-[180px] font-[400] text-[12px] leading-[18px] font-[Poppins] bg-transparent focus:outline-none'
                            />
                            <button type="submit" className="cursor-pointer">
                                <Image src="/assets/icons/search.svg" alt="Search" width={16} height={16} />
                            </button>
                        </form>


                        {isDropdownVisible && suggestions.length > 0 && (
                            <div className="absolute top-[34px] left-0 w-full bg-white border border-gray-200 rounded-[4px] shadow-md z-50 max-h-[250px] overflow-y-auto">
                                {suggestions.map((item, i) => (
                                    <div
                                        key={i}
                                        onClick={() => handleSelect(item)}
                                        className="px-3 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-100"
                                    >
                                        <Image
                                            src={item.image || "/assets/placeholder.png"}
                                            alt={item.name}
                                            width={30}
                                            height={30}
                                            className="rounded-[4px] object-cover"
                                        />
                                        <div className=' w-full flex flex-row gap-[12px] justify-between'>
                                            <div className="flex flex-col">
                                                <p className="text-[13px] font-[Poppins] font-[500] leading-[18px] truncate">{item.name}</p>

                                            </div>
                                            <div><p className=" text-[12px] text-gray-500"> {item.price}$</p></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* ❤️ Wishlist, 🛒 Cart, 👤 Profile */}
                    <div className='flex gap-[16px] justify-center items-center'>
                        {ShowWishlist && user && (
                            <Link href="/wishlist">
                                <div className={`${pathName === "/wishlist" ? "bg-[#DB4444] text-white" : "text-black"} relative flex justify-center items-center rounded-full px-[2px] py-[2px]`}>
                                    <Wishlist />
                                    {pathName !== "/wishlist" && WishlistLength > 0 && (
                                        <div className='text-white text-[12px] absolute top-[-3px] left-[19px] w-[16px] h-[17px] rounded-full flex justify-center items-center bg-[#DB4444]'>
                                            {WishlistLength}
                                        </div>
                                    )}
                                </div>
                            </Link>
                        )}

                        {ShowCart && user && (
                            <Link href="/cart">
                                <div className='relative'>
                                    <Cart className={`${pathName === "/cart" ? "bg-[#DB4444] text-white" : "text-black"} w-[32px] h-[32px] rounded-full flex justify-center items-center px-[2px] py-[2px]`} />
                                    {pathName !== "/cart" && cartLength > 0 && (
                                        <div className='text-white text-[12px] absolute left-[18px] top-[-4px] w-[16px] h-[17px] rounded-full flex justify-center items-center bg-[#DB4444]'>
                                            {cartLength}
                                        </div>
                                    )}
                                </div>
                            </Link>
                        )}

                        {ShowProfile && user && (
                            <div ref={menuRef} className='relative' onClick={() => setIsOpen(true)}>
                                <User className={`${pathName === "/account" ? "bg-[#DB4444] text-white" : "text-black"} w-[32px] h-[32px] rounded-full flex justify-center items-center px-[2px] py-[2px] cursor-pointer`} />
                                {isOpen && <ProfileMenu closeMenu={() => setIsOpen(false)} />}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
