"use client"
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import Image from "next/image";
import logo from "@/app/assets/logo.png";

const Navbar = () => {
    const router = useRouter()
    const handleDashboard = ()=>{
        const token = localStorage.getItem("token")

        if(token){
            router.push("/dashboard")
        } else {
            router.push("/login")
        }
    }

    return (
        <>
            <div className='bg-purple-400 flex flex-col sm:flex-row items-center justify-around px-6 md:px-12 py-4 gap-4'>
                <div className='flex gap-1'>
                    <Image src={logo} alt="Montera Logo" width={180} height={60} priority className="object-contain rounded-2xl"/>
                </div>

                <div className='flex justify-center gap-4 font-sans'>
                    <button onClick={handleDashboard} className='bg-white rounded-3xl w-30 h-10 flex justify-center items-center text-purple-950 hover:bg-purple-300/30 transition cursor-pointer'>Dashboard</button>
                    <Link href="/login" className='bg-white rounded-3xl w-20 h-10 flex justify-center items-center text-purple-950 hover:bg-purple-300/50 transition cursor-pointer'>Login</Link>
                    <Link href="/signup" className='bg-white rounded-3xl w-20 h-10 flex justify-center items-center text-purple-950 hover:bg-purple-300/30 transition cursor-pointer'>Sign up</Link>
                </div>
            </div>
        </>


    )
}

export default Navbar
