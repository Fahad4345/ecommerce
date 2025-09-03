import React from 'react'
import Image from 'next/image';

const Wishlist = [
    {
        id: 1,
        name: "HAVIT HV-G92 Gamepad",
        price: 120,
        oldPrice: 160,
        discount: "-40%",
        image: "/products/gamepad.png",
        rating: 4.5,
        reviews: 88,
    },
    {
        id: 2,
        name: "AK-900 Wired Keyboard",
        price: 960,
        oldPrice: 1160,
        discount: "-35%",
        image: "/products/keyboard.png",
        rating: 4.7,
        reviews: 75,
    },
    {
        id: 3,
        name: "IPS LCD Gaming Monitor",
        price: 370,
        oldPrice: 400,
        discount: "-30%",
        image: "/products/monitor.png",
        rating: 4.8,
        reviews: 99,
    },
    {
        id: 4,
        name: "IPS LCD Gaming Monitor",
        price: 370,
        oldPrice: 400,
        discount: "-30%",
        image: "/products/monitor.png",
        rating: 4.8,
        reviews: 99,
    },]

const Foryou = [

    {
        id: 5,
        name: "HAVIT HV-G92 Gamepad",
        price: 120,
        oldPrice: 160,
        discount: "-40%",
        image: "/products/gamepad.png",
        rating: 4.5,
        reviews: 88,
    },
    {
        id: 6,
        name: "AK-900 Wired Keyboard",
        price: 960,
        oldPrice: 1160,
        discount: "-35%",
        image: "/products/keyboard.png",
        rating: 4.7,
        reviews: 75,
    },
    {
        id: 7,
        name: "IPS LCD Gaming Monitor",
        price: 370,
        oldPrice: 400,
        discount: "-30%",
        image: "/products/monitor.png",
        rating: 4.8,
        reviews: 99,
    },
    {
        id: 8,
        name: "IPS LCD Gaming Monitor",
        price: 370,
        oldPrice: 400,
        discount: "-30%",
        image: "/products/monitor.png",
        rating: 4.8,
        reviews: 99,
    },
];


