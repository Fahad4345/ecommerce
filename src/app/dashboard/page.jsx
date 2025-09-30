"use client";
import React, { } from 'react'
import Navbar from "../../Components/NavBar";
import { useAuth } from '../../Api1/useAuth';
import Link from 'next/link';
import { MyContext } from '../../context/MyContext';
import { usePathname, useRouter } from 'next/navigation'
import AdminNavBar from './../../Components/AdminNavBar';

export default function Dashboard() {


    return (
        <div className=' bg-white flex justify-center items-center flex-col'>
            <AdminNavBar />




        </div>
    )
}
