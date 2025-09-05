import React from 'react'
import Image from 'next/image'

const banners = [
    {
        id: 1,

        label: "Categories",
        title: "Enhance Your Music Experience",




    },

]

export default function Banner2() {
    return (
        <div className=' max-w-[1170px] w-full max-h-[500px]  mx-[135px]   bg-black mt-[140px]   gap-[27px] flex overflow-hidden'>

            <div className='flex flex-col  ml-[56px] my-[69px]   '>
                {banners.map((data, index) => (
                    <div key={index} className=' flex flex-col  max-w-[443px] w-full gap-[32px]'>
                        <div className='flex  items-center gap-[24px]'>

                            <h1 className='  font-[Poppins] font-[400] text-[16px] leading-[24px] text-[#00FF66]'>{data.label}</h1>
                        </div>
                        <h1 className='  font-[Poppins] font-[600] text-[48px] leading-[60px] tracking-[4%] text-white'>{data.title}</h1>
                    </div>

                ))}
                <div className=' flex mt-[32px]  gap-[24px]'>
                    <div className='  min-w-[62px] min-h-[62px]  bg-white  rounded-full flex flex-col  justify-center items-center'><h1 className='  font-[Poppins] font-[600] text-[16px] leading-[20px]'>23</h1> <h1 className='  font-[Poppins] font-[400] text-[11px] leading-[18px]'>Hours</h1></div>
                    <div className='  min-w-[62px] min-h-[62px] bg-white  rounded-full flex flex-col  justify-center items-center'><h1 className='  font-[Poppins] font-[600] text-[16px] leading-[20px]'>05</h1> <h1 className='  font-[Poppins] font-[400] text-[11px] leading-[18px]'>Days</h1></div>

                    <div className='   min-w-[62px] min-h-[62px] bg-white  rounded-full flex flex-col  justify-center items-center'><h1 className='  font-[Poppins] font-[600] text-[16px] leading-[20px]'>59</h1> <h1 className='  font-[Poppins] font-[400] text-[11px] leading-[18px]'>Minutes</h1></div>

                    <div className='   min-w-[62px] min-h-[62px]  bg-white  rounded-full flex flex-col  justify-center items-center'><h1 className='  font-[Poppins] font-[600] text-[16px] leading-[20px]'>35</h1> <h1 className='  font-[Poppins] font-[400] text-[11px] leading-[18px]'>Seconds</h1></div>

                </div>





                <div className="group mt-[40px]   w-fit py-[16px] px-[48px] cursor-pointer bg-[#00FF66] transition duration-300 cursor-pointer ">
                    <button className=" flex  gap-[8px]">
                        <p className='text-white  font-[Poppins] font-[400] text-[16px] leading-[24px]'>Buy Now!</p>

                    </button>
                    <span className="block max-w-0 group-hover:max-w-[125px] transition-all duration-500 h-0.5  bg-white"></span>
                </div>

            </div>
            <div className="relative pt-[37px] pb-[43px]">
                <div className="absolute w-[504px] h-[500px] left-[26px] top-0 bg-[#D9D9D9] opacity-30 blur-[100px] rounded-full z-0"></div>

                <div className="relative z-50">
                    <Image
                        alt=""
                        src="/assets/images/headphone.png"
                        width={600}
                        height={420}
                    />
                </div>
            </div>



        </div>
    )
}
