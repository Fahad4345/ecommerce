"use client";

import { LogOut, User, ShoppingBag, XCircle, Star } from "lucide-react";
import Link from "next/link";
import { useAuth } from "../Api1/useAuth";
import { MyContext } from "../context/MyContext";
import { useContext } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function ProfileMenu({ closeMenu }) {
  const { user, setuser, setcartLength, setWishlistLength } = useContext(MyContext);
  const { Logout } = useAuth();
  const pathName = usePathname();
  const router = useRouter();


  const handleLogout = async () => {
    try {
      await Logout();
      localStorage.removeItem("accessToken");
      closeMenu();
      setuser(null);
      setcartLength(0);
      setWishlistLength(0);
      router.push("/");
    } catch (err) {
      alert("Logout failed: " + err.message);
    }
  };


  const isHome = pathName === "/home";
  const bgClass = isHome ? "bg-[#0000000A] backdrop-blur-[150px] text-white" : "bg-white text-black";
  const hoverColor = isHome ? "hover:text-purple-400" : "hover:text-purple-600";

  return (
    <div className={`absolute right-0 top-[35px] w-56 rounded-[4px] shadow-lg p-4 gap-[13px] flex flex-col z-50 ${bgClass}`}>
      <Link href="/account">
        <div className={`flex items-center gap-[16px] cursor-pointer ${hoverColor}`}>
          <User size={32} />
          <span className="font-[Poppins] font-[400] text-[14px] leading-[21px]">Manage My Account</span>
        </div>
      </Link>
      <Link href="/myOrder">
        <div className={`flex items-center gap-[16px] cursor-pointer ${hoverColor}`}>
          <ShoppingBag size={24} />
          <span className="font-[Poppins] font-[400] text-[14px] leading-[21px]">My Order</span>
        </div>
      </Link>
      <div className={`flex items-center gap-[16px] cursor-pointer ${hoverColor}`}>
        <XCircle size={24} />
        <span className="font-[Poppins] font-[400] text-[14px] leading-[21px]">My Cancellations</span>
      </div>

      <div className={`flex items-center gap-[16px] cursor-pointer ${hoverColor}`}>
        <Star size={24} />
        <span className="font-[Poppins] font-[400] text-[14px] leading-[21px]">My Reviews</span>
      </div>

      <div onClick={handleLogout} className={`flex items-center gap-[16px] cursor-pointer hover:text-red-400`}>
        <LogOut size={24} />
        <span className="font-[Poppins] font-[400] text-[14px] leading-[21px]">
          Logout
        </span>
      </div>
    </div>
  );
}
