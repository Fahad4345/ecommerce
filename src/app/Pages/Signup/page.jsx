"use client"
import React, { useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import Navbar from "@/app/Components/navbar";




export default function Signup() {
    const [FormData, setFormdata] = useState({
        Firstname: "",
        Lastname: "",
        Addresse: "",
        email: "",
        password: ""
    });


    const handleChange = async (e) => {
        setFormdata({ ...FormData, [e.target.name]: e.target.value })
    }
    const handlesubmit = async () => {
        try {
            const res = await fetch("http://localhost:3001/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(FormData)

            });
            const data = res.json(FormData);

            if (!res.ok) {
                throw new Error("Something went wrong");
            }

            else {
                throw new Error("User Created Sucessfully");

            }
        }
        catch (err) {
            alert("Error: " + err.message);

        }
    }
    return (
        <div className=' bg-white h-full'>
            <Navbar />


            <div className=' flex flex-row mt-[60px]  max-w-[1305px] gap-[129px]'>
                <div className=' max-w-[805px] w-full h-full bg-[#CBE4E8] max-h-[781px]'><Image src="/assets/images/loginImage.png" width={919} height={706} alt="" /></div>
                <div className=' flex flex-col gap-[48px] min-w-[371px] '>
                    <div className=' flex flex-col gap-[24px] '>
                        <h1 className=" font-[Inter] font-[500] text-[30px] leading-[30px] tracking-[4%]">Create an account</h1>
                        <h1 className=" font-[Poppins] font-[400] text-[16px] leading-[24px] tracking-[0%]">Enter your details below</h1>

                    </div>
                    <form className=' gap-[40px]   flex flex-col '>
                        <div>
                            <input onChange={handleChange} className=' pb-[8px] w-full  border-b-[1px] border-[#00000066]  font-[Poppins] font-[400] text-[16px] leading-[24px] tracking-[0%]' placeholder=' First Name' name='Firstname' value={FormData.Firstname} type="text" />


                        </div>
                        <div>
                            <input onChange={handleChange} className=' pb-[8px] w-full  border-b-[1px] border-[#00000066]  font-[Poppins] font-[400] text-[16px] leading-[24px] tracking-[0%]' placeholder='Last Name' name='Lastname' value={FormData.Lastname} type="text" />


                        </div>

                        <div>
                            <input onChange={handleChange} className=' pb-[8px] w-full  border-b-[1px] border-[#00000066]  font-[Poppins] font-[400] text-[16px] leading-[24px] tracking-[0%]' placeholder='Email or Phone Number' name='email' value={FormData.email} type="text" />


                        </div> <div>
                            <input onChange={handleChange} className=' pb-[8px] w-full  border-b-[1px] border-[#00000066]  font-[Poppins] font-[400] text-[16px] leading-[24px] tracking-[0%]' placeholder='Password' name='password' value={FormData.password} type="text" />


                        </div>

                    </form>
                    <div className=' flex flex-col gap-[16px] '>

                        <button className=' bg-[#DB4444] px-[122px] py-[16px] cursor-pointer rounded-[4px] font-[Poppins] font-[500] text-[16px] leading-[24px]  text-white tracking-[0%] ' onClick={handlesubmit}>Create Account</button>
                        <div className=' '>

                            <div className='  cursor-pointer flex  justify-center items-center mt-[32px] gap-[16px]'> <h1 className=' font-[Poppins] font-[400] text-[16px] leading-[24px] tracking-[0%]'>Already have account?</h1> <Link href="/Pages/login"><h1 className='cursor-pointer font-[Poppins] font-[500] text-[16px] leading-[24px] tracking-[0%] underline'>Log in</h1></Link></div>
                        </div>

                    </div>

                </div>
            </div>

        </div>
    )
}
