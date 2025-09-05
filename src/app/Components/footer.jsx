import React from 'react'
import Image from 'next/image'

export default function Footer() {
    return (
        <div className=' relative w-full flex flex-col gap-[60px] min-h-[440px] mt-[140px] h-full bg-black'>
            <button className='w-[46px] h-[46px] absolute top-[-80px] right-[89px] rounded-full justify-center items-center flex bg-[#F5F5F5] rotate-270' ><Image src="/assets/icons/BlackRightArrow.svg" className=" " alt="" width={24} height={24} /></button>
            <div className='gap-[87px] flex pt-[80px] px-[135px] '>
                <div className='flex flex-col gap-[16px]'>
                    <h1 className=' text-[#FAFAFA] font-[Poppins] font-[700] text-[24px] leading-[24px] tracking-[3%] cursor-pointer'>Exclusive</h1>
                    <h1 className=' text-[#FAFAFA] font-[Poppins] font-[500] text-[20px] leading-[28px] tracking-[0%] cursor-pointer'>Subscribe</h1>
                    <h1 className=' text-[#FAFAFA] font-[Poppins] font-[400] text-[16px] leading-[24px] tracking-[0%] cursor-pointer'>Get 10% off your first order</h1>
                    <div className='   border-[1.5px] border-[#FAFAFA] rounded-[4px]  flex w-[217px] min-h-[48px] py-[12px] px-[16px] cursor-pointer gap-[32px] '>
                        <input type="email" placeholder="Enter your email" className='font-[Poppins]  max-w-[130px] font-[400] text-[16px] leading-[24px] cursor-pointer text-[#FAFAFA]' />
                        <Image src="/assets/icons/icon-send.svg" alt="" width={24} height={24} />
                    </div>
                </div>
                <div className='flex flex-col gap-[16px] w-[175px]'>
                    <h1 className=' text-[#FAFAFA] font-[Poppins] font-[500] text-[20px] leading-[28px] tracking-[0%] cursor-pointer'>Support</h1>
                    <h1 className=' text-[#FAFAFA] font-[Poppins] font-[400] text-[16px] leading-[24px] tracking-[0%] cursor-pointer'>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</h1>
                    <h1 className=' text-[#FAFAFA] font-[Poppins] font-[400] text-[16px] leading-[24px] tracking-[0%] cursor-pointer'>exclusive@gmail.com</h1>
                    <h1 className=' text-[#FAFAFA] font-[Poppins] font-[400] text-[16px] leading-[24px] tracking-[0%] cursor-pointer'>+88015-88888-9999</h1>

                </div>

                <div className='flex flex-col gap-[16px] min-w-[123px]'>
                    <h1 className=' text-[#FAFAFA] font-[Poppins] font-[500] text-[20px] leading-[28px] tracking-[0%] cursor-pointer'>Account</h1>
                    <h1 className=' text-[#FAFAFA] font-[Poppins] font-[400] text-[16px] leading-[24px] tracking-[0%] cursor-pointer'>My Account</h1>
                    <h1 className=' text-[#FAFAFA] font-[Poppins] font-[400] text-[16px] leading-[24px] tracking-[0%] cursor-pointer'>Login / Register</h1>
                    <h1 className=' text-[#FAFAFA] font-[Poppins] font-[400] text-[16px] leading-[24px] tracking-[0%] cursor-pointer'>Cart</h1>
                    <h1 className=' text-[#FAFAFA] font-[Poppins] font-[400] text-[16px] leading-[24px] tracking-[0%] cursor-pointer'>Wishlist</h1>
                    <h1 className=' text-[#FAFAFA] font-[Poppins] font-[400] text-[16px] leading-[24px] tracking-[0%] cursor-pointer'>Shop</h1>
                </div>
                <div className='flex flex-col gap-[16px] min-w-[109px]'>
                    <h1 className=' text-[#FAFAFA] font-[Poppins] font-[500] text-[20px] leading-[28px] tracking-[0%] cursor-pointer'>Quick Link</h1>
                    <h1 className=' text-[#FAFAFA] font-[Poppins] font-[400] text-[16px] leading-[24px] tracking-[0%] cursor-pointer'>Privacy Policy</h1>
                    <h1 className=' text-[#FAFAFA] font-[Poppins] font-[400] text-[16px] leading-[24px] tracking-[0%] cursor-pointer'>Terms Of Use</h1>
                    <h1 className=' text-[#FAFAFA] font-[Poppins] font-[400] text-[16px] leading-[24px] tracking-[0%] cursor-pointer'>FAQ</h1>
                    <h1 className=' text-[#FAFAFA] font-[Poppins] font-[400] text-[16px] leading-[24px] tracking-[0%] cursor-pointer'>Contact</h1>

                </div>
                <div className='flex flex-col gap-[24px] min-w-[198px]'>
                    <div className='flex flex-col gap-[16px] '>
                        <h1 className=' text-[#FAFAFA] font-[Poppins] font-[500] text-[20px] leading-[28px] tracking-[0%] cursor-pointer'>Download App</h1>
                        <h1 className=' text-[#FAFAFA] font-[Poppins] font-[500] text-[12px] leading-[18px] tracking-[0%] cursor-pointer'>Save $3 with App New User Only</h1>
                        <div className=' flex gap-[8px] '>
                            <Image src="/assets/icons/Qrcode.svg" width={76} height={76} alt="App Store" className=' cursor-pointer' />
                            <div className=' flex flex-col gap-[4px]'>
                                <Image src="/assets/icons/GooglePlay.svg" width={104} height={34} alt="App Store" className=' cursor-pointer' />
                                <Image src="/assets/icons/Appstore.svg" width={104} height={34} alt="App Store" className=' cursor-pointer' />

                            </div>
                        </div>
                    </div>



                </div>

            </div>
            <div className=' flex justify-center items-center'>
                <div className='  flex  gap-[6px] opacity-[60%]'>
                    <Image src="/assets/icons/icon-copyright.png" width={20} height={20} alt="" />
                    <h1 className=' font-[Poppins] font-[400] text-[16px] leading-[24px] text-[#FFFFFF]'>Copyright Rimel 2022. All right reserved</h1>
                </div>

            </div>

        </div>
    )
}
