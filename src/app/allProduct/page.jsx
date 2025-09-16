"use client"
import React, { useState } from 'react'
import Navbar from "../../Components/NavBar";
import { Cat } from 'lucide-react';
import CategorySec from '../../Components/CategorySec';
import SaleSection from '../../Components/SaleSec';
// const products = [
//     {
//         id: 1,
//         name: "HAVIT HV-G92 Gamepad",
//         price: 120,
//         oldPrice: 160,
//         discount: "-40%",
//         image: "/assets/images/Led.png",
//         rating: 4.5,
//         reviews: 88,
//     },
//     {
//         id: 2,
//         name: "HAVIT HV-G92 Gamepad",
//         price: 960,
//         oldPrice: 1160,
//         discount: "-35%",
//         image: "/assets/images/Led.png",
//         rating: 4.7,
//         reviews: 75,
//     },
//     {
//         id: 3,
//         name: "IPS LCD Gaming Monitor",
//         price: 370,
//         oldPrice: 400,
//         discount: "-30%",
//         image: "/assets/images/Led.png",
//         rating: 4.8,
//         reviews: 99,
//     },
//     {
//         id: 4,
//         name: "S-Series Comfort Chair",
//         price: 375,
//         oldPrice: 400,
//         discount: "-25%",
//         image: "/assets/images/Led.png",
//         rating: 4.8,
//         reviews: 99,
//     },
//     {
//         id: 5,
//         name: "S-Series Comfort Chair",
//         price: 375,
//         oldPrice: 400,
//         discount: "-25%",
//         image: "/assets/images/Led.png",
//         rating: 4.8,
//         reviews: 99,
//     },
//     {
//         id: 6,
//         name: "S-Series Comfort Chair",
//         price: 375,
//         oldPrice: 400,
//         discount: "-25%",
//         image: "/assets/images/Led.png",
//         rating: 4.8,
//         reviews: 99,
//     },
//     {
//         id: 7,
//         name: "S-Series Comfort Chair",
//         price: 375,
//         oldPrice: 400,
//         discount: "-25%",
//         image: "/assets/images/Led.png",
//         rating: 4.8,
//         reviews: 99,
//     },
//     {
//         id: 8,
//         name: "S-Series Comfort Chair",
//         price: 375,
//         oldPrice: 400,
//         discount: "-25%",
//         image: "/assets/images/Led.png",
//         rating: 4.8,
//         reviews: 99,
//     },
// ];

export default function AllProduct() {
    const [products, SetProducts] = useState([]);
    console.log("Products" + products);
    return (
        <div className='flex flex-col justify-center items-center'>
            <Navbar ShowCart={true} ShowProfile={true} ShowWishlist={true} />
            <CategorySec onItemFetch={SetProducts} />
            <SaleSection title="All Products" subtitle="Check out our all products" products={products} showNavigation={false} showViewAll={false} showSwiper={false} className='max-w-[1170px]' />

        </div>
    )
}
