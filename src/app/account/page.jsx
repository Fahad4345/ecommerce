"use client"
import React, { useEffect, useState } from 'react'
import Navbar from "../../Components/NavBar";
import { useAuth } from '../../Api/useAuth';
import Link from 'next/link';

export default function AccountPage() {
    const [form, setForm] = useState({
        Firstname: "",
        Lastname: "",
        email: "",
        Addresse: "",
    });
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { getDashboard, updateProfile } = useAuth();
    const [Account, setAccount] = useState(null);
    useEffect(() => {
        const fetchAccount = async () => {
            const data = await getDashboard();
            console.log(data);
            if (data) {
                setForm({
                    Firstname: data.user.Firstname,
                    Lastname: data.user.Lastname,
                    email: data.user.email,
                    Addresse: data.user.Addresse,
                });
                setAccount(data.user);

            }

        };
        fetchAccount();




    }, []);
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) { alert("New Password and Confirm Password Not Match"); return; }

        await updateProfile(form.Firstname, form.Lastname, form.Addresse, newPassword || undefined, currentPassword);

        alert("Profile updated!");
        setNewPassword("");
        setConfirmPassword("");

    }




    return (
        <div className=' flex justify-center items-center flex-col'>
            <Navbar ShowCart={true} ShowProfile={true} ShowWishlist={true} />

            {Account ? (<div className='  max-w-[1170px] w-full flex justify-center items-center flex-row mx-[135px] mt-[80px]'>

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
                    <form onSubmit={handleUpdate} className="flex flex-col gap-[24px]">
                        <div className="flex gap-[32px]">
                            <div className="flex flex-col flex-1">
                                <label className="font-[400] text-[16px] font-[Poppins] mb-[8px]">First Name</label>
                                <input type="text" name="Firstname" value={form.Firstname} onChange={handleChange} className="bg-[#F5F5F5] rounded-[4px] px-[16px] py-[12px] font-[Poppins] text-[16px] focus:outline-none focus:ring-0 focus:border-transparent" />
                            </div>
                            <div className="flex flex-col flex-1">
                                <label className="font-[400] text-[16px] font-[Poppins] mb-[8px]">Last Name</label>
                                <input type="text" name="Lastname" value={form.Lastname} onChange={handleChange} className="bg-[#F5F5F5] rounded-[4px] px-[16px] py-[12px] font-[Poppins] text-[16px] focus:outline-none focus:ring-0 focus:border-transparent" />
                            </div>
                        </div>
                        <div className="flex gap-[32px]">
                            <div className="flex flex-col flex-1">
                                <label className="font-[400] text-[16px] font-[Poppins] mb-[8px]">Email</label>
                                <input type="email" readOnly value={Account.email} className="bg-[#F5F5F5] rounded-[4px] px-[16px] py-[12px] font-[Poppins] text-[16px] opacity-[50%] focus:outline-none focus:ring-0 focus:border-transparent " />
                            </div>
                            <div className="flex flex-col flex-1">
                                <label className="font-[400] text-[16px] font-[Poppins] mb-[8px]">Address</label>
                                <input type="text" name="Addresse" value={Account.Addresse} onChange={handleChange} className="bg-[#F5F5F5] rounded-[4px] px-[16px] py-[12px] font-[Poppins] text-[16px] focus:outline-none focus:ring-0 focus:border-transparent" />
                            </div>
                        </div>
                        <div>
                            <label className="font-[400] text-[16px] font-[Poppins] mb-[8px] block">Password Changes</label>
                            <div className="flex flex-col gap-[16px]">
                                <input name="CurrentPassword" onChange={(e) => setCurrentPassword(e.target.value)} type="password" placeholder="Current Passwod" className="bg-[#F5F5F5] rounded-[4px] px-[16px] py-[12px] font-[Poppins] text-[16px] focus:outline-none focus:ring-0 focus:border-transparent" />
                                <input name="NewPassword" onChange={(e) => setNewPassword(e.target.value)} type="password" placeholder="New Passwod" className="bg-[#F5F5F5] rounded-[4px] px-[16px] py-[12px] font-[Poppins] text-[16px] focus:outline-none focus:ring-0 focus:border-transparent" />
                                <input name="ConfirmPassword" onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="Confirm New Passwod" className="bg-[#F5F5F5] rounded-[4px] px-[16px] py-[12px] font-[Poppins] text-[16px] focus:outline-none focus:ring-0 focus:border-transparent" />
                            </div>
                        </div>
                        <div className="flex justify-end items-center gap-[24px] ">
                            <button type="button" className="font-[400] text-[16px] font-[Poppins] text-[#000] bg-transparent cursor-pointer">Cancel</button>
                            <button type="submit" className="bg-[#DB4444] text-white px-[32px] py-[12px] rounded-[4px] font-[Poppins] font-[500] text-[16px] cursor-pointer">Save Changes</button>
                        </div>
                    </form>
                </div>

            </div>) : (<div className=' flex flex-col justify-center items-center mt-[140px]'>
                <h1 className='font-[Inter] font-[500] text-[110px] leading-[115px] tracking-[3%] text-[#000000]'>Access Denied</h1>
                <h1 className='font-[Inter] font-[400] text-[16px] leading-[24px] tracking-[0%] text-[#000000] mt-[40px]'>Please Login to see this page.</h1>
                <Link href="/login"> <button className=' rounded-[4px]font-[Poppins] font-[500] text-[16px] leading-[24px] tracking-[0%] text-white bg-[#DB4444] px-[48px] py-[16px] mt-[80px] '>Go to Login Page</button></Link>
            </div>)}




        </div>
    )
}
