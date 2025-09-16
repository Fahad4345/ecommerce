"use client"
import React, { useEffect, useState } from 'react'
import Navbar from "../../Components/NavBar";
import Image from 'next/image'
import Link from 'next/link'
import { ChevronUp, ChevronDown } from "lucide-react";
import { GetCart } from './../../Api/Cart/getCart';
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addItem } from "./../../store/productSlice";

export default function Cart() {

    const router = useRouter();
    const [cart, setCart] = useState([]);
    const dispatch = useDispatch();
    const handleAddToCart = (item) => {
        dispatch(addItem(item));
        router.push("/productId/");
    };
    const increment = (index) => {
        const newCart = [...cart];
        newCart[index].quantity += 1;
        setCart(newCart);
    };

    const decrement = (index) => {
        const newCart = [...cart];
        if (newCart[index].quantity > 1) {
            newCart[index].quantity -= 1;
            setCart(newCart);
        }

    }
    useEffect(() => {
        async function fetchCart() {
            try {
                const data = await GetCart();
                if (data && data.cart) {
                    setCart(data.cart);
                }
            } catch (err) {
                console.error("Failed to load cart:", err);
            }
        }

        fetchCart();
    }, [])

    return (
        <div className=' bg-white h-full justify-center items-center flex flex-col'>
            <Navbar ShowCart={true} ShowProfile={true} ShowWishlist={true} />

            <div className=' max-w-[1170px] mx-[135px] mt-[80px]'>

                <div className=' flex gap-[284px] px-[39px] py-[24px] shadow-[0px_1px_13px_0px_#0000000D]'>
                    <h1 className=' font-[400] text-[16px] leading-[24px] tracking-[0%] font-[Poppins]'>Product</h1>

                    <h1 className=' font-[400] text-[16px] leading-[24px] tracking-[0%] font-[Poppins]'>Price</h1>

                    <h1 className=' font-[400] text-[16px] leading-[24px] tracking-[0%] font-[Poppins]'>Quantity</h1>

                    <h1 className=' font-[400] text-[16px] leading-[24px] tracking-[0%] font-[Poppins]'>Subtotal</h1>
                </div>
                {cart.map((item, index) => (

                    <div key={index} onClick={() => handleAddToCart(item.itemId,)} className=' flex items-center  justify-between px-[39px] py-[24px] shadow-[0px_1px_13px_0px_#0000000D]'>
                        <div className=' flex gap-[20px] items-center'><Image src={item.itemId.image[0]} width={54} height={54} alt="" />  <h1 className=' font-[400] text-[16px] leading-[24px] tracking-[0%] font-[Poppins]'>{item.name}</h1></div>

                        <h1 className=' font-[400] text-[16px] leading-[24px] tracking-[0%] font-[Poppins]'>{item.itemId.price}</h1>

                        <div className="flex items-center border border-gray-300 rounded-md w-[70px] h-[35px] overflow-hidden">

                            <span className="flex-1 text-center text-[14px] font-medium">
                                {item.quantity.toString().padStart(2, "0")}
                            </span>

                            <div className="flex flex-col" onClick={() => e.preventDefault()}>
                                <button
                                    onClick={() => increment(index)}
                                    className="w-[20px] h-[17px] flex items-center justify-center hover:bg-gray-100 cursor-pointer"
                                >
                                    <ChevronUp size={14} />
                                </button>
                                <button
                                    onClick={() => decrement(index)}
                                    className="w-[20px] h-[17px] flex items-center justify-center hover:bg-gray-100 cursor-pointer"
                                >
                                    <ChevronDown size={14} />
                                </button>
                            </div>
                        </div>

                        <h1 className=' font-[400] text-[16px] leading-[24px] tracking-[0%] font-[Poppins]'>{item.subtotal}</h1>
                    </div>
                ))}

                <div className=' flex justify-between mt-[24px]'>
                    <button className='  font-[500] text-[16px] leading-[24px] tracking-[0%] font-[Poppins] border-[1px] border-[#00000080] px-[48px] py-[16px] rounded-[4px] cursor-pointer'>Return To Shop</button>
                    <button className='  font-[500] text-[16px] leading-[24px] tracking-[0%] font-[Poppins] border-[1px] border-[#00000080] px-[48px] py-[16px] rounded-[4px] cursor-pointer'>Update Cart</button>
                </div>
                <div className=' flex justify-between  mt-[80px]'>
                    <div className=' flex h-fit flex-row'>
                        <div className='  w-[300px] py-[16px] pl-[24px] border-[1px] border-[#00000080] '>
                            <input type="text" placeholder='Coupon Code' className=' font-[Poppins] font-[400]  text-[16px] leading-[24px]' />

                        </div>

                        <button className=' bg-[#DB4444] text-white px-[48px] py-[16px] rounded-[4px] font-[Poppins] font-[500] text-[16px] leading-[24px] tracking-[0%] ml-[24px] cursor-pointer'>Apply Coupon</button>
                    </div>

                    <div className=' py-[32px] px-[24px] max-w-[470px] w-full border-[1px] rounded-[4px]'>


                        <h1 className=' font-[500] text-[20px] leading-[28px] tracking-[0%] font-[Poppins] '>Cart Total</h1>
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

                        <Link href="/checkout">
                            <div className=' flex justify-center'>
                                <button className=' bg-[#DB4444] text-white px-[48px] py-[16px] rounded-[4px] font-[Poppins] font-[500] text-[16px] leading-[24px] tracking-[0%] mt-[16px] cursor-pointer'>Process to Checkout</button>

                            </div>
                        </Link>


                    </div>

                </div>

            </div>


        </div>
    )
}

