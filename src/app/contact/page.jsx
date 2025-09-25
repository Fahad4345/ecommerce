"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Navbar from "../../Components/NavBar";
import { SendEmail } from '../../Api1/sendEmail';
import { showToast } from './../../Components/toast';

export default function Contact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    useEffect(() => {

        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            setEmail(user.email);
            setName(user.Firstname);
        }


    }, [])


    return (
        <div className=' bg-white h-full flex flex-col justify-center items-center'>
            <Navbar ShowCart={true} ShowProfile={true} ShowWishlist={true} />
            <div className=' flex flex-row  gap-[30px] mt-[80px] mx-[135px]'>
                <div className=' flex max-w-[340px] flex-col px-[35px] pt-[40px] pb-[51px] gap-[32px] shadow-[0px_1px_13px_0px_#0000000D]  '>
                    <div className=' flex flex-col  gap-[24px]  w-full '>
                        <div className=' flex gap-[16px] items-center'>
                            <div className=' flex items-center justify-center  max-w-[40px] w-full min-h-[40px]  bg-[#DB4444] rounded-full'> <Image src="/assets/icons/Dial.svg" width={20} height={20} alt="Phone" />   </div>
                            <div className=' font-[Poppins] font-[500] text-[16px] leading-[24px] tracking-[0%]'>Call To Us</div>



                        </div>
                        <div className=' flex  flex-col gap-[16px]'>
                            <h1 className=' font-[Poppins] font-[400] text-[14px] leading-[21px] tracking-[0%]'>We are available 24/7, 7 days a week.</h1>
                            <h1 className=' font-[Poppins] font-[400] text-[14px] leading-[21px] tracking-[0%]'>Phone: +8801611112222</h1>
                        </div>
                    </div>
                    <div className=' w-full h-[1px]  bg-[#000000]/50'></div>

                    <div className=' flex flex-col  gap-[24px]  w-full '>
                        <div className=' flex gap-[16px] items-center'>
                            <div className=' flex items-center justify-center  max-w-[40px] w-full min-h-[40px]  bg-[#DB4444] rounded-full'> <Image src="/assets/icons/Dial.svg" width={20} height={20} alt="Phone" />   </div>
                            <div className=' font-[Poppins] font-[500] text-[16px] leading-[24px] tracking-[0%]'>Write To US</div>



                        </div>
                        <div className=' flex  flex-col gap-[16px]'>
                            <h1 className=' font-[Poppins] font-[400] text-[14px] leading-[21px] tracking-[0%]'>Fill out our form and we will contact you within 24 hours.</h1>
                            <h1 className=' font-[Poppins] font-[400] text-[14px] leading-[21px] tracking-[0%]'>Emails: customer@exclusive.com</h1>
                            <h1 className=' font-[Poppins] font-[400] text-[14px] leading-[21px] tracking-[0%]'>Emails: support@exclusive.com</h1>
                        </div>
                    </div>



                </div>

                <div className=' flex flex-col gap-[32px] max-w-[800px] py-[40px] px-[31px] shadow-[0px_1px_13px_0px_#0000000D]'>
                    <div className=' gap-[16px] flex  '>
                        <input disabled={name ? true : false} onChange={(e) => setName(e.target.value)} type="text" placeholder={name ? name : "Your Name*"} className=' w-[235px] py-[13px] pl-[16px] pr-[16px] bg-[#F5F5F5] font-[Poppins] font-[400] text-[16px] leading-[24px] tracking-[0%] focus:outline-none focus:ring-0' />
                        <input disabled={email ? true : false} onChange={(e) => setEmail(e.target.value)} type="text" placeholder={email ? email : "Your Email*"} className=' w-[235px] py-[13px] pl-[16px] pr-[16px] bg-[#F5F5F5] font-[Poppins] font-[400] text-[16px] leading-[24px] tracking-[0%]  focus:outline-none focus:ring-0' />
                        <input onChange={(e) => setPhone(e.target.value)} type="text" placeholder='Your Phone *' className='  w-[235px] py-[13px] pl-[16px] pr-[118px] bg-[#F5F5F5] font-[Poppins] font-[400] text-[16px] leading-[24px] tracking-[0%]  focus:outline-none focus:ring-0' />
                    </div>
                    <div>
                        <textarea onChange={(e) => setMessage(e.target.value)} name="message" id="" placeholder='Your Message *' className=' py-[13px] px-[16px]  bg-[#F5F5F5] font-[Poppins] font-[400] text-[16px] leading-[24px] tracking-[0%] w-[737px] h-[207px]   focus:outline-none focus:ring-0  ' ></textarea>
                    </div>
                    <div onClick={() => {
                        if (!email || !name || !message) {
                            showToast("Please enter all field", "error");
                        }
                        else {
                            SendEmail(name, email, message);
                        }

                    }} className='  flex justify-end'><button className=' bg-[#DB4444] w-fit cursor-pointer text-white py-[16px] px-[48px] rounded-[4px] font-[Poppins] font-[500] text-[16px] leading-[24px] tracking-[0%]'>Send Message</button>
                    </div>
                </div>
            </div>


        </div>
    )
}
