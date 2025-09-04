import React from 'react'
import Header from '@/app/Components/header'
import Navbar from '@/app/Components/navbar'
import Footer from '@/app/Components/footer'
import Image from 'next/image';
import Link from 'next/link';

export default function Login() {
    return (
        <div className=' bg-white h-full'>
            <Header />
            <Navbar />

            <div className=' flex flex-row mt-[60px]  max-w-[1305px] gap-[129px]'>
                <div className=' max-w-[805px] w-full h-full bg-[#CBE4E8] max-h-[781px]'><Image src="/assets/images/loginImage.png" width={919} height={706} alt="" /></div>
                <div className=' flex flex-col gap-[48px] min-w-[371px] '>
                    <div className=' flex flex-col gap-[24px] '>
                        <h1 className=" font-[Inter] font-[500] text-[30px] leading-[30px] tracking-[4%]">Create an account</h1>
                        <h1 className=" font-[Poppins] font-[400] text-[16px] leading-[24px] tracking-[0%]">Enter your details below</h1>

                    </div>
                    <div className=' gap-[40px]   flex flex-col '>
                        <div>
                            <input className=' pb-[8px] w-full  border-b-[1px] border-[#00000066]  font-[Poppins] font-[400] text-[16px] leading-[24px] tracking-[0%]' placeholder='Name' />


                        </div>
                        <div>
                            <input className=' pb-[8px] w-full  border-b-[1px] border-[#00000066]  font-[Poppins] font-[400] text-[16px] leading-[24px] tracking-[0%]' placeholder='Email or Phone Number' />


                        </div> <div>
                            <input className=' pb-[8px] w-full  border-b-[1px] border-[#00000066]  font-[Poppins] font-[400] text-[16px] leading-[24px] tracking-[0%]' placeholder='Password' />


                        </div>

                    </div>
                    <div className=' flex flex-col gap-[16px] '>

                        <button className=' bg-[#DB4444] px-[122px] py-[16px]  rounded-[4px] font-[Poppins] font-[500] text-[16px] leading-[24px]  text-white tracking-[0%]'>Create Account</button>
                        <div className=' '>
                            <button className='  px-[85px] py-[16px]  flex  gap-[16px]  rounded-[4px]  border-[1px]  border-[#00000066] font-[Poppins] font-[400] text-[16px] leading-[24px] tracking-[0%]'><Image src="/assets/icons/Icon-Google.svg" width={24} height={24} alt="" />Sign up with Google</button>
                            <Link href="/Pages/login"><h1 className=' font-[Poppins] font-[500] text-[16px] leading-[24px] tracking-[0%]'>Log in</h1></Link>
                            <div className='  cursor-pointer flex  justify-center items-center mt-[32px] gap-[16px]'> <h1 className=' font-[Poppins] font-[400] text-[16px] leading-[24px] tracking-[0%]'>Already have account?</h1> <Link href="/Pages/login"><h1 className=' font-[Poppins] font-[500] text-[16px] leading-[24px] tracking-[0%] underline'>Log in</h1></Link></div>
                        </div>

                    </div>

                </div>
            </div>
            <Footer />
        </div>
    )
}
