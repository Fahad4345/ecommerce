"use client"
import React, { useEffect, useState, useContext } from 'react'
import Navbar from "../../Components/NavBar";
import Image from 'next/image'
import Link from 'next/link'
import { ChevronUp, ChevronDown } from "lucide-react";
import { GetCart } from '../../Api1/Cart/getCart';
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addItem } from "./../../store/productSlice";
import { UpdateCart } from '../../Api1/Cart/updateCart';
import { MyContext } from "../../context/MyContext";
import { deleteCartItem } from './../../Api1/Cart/deleteCart';

export default function Cart() {
    const { setcartLength, cartLength } = useContext(MyContext);

    const router = useRouter();
    const [cart, setCart] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    let Subtotal;

    const subtotal = (price, quantity) => {
        Subtotal = price * quantity;
        return Subtotal;
    }

    const cartTotal = () => {

        if (!Array.isArray(cart)) return 0;

        return cart.reduce((total, item) => {
            return total + subtotal(item.itemId.price, item.quantity);
        }, 0);
    };

    const dispatch = useDispatch();
    const handleAddToCart = (item) => {
        dispatch(addItem(item));
        router.push(`/productDetail/cart-item`);
    };

    const increment = async (index) => {
        const newCart = [...cart];
        newCart[index].quantity += 1;
        setCart(newCart);


        try {
            await UpdateCart(
                newCart[index].itemId._id,
                newCart[index].color,
                newCart[index].size,
                newCart[index].quantity
            );
        } catch (error) {
            console.error("Failed to update cart:", error);

            const revertCart = [...cart];
            revertCart[index].quantity -= 1;
            setCart(revertCart);
        }
    };

    const decrement = async (index) => {
        const newCart = [...cart];
        if (newCart[index].quantity > 1) {
            newCart[index].quantity -= 1;
            setCart(newCart);

            try {
                await UpdateCart(
                    newCart[index].itemId._id,
                    newCart[index].color,
                    newCart[index].size,
                    newCart[index].quantity
                );
            } catch (error) {
                console.error("Failed to update cart:", error);

                const revertCart = [...cart];
                revertCart[index].quantity += 1;
                setCart(revertCart);
            }
        }
    }

    const handleDeleteCartItem = async (itemId) => {
        try {
            await deleteCartItem(itemId);

            const updatedCart = cart.filter(item => item.itemId._id !== itemId);
            setCart(updatedCart);
            setcartLength(updatedCart.length);
            localStorage.setItem("CartLength", updatedCart.length.toString());
        } catch (error) {
            console.error("Failed to delete cart item:", error);
        }
    };

    useEffect(() => {
        async function fetchCart() {
            try {
                setIsLoading(true);
                const data = await GetCart();

                if (data && data.cart && Array.isArray(data.cart)) {
                    setCart(data.cart);
                    setcartLength(data.cart.length);
                    localStorage.setItem("CartLength", data.cart.length.toString());
                } else {

                    setCart([]);
                    setcartLength(0);
                    localStorage.setItem("CartLength", "0");
                }
            } catch (err) {
                console.error("Failed to load cart:", err);
                setCart([]);
                setcartLength(0);
            } finally {
                setIsLoading(false);
            }
        }

        fetchCart();
    }, [setcartLength]);


    if (isLoading) {
        return (
            <div className='bg-white h-full justify-center items-center flex flex-col'>
                <Navbar ShowCart={true} ShowProfile={true} ShowWishlist={true} />
                <div className='max-w-[1170px] mx-[135px] mt-[80px]'>
                    <div className='flex justify-center items-center py-[100px]'>
                        <p className='font-[Poppins] text-[18px]'>Loading cart...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='bg-white h-full justify-center items-center flex flex-col'>
            <Navbar ShowCart={true} ShowProfile={true} ShowWishlist={true} />

            <div className='max-w-[1170px] mx-[135px] mt-[80px]'>

                <div className='flex gap-[284px] px-[39px] py-[24px] shadow-[0px_1px_13px_0px_#0000000D]'>
                    <h1 className='font-[400] text-[16px] leading-[24px] tracking-[0%] font-[Poppins]'>Product</h1>
                    <h1 className='font-[400] text-[16px] leading-[24px] tracking-[0%] font-[Poppins]'>Price</h1>
                    <h1 className='font-[400] text-[16px] leading-[24px] tracking-[0%] font-[Poppins]'>Quantity</h1>
                    <h1 className='font-[400] text-[16px] leading-[24px] tracking-[0%] font-[Poppins]'>Subtotal</h1>
                </div>


                {Array.isArray(cart) && cart.length > 0 ? (
                    cart.map((item, index) => (
                        <div key={index} className='relative'>
                            <div
                                onClick={() => handleDeleteCartItem(item.itemId._id)}
                                className='w-[30px] h-[30px] rounded-full bg-[#DB4444] absolute top-0 right-[-10px] flex justify-center items-center text-[14px] text-white cursor-pointer hover:bg-[#c93d3d] z-10'
                            >
                                X
                            </div>
                            <div
                                key={index}
                                onClick={() => handleAddToCart(item)}
                                className='flex items-center justify-between px-[39px] py-[24px] shadow-[0px_1px_13px_0px_#0000000D] cursor-pointer hover:bg-gray-50'
                            >
                                <div className='flex gap-[20px] items-center'>
                                    <Image
                                        src={item.itemId.image[0]}
                                        width={54}
                                        height={54}
                                        alt={item.name || 'Product image'}
                                    />
                                    <h1 className='font-[400] text-[16px] leading-[24px] tracking-[0%] font-[Poppins]'>
                                        {item.name}
                                    </h1>
                                </div>

                                <h1 className='font-[400] text-[16px] leading-[24px] tracking-[0%] font-[Poppins]'>
                                    ${item.itemId.price}
                                </h1>

                                <div className="flex items-center border border-gray-300 rounded-md w-[70px] h-[35px] overflow-hidden">
                                    <span className="flex-1 text-center text-[14px] font-medium">
                                        {item.quantity.toString().padStart(2, "0")}
                                    </span>

                                    <div className="flex flex-col">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                                increment(index);
                                            }}
                                            className="w-[20px] h-[17px] flex items-center justify-center hover:bg-gray-100 cursor-pointer"
                                        >
                                            <ChevronUp size={14} />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                                decrement(index);
                                            }}
                                            className="w-[20px] h-[17px] flex items-center justify-center hover:bg-gray-100 cursor-pointer"
                                        >
                                            <ChevronDown size={14} />
                                        </button>
                                    </div>
                                </div>

                                <h1 className='font-[400] text-[16px] leading-[24px] tracking-[0%] font-[Poppins]'>
                                    ${subtotal(item.itemId.price, item.quantity)}
                                </h1>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='flex justify-center items-center py-[100px]'>
                        <p className='font-[Poppins] text-[18px] text-gray-500'>Your cart is empty</p>
                    </div>
                )}

                <div className='flex justify-between mt-[24px]'>
                    <button
                        className='font-[500] text-[16px] leading-[24px] tracking-[0%] font-[Poppins] border-[1px] border-[#00000080] px-[48px] py-[16px] rounded-[4px] cursor-pointer hover:bg-gray-50'
                        onClick={() => router.push("/")}
                    >
                        Return To Shop
                    </button>
                    <button
                        className='font-[500] text-[16px] leading-[24px] tracking-[0%] font-[Poppins] border-[1px] border-[#00000080] px-[48px] py-[16px] rounded-[4px] cursor-pointer hover:bg-gray-50'
                        onClick={async () => {
                            if (Array.isArray(cart)) {
                                try {
                                    await Promise.all(
                                        cart.map(item =>
                                            UpdateCart(item.itemId._id, item.color, item.size, item.quantity)
                                        )
                                    );
                                    alert('Cart updated successfully!');
                                } catch (error) {
                                    console.error('Failed to update cart:', error);
                                    alert('Failed to update cart. Please try again.');
                                }
                            }
                        }}
                    >
                        Update Cart
                    </button>
                </div>

                <div className='flex justify-between mt-[80px]'>
                    <div className='flex h-fit flex-row'>
                        <div className='w-[300px] py-[16px] pl-[24px] border-[1px] border-[#00000080]'>
                            <input
                                type="text"
                                placeholder='Coupon Code'
                                className='font-[Poppins] font-[400] text-[16px] leading-[24px] outline-none'
                            />
                        </div>
                        <button className='bg-[#DB4444] text-white px-[48px] py-[16px] rounded-[4px] font-[Poppins] font-[500] text-[16px] leading-[24px] tracking-[0%] ml-[24px] cursor-pointer hover:bg-[#c93d3d]'>
                            Apply Coupon
                        </button>
                    </div>

                    <div className='py-[32px] px-[24px] max-w-[470px] w-full border-[1px] rounded-[4px]'>
                        <h1 className='font-[500] text-[20px] leading-[28px] tracking-[0%] font-[Poppins]'>Cart Total</h1>

                        <div className='mt-[24px]'>
                            <div className='flex justify-between'>
                                <h1 className='font-[400] text-[16px] leading-[24px] tracking-[0%] font-[Poppins]'>Subtotal:</h1>
                                <h1 className='font-[400] text-[16px] leading-[24px] tracking-[0%] font-[Poppins]'>${cartTotal()}</h1>
                            </div>
                            <div className='w-full h-[1px] bg-[#00000080] mt-[16px]'></div>
                        </div>

                        <div className='mt-[16px]'>
                            <div className='flex justify-between'>
                                <h1 className='font-[400] text-[16px] leading-[24px] tracking-[0%] font-[Poppins]'>Shipping:</h1>
                                <h1 className='font-[400] text-[16px] leading-[24px] tracking-[0%] font-[Poppins]'>Free</h1>
                            </div>
                            <div className='w-full h-[1px] bg-[#00000080] mt-[16px]'></div>
                        </div>

                        <div className='mt-[16px]'>
                            <div className='flex justify-between'>
                                <h1 className='font-[400] text-[16px] leading-[24px] tracking-[0%] font-[Poppins]'>Total:</h1>
                                <h1 className='font-[400] text-[16px] leading-[24px] tracking-[0%] font-[Poppins]'>${cartTotal()}</h1>
                            </div>
                        </div>

                        <Link href="/checkout">
                            <div className='flex justify-center'>
                                <button
                                    className='bg-[#DB4444] text-white px-[48px] py-[16px] rounded-[4px] font-[Poppins] font-[500] text-[16px] leading-[24px] tracking-[0%] mt-[16px] cursor-pointer hover:bg-[#c93d3d]'
                                    disabled={!Array.isArray(cart) || cart.length === 0}
                                >
                                    Process to Checkout
                                </button>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}