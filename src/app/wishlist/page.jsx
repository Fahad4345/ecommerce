import React from 'react'
import Navbar from "../../Components/NavBar";

import WishlistSec from '../../Components/WishlistSec'

export default function wishlist() {
    return (
        <div className=' bg-white h-full  flex flex-col justify-center items-center'>
            <Navbar ShowCart={true} ShowProfile={true} ShowWishlist={true} />
            <WishlistSec />



        </div>
    )
}
