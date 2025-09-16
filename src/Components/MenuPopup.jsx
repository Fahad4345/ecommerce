"use client";

import { LogOut, User, ShoppingBag, XCircle, Star } from "lucide-react";
import Link from "next/link";

export default function ProfileMenu({ closeMenu }) {
  return (
    <div className="absolute right-0  top-[35px]  w-56 rounded-[4px] shadow-lg bg-[#0000000A] backdrop-blur-[150px] text-white p-4 gap-[13px] flex flex-col z-50">
      <Link href="/account"><div className="flex items-center gap-[16px] cursor-pointer hover:text-purple-400">
        <User size={32} />
        <span className="font-[Poppins] font-[400] text-[14px] leading-[21px]">Manage My Account</span>
      </div></Link>
      <div className="flex items-center gap-[16px] cursor-pointer hover:text-purple-400">
        <ShoppingBag size={24} />
        <span className="font-[Poppins] font-[400] text-[14px] leading-[21px]">My Order</span>
      </div>
      <div className="flex items-center gap-[16px] cursor-pointer hover:text-purple-400">
        <XCircle size={24} />
        <span className="font-[Poppins] font-[400] text-[14px] leading-[21px]">My Cancellations</span>
      </div>
      <div className="flex items-center gap-[16px] cursor-pointer hover:text-purple-400">
        <Star size={24} />
        <span className="font-[Poppins] font-[400] text-[14px] leading-[21px]">My Reviews</span>
      </div>
      <div
        className="flex items-center gap-[16px] cursor-pointer hover:text-red-400"
        onClick={closeMenu}
      >
        <LogOut size={24} />
        <span className="font-[Poppins] font-[400] text-[14px] leading-[21px]">Logout</span>
      </div>
    </div>
  );
}