export default function wishlistSec() {
    return (
        <div className=' flex flex-col gap-[80px]'>
            <div className='mx-[135px] mt-[80px] flex flex-col gap-[60px] items-center  '>
                <div className=' flex  w-full justify-between '>
                    <div className=' flex flex-col gap-[24px] items-center justify-center'>

                        <h1 className='font-[Poppins] font-[400] text-[20px] leading-[26px] text-black'>Wishlist</h1>
                    </div>
                    <div className='flex gap-[8px]'>
                        <button className='  justify-center items-center flex bg-[#F5F5F5] font-[Poppins] font-[500] text-[16px] leading-[24px] px-[48px] py-[16px]' >Move All To Bag</button>

                    </div>

                </div>
                <div className='  grid grid-cols-4 gap-x-[30px] gap-y-[60px]'>
                    {Wishlist.map((product) => (<div key={product.id}> <div

                        className=" flex flex-col min-w-[270px] w-full min-h-[350px] h-full gap-[16px] "

                    >

                        <div className=' relative bg-[#F5F5F5] px-[12px] py-[12px] min-h-[250px] h-full  flex  justify-center items-center  '>

                            <span className="   absolute top-[12px] left-[12px] font-[Poppins]  h-[26px] font-[400] text-[12px]  leading-[18px]  px-[12px] py-[4px] bg-[#DB4444] text-white  rounded-[4px]">
                                {product.discount}
                            </span>


                            <div className="
                                        absolute top-[12px] right-[12px] flex flex-col gap-2  items-end justify-end">
                                <button className=" w-[34px] h-[34px] bg-white rounded-full  justify-center items-center flex shadow hover:bg-gray-100">

                                </button>
                                <button className=" w-[34px] h-[34px] bg-white rounded-full justify-center items-center flex  shadow hover:bg-gray-100">

                                </button>
                            </div>
                            <div className='  '>
                                <Image src="/assets/images/Led.png" width={172} height={129} alt="" />
                            </div>



                        </div>
                        <div className=' gap-[8px] flex flex-col'>
                            <h3 className="font-[Poppins]  font-[500] text-[16px]  leading-[24px] ">{product.name}</h3>
                            <div className="flex items-center gap-2 ">
                                <span className="text-red-600 font-[Poppins]  font-[500] text-[16px]  leading-[24px] ">${product.price}</span>
                                <span className="text-[#757575] font-[Poppins]  font-[400] text-[14px]  leading-[20px] line-through">${product.oldPrice}</span>
                            </div>




                            {/* Add to Cart Button (hover) */}
                            {/* <button className="w-full  bg-black text-white py-2 rounded hover:bg-gray-800">
                            Add To Cart
                        </button>
                     */}
                        </div>


                    </div>


                    </div>))}
                </div>


            </div>
            <div className='mx-[135px]  flex flex-col gap-[60px] items-center  '>
                <div className=' flex  w-full justify-between '>
                    <div className=' flex flex-col gap-[24px] items-center justify-center'>

                        <h1 className='font-[Poppins] font-[400] text-[20px] leading-[26px] text-black'>For you</h1>
                    </div>
                    <div className='flex gap-[8px]'>
                        <button className='  justify-center items-center flex bg-[#F5F5F5] font-[Poppins] font-[500] text-[16px] leading-[24px] px-[48px] py-[16px]' >See All</button>

                    </div>

                </div>
                <div className='  grid grid-cols-4 gap-x-[30px] gap-y-[60px]'>
                    {Foryou.map((product) => (<div key={product.id}> <div

                        className=" flex flex-col min-w-[270px] w-full min-h-[350px] h-full gap-[16px] "

                    >

                        <div className=' relative bg-[#F5F5F5] px-[12px] py-[12px] min-h-[250px] h-full  flex  justify-center items-center  '>

                            <span className="   absolute top-[12px] left-[12px] font-[Poppins]  h-[26px] font-[400] text-[12px]  leading-[18px]  px-[12px] py-[4px] bg-[#DB4444] text-white  rounded-[4px]">
                                {product.discount}
                            </span>


                            <div className="
                                        absolute top-[12px] right-[12px] flex flex-col gap-2  items-end justify-end">
                                <button className=" w-[34px] h-[34px] bg-white rounded-full  justify-center items-center flex shadow hover:bg-gray-100">

                                </button>
                                <button className=" w-[34px] h-[34px] bg-white rounded-full justify-center items-center flex  shadow hover:bg-gray-100">

                                </button>
                            </div>
                            <div className='  '>
                                <Image src="/assets/images/Led.png" width={172} height={129} alt="" />
                            </div>



                        </div>
                        <div className=' gap-[8px] flex flex-col'>
                            <h3 className="font-[Poppins]  font-[500] text-[16px]  leading-[24px] ">{product.name}</h3>
                            <div className="flex items-center gap-2 ">
                                <span className="text-red-600 font-[Poppins]  font-[500] text-[16px]  leading-[24px] ">${product.price}</span>

                            </div>


                            <div className="flex items-center text-yellow-400 text-[20px]">
                                {"★".repeat(Math.round(product.rating))}
                                {"☆".repeat(5 - Math.round(product.rating))}
                                <span className="ml-2 text-gray-500 font-[Poppins] font-[600] text-[14px] leading-[21px]">
                                    ({product.reviews})
                                </span>
                            </div>

                            {/* Add to Cart Button (hover) */}
                            {/* <button className="w-full  bg-black text-white py-2 rounded hover:bg-gray-800">
                            Add To Cart
                        </button>
                     */}
                        </div>


                    </div>


                    </div>))}
                </div>


            </div>
        </div>

    )
}
