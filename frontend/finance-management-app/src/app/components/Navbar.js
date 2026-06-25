"use client"
import React from 'react'
import Link from 'next/link'
import { GiTakeMyMoney } from "react-icons/gi";
import { useRouter } from 'next/navigation';

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
        <div>
            <div className='bg-purple-400 flex justify-around px-20 py-5 items-center'>
                <div className='flex gap-1'>
                    <GiTakeMyMoney size={50} className='text' />
                    <h1 className='font-semibold font-sans text-3xl py-2'>Montera</h1>
                </div>

                <div className='flex gap-8 font-sans'>
                    <button onClick={handleDashboard} className='bg-white rounded-3xl w-30 h-10 flex justify-center items-center text-purple-950 hover:bg-purple-300/30 transition cursor-pointer'>Dashboard</button>
                    <Link href="/login" className='bg-white rounded-3xl w-20 h-10 flex justify-center items-center text-purple-950 hover:bg-purple-300/50 transition cursor-pointer'>Login</Link>
                    <Link href="/signup" className='bg-white rounded-3xl w-20 h-10 flex justify-center items-center text-purple-950 hover:bg-purple-300/30 transition cursor-pointer'>Sign up</Link>
                </div>
            </div>
        </div>


    )
}

export default Navbar
