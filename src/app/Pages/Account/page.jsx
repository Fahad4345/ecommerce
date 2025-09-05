import React from 'react'
import Navbar from "@/app/Components/navbar";

export default function AccountPage() {
    return (
        <div>
            <Navbar ShowCart={true} ShowProfile={true} ShowWishlist={true} />
            <div className=' flex flex-row mx-[135px] mt-[80px]'>

                <div className="min-w-[220px] mr-[60px]">
                    <div className="flex flex-col gap-6">

                        <div>
                            <h2 className="font-[400] text-[16px] leading-[24px] font-[Poppins] text-[#000] underline mb-2 cursor-pointer">Manage My Account</h2>
                            <ul className="ml-[35px] flex flex-col gap-2">
                                <li className="font-[400] text-[16px] leading-[24px] font-[Poppins] text-[#DB4444] mb-1">My Profile</li>
                                <li className="font-[400] text-[16px] leading-[24px] font-[Poppins] text-[#000] opacity-40">Address Book</li>
                                <li className="font-[400] text-[16px] leading-[24px] font-[Poppins] text-[#000] opacity-40">My Payment Options</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="font-[500] text-[16px] leading-[24px] font-[Poppins] text-[#000] mb-2">My Orders</h2>
                            <ul className="ml-[35px] flex flex-col gap-2">
                                <li className="font-[400] text-[16px] leading-[24px] font-[Poppins] text-[#000] opacity-40">My Returns</li>
                                <li className="font-[400] text-[16px] leading-[24px] font-[Poppins] text-[#000] opacity-40">My Cancellations</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="font-[500] text-[16px] leading-[24px] font-[Poppins] text-[#000] mb-2">My WishList</h2>
                        </div>
                    </div>
                </div>

                <div className="flex-1 bg-white px-[40px] py-[32px] rounded-[8px]" style={{ boxShadow: "0px 1px 13px 0px #0000000D" }}>
                    <h2 className="text-[#DB4444] font-[500] text-[24px] font-[Poppins] mb-[32px]">Edit Your Profile</h2>
                    <form className="flex flex-col gap-[24px]">
                        <div className="flex gap-[32px]">
                            <div className="flex flex-col flex-1">
                                <label className="font-[400] text-[16px] font-[Poppins] mb-[8px]">First Name</label>
                                <input type="text" value="Md" readOnly className="bg-[#F5F5F5] rounded-[4px] px-[16px] py-[12px] font-[Poppins] text-[16px]" />
                            </div>
                            <div className="flex flex-col flex-1">
                                <label className="font-[400] text-[16px] font-[Poppins] mb-[8px]">Last Name</label>
                                <input type="text" value="Rimel" readOnly className="bg-[#F5F5F5] rounded-[4px] px-[16px] py-[12px] font-[Poppins] text-[16px]" />
                            </div>
                        </div>
                        <div className="flex gap-[32px]">
                            <div className="flex flex-col flex-1">
                                <label className="font-[400] text-[16px] font-[Poppins] mb-[8px]">Email</label>
                                <input type="email" value="rimel1111@gmail.com" readOnly className="bg-[#F5F5F5] rounded-[4px] px-[16px] py-[12px] font-[Poppins] text-[16px]" />
                            </div>
                            <div className="flex flex-col flex-1">
                                <label className="font-[400] text-[16px] font-[Poppins] mb-[8px]">Address</label>
                                <input type="text" value="Kingston, 5236, United State" readOnly className="bg-[#F5F5F5] rounded-[4px] px-[16px] py-[12px] font-[Poppins] text-[16px]" />
                            </div>
                        </div>
                        <div>
                            <label className="font-[400] text-[16px] font-[Poppins] mb-[8px] block">Password Changes</label>
                            <div className="flex flex-col gap-[16px]">
                                <input type="password" placeholder="Current Passwod" className="bg-[#F5F5F5] rounded-[4px] px-[16px] py-[12px] font-[Poppins] text-[16px]" />
                                <input type="password" placeholder="New Passwod" className="bg-[#F5F5F5] rounded-[4px] px-[16px] py-[12px] font-[Poppins] text-[16px]" />
                                <input type="password" placeholder="Confirm New Passwod" className="bg-[#F5F5F5] rounded-[4px] px-[16px] py-[12px] font-[Poppins] text-[16px]" />
                            </div>
                        </div>
                        <div className="flex justify-end items-center gap-[24px] ">
                            <button type="button" className="font-[400] text-[16px] font-[Poppins] text-[#000] bg-transparent cursor-pointer">Cancel</button>
                            <button type="submit" className="bg-[#DB4444] text-white px-[32px] py-[12px] rounded-[4px] font-[Poppins] font-[500] text-[16px] cursor-pointer">Save Changes</button>
                        </div>
                    </form>
                </div>

            </div>



        </div>
    )
}
