"use client";
import React from 'react'
import { useRouter } from 'next/navigation'

export default function ItemNav() {
    const router = useRouter();
    return (
        <div className=' flex gap-[12px] mt-[40px] justify-center items-center'>
            <button onClick={() => router.push('InsertItem')} className=' px-[30px] py-[10px] font-[Poppins] text-[14px] rounded-[4px] border-[1px]'> Insert Items </button>
            <button onClick={() => router.push('/viewProducts')} className=' px-[30px] py-[10px] font-[Poppins] text-[14px] rounded-[4px] border-[1px]'> View Items </button>
            <button onClick={() => router.push('/dashboard/updateitem')} className=' px-[30px] py-[10px] font-[Poppins] text-[14px] rounded-[4px] border-[1px]'> Update Items </button>
            <button onClick={() => router.push('/dashboard/deleteitem')} className=' px-[30px] py-[10px] font-[Poppins] text-[14px] rounded-[4px] border-[1px]'> Delete Items </button>
        </div>
    )
}
