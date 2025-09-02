import React from 'react'

export default function Header() {
    return (
        <div className=' bg-[#000000]  flex  flex-row gap-[231px]  py-[12px] pl-[445px] max-h-[48px]'>
            <div className=' flex items-center  gap-[8px]'>
                <p className='  font-[Poppins] font-[400] text-[14px] leading-[21px] text-white'>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!</p>
                <span className=' font-[600] font-[Poppins] text-[14px] leadaing-[24px] underline cursor-pointer text-white'>ShopNow</span>
            </div>

            <div className="">
                <select

                    name="sortBy"
                    id="sortBy"
                    className="  text-white font-[400] font-[Poppins] text-[14px] leading-[21px] cursor-pointer"
                >
                    {" "}
                    <option value="Sortby">English</option>
                    <option value="Alphabet">Chineese</option>

                </select>
            </div>
        </div>


    )
}
