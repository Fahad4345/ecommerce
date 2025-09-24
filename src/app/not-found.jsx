import React from 'react'
import NavBar from '../Components/NavBar'
import Link from 'next/link'

export default function Notfound() {
    return (
        <div className='flex flex-col justify-center items-center'>
            <NavBar ShowCart={true} ShowProfile={true} ShowWishlist={true} />
            <div className=' flex flex-col justify-center items-center mt-[140px]'>
                <h1 className='font-[Inter] font-[500] text-[110px] leading-[115px] tracking-[3%] text-[#000000]'>404 Not Found</h1>
                <h1 className='font-[Inter] font-[400] text-[16px] leading-[24px] tracking-[0%] text-[#000000] mt-[40px]'>Your visited page not found. You may go home page.</h1>
                <Link href="/home"><button className=' rounded-[4px] font-[Poppins] font-[500] text-[16px] leading-[24px] tracking-[0%] text-white bg-[#DB4444] px-[48px] py-[16px] mt-[80px] '> Back to home page</button>
                </Link></div>

        </div >
    )
}
