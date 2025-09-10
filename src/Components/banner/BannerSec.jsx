import React from 'react'
import Banner from './Banner'

const Categories = ["Woman’s Fashion", "Men’s Fashion", "Electronics", "Home & Lifestyle", "Medicine", "Sports & Outdoor", "Baby’s & Toys", "Groceries & Pets", "Health & Beauty",]



export default function BannerSec() {


    return (
        <div className=' flex  min-w-[1170px] '>
            <div className='max-w-[217px] w-full flex flex-col mr-[16px]  mt-[40px] gap-[16px]'>
                {Categories.map((cat, index) => (
                    <div key={index} className='cursor-pointer' >
                        <h1 className='font-[Poppins] font-[400] text-[16px] leading-[24px] '>{cat}</h1>

                    </div>

                ))}
            </div>
            <div className='  h-[384px] border-l-[0.2px] border-[#000000]/30'></div>
            <Banner />

        </div>
    )
}
