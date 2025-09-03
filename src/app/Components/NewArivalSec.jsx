import React from 'react'
import Image from 'next/image'

export default function NewArivalSec() {
    return (
        <div className=' mx-[135px]'>
            <div className=' flex  w-full  justify-between'>
                <div className=' flex flex-col gap-[24px]'>
                    <div className='flex items-center gap-[16px]'>
                        <div className=' bg-[#DB4444] w-[20px] h-[40px] rounded-[4px]'></div>
                        <h1 className=' font-[Poppins] font-[600] text-[16px] leading-[20px] text-[#DB4444]'>Featured</h1>
                    </div>
                    <h1 className='font-[Poppins] font-[600] text-[36px] leading-[48px] tracking-[4%] text-black'>New Arrival</h1>
                </div>


            </div>
            <div className=' flex flex-row gap-[30px] mt-[60px]'>
                <div className='relative w-[570px] h-[600px] bg-black '>
                    <Image src="/assets/images/Playstation.png" alt="" width={511} height={511} className=' left-[29px] absolute bottom-[0px]' />
                    <div className='  flex flex-col gap-[22px] ml-[32px]   max-w-[242px] w-full'>

                        <div className=' z-50 flex flex-col  mt-[446px] gap-[16px]'>
                            <div className='flex  items-center gap-[24px]'>

                                <h1 className='  font-[Poppins] font-[600] text-[24px] leading-[24px] tracking-[3%] text-white'>PlayStation 5</h1>
                            </div>
                            <h1 className='  font-[Poppins] font-[400] text-[14px] leading-[21px] tracking-[0%] text-white'>Black and White version of the PS5 coming out on sale.</h1>

                            <div className="group  transition duration-300 cursor-pointer ">
                                <button className=" flex  gap-[8px]">
                                    <p className='text-white  font-[Poppins] font-[500] text-[16px] leading-[24px]'>Shop Now</p>
                                    <Image src="/assets/icons/rightArrow.svg" alt="" className="duration-300 group-hover:translate-x-4" width={24} height={24} />
                                </button>
                                <span className="block max-w-0 group-hover:max-w-[125px] transition-all duration-500 h-0.5  bg-white"></span>
                            </div>



                        </div>


                    </div>
                </div>
                <div className='flex flex-col gap-[32px]'>
                    <div> <div className='relative w-[570px] h-[286px] bg-[#0D0D0D] z-50 '>
                        <Image src="/assets/images/women.jpg" alt="" width={432} height={286} className='  right-[0px] absolute bottom-[0px]' />
                        <div className='  flex flex-col  ml-[24px] max-w-[257.7px] w-full'>

                            <div className=' z-50 flex flex-col  mb-[26px] mt-[138px] gap-[16px]'>
                                <div className='flex  items-center gap-[24px]'>

                                    <h1 className='  font-[Poppins] font-[600] text-[24px] leading-[24px] tracking-[3%] text-white'>Women’s Collections</h1>
                                </div>
                                <h1 className='  font-[Poppins] font-[400] text-[14px] leading-[21px] tracking-[0%] text-white'>Featured woman collections that give you another vibe.</h1>

                                <div className="group  transition duration-300 cursor-pointer ">
                                    <button className=" flex  gap-[8px]">
                                        <p className='text-white  font-[Poppins] font-[500] text-[16px] leading-[24px]'>Shop Now</p>
                                        <Image src="/assets/icons/rightArrow.svg" alt="" className="duration-300 group-hover:translate-x-4" width={24} height={24} />
                                    </button>
                                    <span className="block max-w-0 group-hover:max-w-[125px] transition-all duration-500 h-0.5  bg-white"></span>
                                </div>



                            </div>


                        </div>
                    </div></div>
                    <div className=' flex gap-[30px]'>
                        <div> <div className='relative w-[270px] h-[284px] bg-black '>
                            <Image src="/assets/images/cell.png" alt="" width={190} height={221} className=' z-50 left-[40px] absolute bottom-[32px]' />
                            <div className='  flex flex-col gap-[8px] ml-[24px]  max-w-[242px] w-full'>

                                <div className=' z-50 flex flex-col  mt-[175px] gap-[8px]'>
                                    <div className='flex  items-center gap-[24px]'>

                                        <h1 className='  font-[Poppins] font-[600] text-[24px] leading-[24px] tracking-[3%] text-white'>Speakers</h1>
                                    </div>
                                    <h1 className='  font-[Poppins] font-[400] text-[14px] leading-[21px] tracking-[0%] text-white'>Amazon wireless speakers</h1>

                                    <div className="group  transition duration-300 cursor-pointer ">
                                        <button className=" flex  gap-[8px]">
                                            <p className='text-white  font-[Poppins] font-[500] text-[16px] leading-[24px]'>Shop Now</p>
                                            <Image src="/assets/icons/rightArrow.svg" alt="" className="duration-300 group-hover:translate-x-4" width={24} height={24} />
                                        </button>
                                        <span className="block max-w-0 group-hover:max-w-[125px] transition-all duration-500 h-0.5  bg-white"></span>
                                    </div>



                                </div>


                            </div>
                            <div className=" z-20 absolute w-[196px] h-[196px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[rgba(217,217,217,0.9)] blur-[150px] rounded-full"></div>

                        </div></div>
                        <div> <div className='relative w-[270px] h-[284px] bg-[#000000] '>


                            <Image src="/assets/images/perfume.png" alt="" width={201} height={203} className='   z-30 left-[34px] absolute bottom-[43px] ' />
                            <div className='  flex flex-col gap-[22px]  max-w-[242px] w-full'>

                                <div className='  z-50 flex flex-col ml-[24px]  mt-[175px] gap-[8px]'>
                                    <div className='flex  items-center gap-[24px]'>

                                        <h1 className='  font-[Poppins] font-[600] text-[24px] leading-[24px] tracking-[3%] text-white'>Perfume</h1>
                                    </div>
                                    <h1 className='  font-[Poppins] font-[400] text-[14px] leading-[21px] tracking-[0%] text-white'>GUCCI INTENSE OUD EDP</h1>

                                    <div className="group  transition duration-300 cursor-pointer ">
                                        <button className=" flex  gap-[8px]">
                                            <p className='text-white  font-[Poppins] font-[500] text-[16px] leading-[24px]'>Shop Now</p>
                                            <Image src="/assets/icons/rightArrow.svg" alt="" className="duration-300 group-hover:translate-x-4" width={24} height={24} />
                                        </button>
                                        <span className="block max-w-0 group-hover:max-w-[125px] transition-all duration-500 h-0.5  bg-white"></span>
                                    </div>



                                </div>

                            </div>
                            <div className="absolute w-[238px] h-[238px] left-[16px] top-[16px] bg-[rgba(217,217,217,0.9)] blur-[150px]   rounded-full"></div>

                        </div>
                        </div>

                    </div>


                </div>
            </div>
        </div>

    )
}
