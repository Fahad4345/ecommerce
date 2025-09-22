"use client"
import React, { useEffect, useState } from 'react'
import Navbar from "../../../Components/NavBar";
import { useSearchParams } from 'next/navigation';
import getItem from "../../../Api1/getItem"
import { useParams } from "next/navigation";
import Image from 'next/image'
import { useWishlist } from "../../../Api1/wishlist"
import { InsertCart } from '../../../Api1/Cart/insertCart';
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { UpdateCart } from '../../../Api1/Cart/updateCart';
import { clearCart } from './../../../store/productSlice';

export default function ProductDetail() {
    const Cartitem = useSelector(state => state.cart.items);
    const router = useRouter();
    const { insertItem } = useWishlist();
    const [size, setSize] = useState("Sm");
    const [selectedColor, setSelectedColor] = useState("");
    const [quantity, setQuantity] = useState(1);
    const searchParams = useSearchParams();
    const isCartItem = searchParams.get('cart')

    const { id } = useParams();
    const [item, setItem] = useState(null);
    const dispatch = useDispatch();
    const handleDecrement = () => setQuantity(prev => Math.max(1, prev - 1));
    const handleIncrement = () => setQuantity(prev => prev + 1);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const product = await getItem(id);

                const fetchedItem = product.item;
                if (!fetchedItem) return;

                setItem(fetchedItem);
                setSize(fetchedItem.sizes?.[0] || "Sm");
                setSelectedColor(fetchedItem.color?.[0] || "");
                setQuantity(1);
            } catch (err) {
                console.error(err);
            }
        };

        if (Cartitem && id === "cart-item") {
            setItem(Cartitem.itemId);
            setSize(Cartitem.size || Cartitem.itemId.sizes?.[0] || "Sm");
            setSelectedColor(Cartitem.color || Cartitem.itemId.color?.[0] || "");
            setQuantity(Cartitem.quantity || 1);
        } else {
            fetchItem();
        }
    }, [Cartitem, id]);

    const smallImages = item?.image?.slice(1, 5);

    if (!item) return <p className="text-center mt-10">Loading product...</p>;

    return (
        <div className='flex justify-center items-center flex-col'>
            <Navbar ShowCart={true} ShowProfile={true} ShowWishlist={true} />

            <div className='mx-[135px] mt-[80px] max-w-[1170px] w-full'>
                <div className='flex gap-[70px]'>

                    <div className='flex gap-[30px]'>
                        <div className='flex flex-col gap-[16px]'>
                            {smallImages?.map((img, idx) => (
                                <div key={idx} className='w-[170px] h-[138px] flex justify-center items-center rounded-[4px] bg-[#F5F5F5]'>
                                    <Image src={img} width={121} height={114} alt="" />
                                </div>
                            ))}
                        </div>
                        <div className=' w-[500px] h-[600px] flex justify-center items-center rounded-[4px]  bg-[#F5F5F5]'><Image src={item.image[0]} width={446} height={315} alt="" /></div>
                    </div>


                    <div className='flex flex-col'>
                        <h1 className='font-[Inter] font-[600] text-[24px] leading-[24px] tracking-[3%]'>{item.name}</h1>

                        <div className='flex items-center gap-[16px] mt-[8px]'>
                            <div className="flex items-center text-yellow-400 text-[20px]">
                                {"★".repeat(Math.round(item.rating || 0))}
                                {"☆".repeat(5 - Math.round(item.rating || 0))}
                                <span className="ml-2 text-gray-500 font-[Poppins] font-[600] text-[14px] leading-[21px]">
                                    ({item.review || 0} Reviews)
                                </span>
                            </div>
                            <div className='w-[1px] h-[16px] bg-[#000000]/50'></div>
                            <h1 className='font-[Poppins] font-[400] text-[14px] leading-[21px] tracking-[0px]'>In Stock</h1>
                        </div>

                        <p className='mt-[24px] font-[Poppins] font-[400] text-[14px] leading-[21px] tracking-[0px]'>{item.description}</p>


                        <div className='flex gap-[8px] mt-[16px] items-center'>
                            <label className='font-[Poppins] font-[400] text-[20px] leading-[20px] tracking-[3%]'>Colors:</label>
                            <div className='flex gap-[8px]'>
                                {item.color?.map((color, idx) => {
                                    const normalizedColor = color.toLowerCase();

                                    return (

                                        <div
                                            key={idx}
                                            onClick={() => setSelectedColor(normalizedColor)}
                                            className={`flex justify-center items-center w-[28px] h-[28px] rounded-full cursor-pointer border-2 transition-transform duration-200
                                            ${selectedColor.toLowerCase() === normalizedColor ? 'scale-110 border-black' : 'border-transparent'}`}
                                            style={{ backgroundColor: selectedColor === normalizedColor ? 'transparent' : normalizedColor }}
                                        >
                                            {selectedColor === normalizedColor && (
                                                <div className='w-4 h-4 rounded-full' style={{ backgroundColor: normalizedColor }}></div>
                                            )}
                                        </div>
                                    )
                                })}

                            </div>
                        </div>

                        <div className='flex gap-[24px] mt-[16px] items-center'>
                            <label className='font-[Poppins] font-[400] text-[20px] leading-[20px] tracking-[3%]'>Size:</label>
                            {item.sizes?.map((option, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => setSize(option)}
                                    className={`flex gap-[16px] w-[32px] h-[32px] border-[1px] rounded-[4px] justify-center items-center font-[Poppins] font-[500] text-[14px] leading-[21px] cursor-pointer tracking-[0%] transition-colors duration-200
                                        ${size === option ? 'bg-[#DB4444] text-[#FFFFFF]' : 'border-[#000000]/20 text-[#000]'}`}
                                >
                                    {option}
                                </div>
                            ))}
                        </div>


                        <div className='flex mt-[16px] items-center gap-[16px]'>
                            <div className='flex border-[1px] border-[#00000080]'>
                                <button onClick={handleDecrement} className='px-3 py-2'><svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                                    <rect x="5" y="9" width="10" height="2" rx="1" fill="currentColor" />
//                                                 </svg></button>
                                <span className='py-[8px] px-[34px] border-l-[1px] border-r-[1px]'>{quantity}</span>
                                <button onClick={handleIncrement} className='px-3 py-2'><svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                                    <rect x="9" y="5" width="2" height="10" rx="1" fill="currentColor" />
                                    <rect x="5" y="9" width="10" height="2" rx="1" fill="currentColor" />
//                                                 </svg></button>
                            </div>

                            <button
                                onClick={() => {

                                    if (Cartitem) {
                                        UpdateCart(Cartitem.itemId._id, selectedColor, size, quantity);

                                        router.push("/cart")
                                        dispatch(clearCart());


                                    } else {

                                        InsertCart(item._id, size, selectedColor, quantity); router.push("/cart");
                                    }
                                }}
                                className='px-6 py-2 bg-[#DB4444] text-white rounded-[4px]'
                            >
                                {Cartitem ? "Add to Cart" : "Buy Now"}
                            </button>

                            <div onClick={() => insertItem(item._id)} className='w-[40px] h-[40px] border flex justify-center items-center cursor-pointer'>
                                <Image src="/assets/icons/Wishlist.svg" width={32} height={32} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
