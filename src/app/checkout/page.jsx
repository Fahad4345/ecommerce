"use client";
import { useState } from "react";
import Navbar from "../../Components/NavBar";


import Image from 'next/image'
const cart = [
    { name: "LCD Monitor", price: 650, quantity: 1, subtotal: 650, image: "/assets/icons/lcd.svg" },
]

export default function CheckoutPage() {
    const [selected, setSelected] = useState(false);
    const handleToggle = () => {
        setSelected((prev) => !prev);
    };
    return (
        <div className=' bg-white h-full flex  flex-col justify-center items-center'>
            <Navbar ShowCart={true} ShowProfile={true} ShowWishlist={true} />

            <div className=' mx-[135px] mt-[80px]  flex flex-row'>
                <div className=' '>
                    <h1 className='font-[500] text-[36px] leading-[30px] tracking-[4%] font-[Poppins]'>Billing Details</h1>
                    <div className=' flex flex-col gap-[32px] mt-[48px]'>

                        <div className=' flex flex-col gap-[8px]'><label htmlFor="" className='font-[400] text-[16px] leading-[24px] tracking-[0%] font-[Poppins] opacity-[40%]'>First Name*</label>
                            <div className=' w-[470px] h-[50px] bg-[#F5F5F5] rounded-[4px]'><input type="text" className="w-full px-[10px] py-[10px] flex justify-center items-center cursor-pointer" /></div></div>
                        <div className=' flex flex-col gap-[8px]'><label htmlFor="" className='font-[400] text-[16px] leading-[24px] tracking-[0%] font-[Poppins] opacity-[40%]'>Company Name</label>
                            <div className=' w-[470px] h-[50px] bg-[#F5F5F5] rounded-[4px]'><input type="text" className="cursor-pointer" /></div></div>
                        <div className=' flex flex-col gap-[8px]'><label htmlFor="" className='font-[400] text-[16px] leading-[24px] tracking-[0%] font-[Poppins] opacity-[40%]'>Street Address*</label>
                            <div className=' w-[470px] h-[50px] bg-[#F5F5F5] rounded-[4px]'><input type="text" className="cursor-pointer" /></div></div>
                        <div className=' flex flex-col gap-[8px]'><label htmlFor="" className='font-[400] text-[16px] leading-[24px] tracking-[0%] font-[Poppins] opacity-[40%]'>Apartment, floor, etc. (optional)</label>
                            <div className=' w-[470px] h-[50px] bg-[#F5F5F5] rounded-[4px]'><input type="text" className="cursor-pointer" /></div></div>
                        <div className=' flex flex-col gap-[8px]'><label htmlFor="" className='font-[400] text-[16px] leading-[24px] tracking-[0%] font-[Poppins] opacity-[40%]'>Town/City*</label>
                            <div className=' w-[470px] h-[50px] bg-[#F5F5F5] rounded-[4px]'><input type="text" className="cursor-pointer" /></div></div>
                        <div className=' flex flex-col gap-[8px]'><label htmlFor="" className='font-[400] text-[16px] leading-[24px] tracking-[0%] font-[Poppins] opacity-[40%]'>Phone Number*</label>
                            <div className=' w-[470px] h-[50px] bg-[#F5F5F5] rounded-[4px]'><input type="text" className="cursor-pointer" /></div></div>
                        <div className=' flex flex-col gap-[8px]'><label htmlFor="" className='font-[400] text-[16px] leading-[24px] tracking-[0%] font-[Poppins] opacity-[40%]'>Email Address*</label>
                            <div className=' w-[470px] h-[50px] bg-[#F5F5F5] rounded-[4px]'><input type="text" className="cursor-pointer" /></div></div>
                    </div>
                    <div className=' flex gap-[16] mt-[24px] items-center'>

                        <div className="flex gap-4">

                            <label className="cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selected}
                                    onChange={handleToggle}
                                    className="hidden cursor-pointer"
                                />
                                <div
                                    className={`w-8 h-8 flex items-center justify-center rounded-md transition 
          ${selected ? "bg-[#DB4444]" : "bg-gray-200"}`}
                                >
                                    {selected && (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5 text-white"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={3}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </div>
                            </label>


                        </div>

                        <h1 className='font-[400] text-[16px] leading-[24px] tracking-[0%] font-[Poppins]'>Save this information for faster check-out next time</h1></div>
                </div>
                <div className=" ml-[173px] mt-[110px]">
                    {cart.map((item, index) => (

                        <div key={index} className=' flex items-center  min-w-[425px] w-full justify-between '>
                            <div className=' flex gap-[20px] items-center'><Image src={item.image} width={54} height={54} alt={item.name} />  <h1 className=' font-[400] text-[16px] leading-[24px] tracking-[0%] font-[Poppins]'>{item.name}</h1></div>

                            <h1 className=' font-[400] text-[16px] leading-[24px] tracking-[0%] font-[Poppins]'>{item.price}</h1>


                        </div>
                    ))}
                    <div className=' mt-[24px]'>
                        <div className=' flex justify-between'>
                            <h1 className='font-[400] text-[16px] leading-[24px] tracking-[0%] font-[Poppins]'>Subtotal:</h1>
                            <h1 className='font-[400] text-[16px] leading-[24px] tracking-[0%] font-[Poppins]'>$1750</h1>
                        </div>
                        <div className=' w-full h-[1px] bg-[#00000080] mt-[16px]'></div>
                    </div><div className=' mt-[16px]'>
                        <div className=' flex justify-between'>
                            <h1 className='font-[400] text-[16px] leading-[24px] tracking-[0%] font-[Poppins]'>Shipping:</h1>
                            <h1 className='font-[400] text-[16px] leading-[24px] tracking-[0%] font-[Poppins]'>Free</h1>
                        </div>
                        <div className=' w-full h-[1px] bg-[#00000080] mt-[16px]'></div>
                    </div>
                    <div className=' mt-[16px]'>
                        <div className=' flex justify-between'>
                            <h1 className='font-[400] text-[16px] leading-[24px] tracking-[0%] font-[Poppins]'>Total:</h1>
                            <h1 className='font-[400] text-[16px] leading-[24px] tracking-[0%] font-[Poppins]'>$1750</h1>
                        </div>

                    </div>
                    <div className=" flex justify-between mt-[34px]">
                        <div className=" flex gap-[16px] items-center">
                            <input type="radio" className=" w-[24px] h-[24px] cursor-pointer" />
                            <label htmlFor="" className="font-[400] text-[16px] leading-[24px] tracking-[0%] font-[Poppins]">Bank</label>
                        </div>

                        <Image src="/assets/icons/Bank.svg" alt="Description" width={192} height={28} />
                    </div>
                    <div className=" flex gap-[16px]  mt-[32px] items-center">
                        <input type="radio" className=" w-[24px] h-[24px] cursor-pointer" />
                        <label htmlFor="" className="font-[400] text-[16px] leading-[24px] tracking-[0%] font-[Poppins]">Cash on Delivery</label>
                    </div>
                    <div className=' flex h-[56px] flex-row mt-[32px]'>
                        <div className=' py-[16px] pl-[24px] border-[1px] border-[#00000080] '>
                            <input type="text" placeholder='Coupon Code' className=' font-[Poppins] font-[400]  text-[16px] leading-[24px] cursor-pointer' />

                        </div>

                        <button className=' bg-[#DB4444] text-white px-[48px] py-[16px] rounded-[4px] font-[Poppins] font-[500] text-[16px] leading-[24px] tracking-[0%] ml-[24px] cursor-pointer'>Apply Coupon</button>
                    </div>
                    <button className=' bg-[#DB4444] mt-[32px] text-white px-[48px] py-[16px] rounded-[4px] font-[Poppins] font-[500] text-[16px] leading-[24px] tracking-[0%] cursor-pointer'>Place Order</button>
                </div>

            </div>


        </div>
    )
}
