"use client"
import React from 'react'
import { useContext, useEffect, useState } from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation'

export default function AdminNavBar() {
    const pathName = usePathname();
    const nav = [
        { name: "Items", href: "/admin/dashboard/viewProducts" },
        { name: "View Orders", href: "/admin/dashboard/adminOrder" },
        { name: "View Users", href: "/admin/dashboard/adminUser" },
    ]
    return (

        <div className='border-b-[1px] border-[#000000]/30 w-full  flex justify-center items-center'>
            <div className='pt-[40px] pb-[16px] justify-between flex max-w-[1440px] w-full px-[135px] items-center'>
                <div className='flex gap-[160px]'>
                    <Link href="/">
                        <div>
                            <h1 className=' cursor-pointer font-[Inter] font-[700] text-[24px] leading-[24px] tracking-[3%] text-black'>Exclusive</h1>
                        </div></Link>
                    <div className='flex gap-[48px]'>
                        {nav.map((navs, index) => {


                            const isActive = pathName === navs.href;

                            return (
                                <Link key={index} href={navs.href}>
                                    <div className="group cursor-pointer transition duration-300">
                                        <p className={`capitalize  font-[Poppins]  font-[400]  text-[16px] leading-[24px] border-b-[2px] ${isActive ? "border-black" : "border-transparent"}`}>
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


            </div>
        </div>

    )
}
