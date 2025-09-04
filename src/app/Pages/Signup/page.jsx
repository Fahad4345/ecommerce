import React from 'react'
import Header from '@/app/Components/header'
import Navbar from '@/app/Components/navbar'
import Footer from '@/app/Components/footer'
import Image from 'next/image';
import Link from 'next/link';

export default function Signup() {
    return (
        <div className=' bg-white h-full'>
            <Header />
            <Navbar />

            <div className=' flex flex-row mt-[60px]  max-w-[1305px] gap-[129px] justify-center items-center'>
                <div className=' max-w-[805px] w-full h-full bg-[#CBE4E8] max-h-[781px]'><Image src="/assets/images/loginImage.png" width={919} height={706} alt="" /></div>

                <div className='  flex  flex-col gap-[40px]'> <div className=' flex flex-col gap-[48px] min-w-[371px] '>
                    <div className=' flex flex-col gap-[24px] '>
                        <h1 className=" font-[Inter] font-[500] text-[30px] leading-[30px] tracking-[4%]">Log in to Exclusive</h1>
                        <h1 className=" font-[Poppins] font-[400] text-[16px] leading-[24px] tracking-[0%]">Enter your details below</h1>

                    </div>
                    <div className=' gap-[40px]   flex flex-col '>

                        <div>
                            <input className=' pb-[8px] w-full  border-b-[1px] border-[#00000066]  font-[Poppins] font-[400] text-[16px] leading-[24px] tracking-[0%]' placeholder='Email or Phone Number' />


                        </div>
                        <div>
                            <input className=' pb-[8px] w-full  border-b-[1px] border-[#00000066]  font-[Poppins] font-[400] text-[16px] leading-[24px] tracking-[0%]' placeholder='Password' />


                        </div>
                    </div>
                </div>
                    <div className=' flex flex-row gap-[87px]  justify-center items-center'>

                        <button className=' bg-[#DB4444] px-[48px] py-[16px]  rounded-[4px] font-[Poppins] font-[500] text-[16px] leading-[24px]  text-white tracking-[0%]'>Login</button>



                        <Link href="/Pages/login"> <h1 className=' font-[Poppins] font-[500] text-[#DB4444] text-[16px] leading-[24px] tracking-[0%] underline'>Forget Password?</h1></Link>


                    </div></div>


            </div>
            <Footer />
        </div>
    )
}
