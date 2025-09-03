import React from 'react'
import Header from '@/app/Components/header'
import Navbar from '@/app/Components/navbar'
import Footer from '@/app/Components/footer'
import WishlistSec from '@/app/Components/wishlistSec'

export default function wishlist() {
    return (
        <div className=' bg-white h-full'>
            <Header />

            <Navbar />
            <WishlistSec />
            <Footer />


        </div>
    )
}
