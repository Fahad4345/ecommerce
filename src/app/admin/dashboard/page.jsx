"use client";
import React from 'react';
import AdminNavBar from './../../../Components/AdminNavBar';
import Guardwrapper from './../../../Components/Guardwrapper';


export default function Dashboard() {



    return (
        <Guardwrapper><div className=' bg-white flex justify-center items-center flex-col'>
            <AdminNavBar />






        </div></Guardwrapper>
    )
}
