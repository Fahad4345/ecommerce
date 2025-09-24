import React from 'react'
import Link from 'next/link'

export default function page() {
    return (
        <div className=' flex flex-col justify-center items-center mt-[140px]'>
            <h1 className='font-[Inter] font-[500] text-[110px] leading-[115px] tracking-[3%] text-red-500'>Payment Not Sucsesfull!</h1>
            <Link href="/checkout"> <button className=' rounded-[4px]font-[Poppins] font-[500] text-[16px] leading-[24px] tracking-[0%] text-white bg-[#DB4444] px-[48px] py-[16px] mt-[80px] '>Try Again</button></Link>
        </div>
    )
}
