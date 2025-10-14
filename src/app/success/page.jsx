"use client";
import { useEffect } from 'react'
import Link from 'next/link'

export default function page() {
    useEffect(() => {
        localStorage.removeItem("CartItems");
        localStorage.removeItem("CartLength");
    }, []);
    return (<>
        <Navbar ShowCart={true} ShowProfile={true} ShowWishlist={true} />
        <div className=' flex flex-col justify-center items-center mt-[140px]'>
            <h1 className='font-[Inter] font-[500] text-[110px] leading-[115px] tracking-[3%] text-green-500'>Payment Sucsesfull!</h1>
            <Link href="/"> <button className=' rounded-[4px]font-[Poppins] font-[500] text-[16px] leading-[24px] tracking-[0%] text-white bg-[#DB4444] px-[48px] py-[16px] mt-[80px] '>Go to Home Page</button></Link>
        </div></>)

}
