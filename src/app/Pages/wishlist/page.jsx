import React from 'react'
import Navbar from "@/app/Components/navbar";

import WishlistSec from '@/app/Components/wishlistSec'

export default function wishlist() {
    return (
        <div className=' bg-white h-full'>
            <Navbar ShowCart={true} ShowProfile={true} ShowWishlist={true} />
            <WishlistSec />



        </div>
    )
}
