"use client"
import React from 'react'
import Link from 'next/link'
import ButtonLoader from '@/app/components/loading/ButtonLoader'
import Navbar from '../components/Navbar'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FiEye, FiEyeOff } from "react-icons/fi"
import toast from 'react-hot-toast'

const page = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password,
        })
      })

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Login failed")
      }
      localStorage.setItem("token", data.token);
      toast.success("Login Successful");
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.")
    } finally {
      setLoading(false);
    }
  }

  const inputDesign = "border-2 border-gray-400 hover:border-purple-400 focus:border-purple-600 outline-none focus:ring-1 focus:ring-purple-300 rounded-xl text-sm sm:text-xl";

  return (
    <>
      <Navbar />
      <form onSubmit={handleLogin} className='bg-purple-100 shadow-2xl mx-auto max-w-[80vw] my-15 md:my-30 rounded-4xl sm:max-w-[40vw]'>
        <h1 className='text-4xl text-center font-semibold font-sans py-5'>Login</h1>
        <div className='text-2xl flex flex-col mx-auto gap-4 max-w-[60vw] sm:max-w-[30vw] py-4'>
          <label className='text-xl font-sans'>Email</label>
          <input type="email" placeholder='Enter email' onChange={(e) => setEmail(e.target.value)} className={inputDesign} />
          <label className='text-xl font-sans'>Password</label>
          <div className='relative w-full'>
            <input placeholder='Enter password' onChange={(e) => setPassword(e.target.value)} type={showPassword ? "text" : "password"} className={`${inputDesign} w-full pr-12`} />
            <button type='button' onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-700">{showPassword ? <FiEyeOff size={22} /> : <FiEye size={22} />}</button>
          </div>
        </div>
        <div className='flex justify-center items-center mt-7'>
          <button type='submit' disabled={loading} className={`text-xl h-14 w-40 rounded-4xl text-white transition flex items-center justify-center ${loading
              ? "bg-purple-500 cursor-not-allowed"
              : "bg-purple-800 hover:scale-105"
            }`}>{loading ? <ButtonLoader text="Logging in..." /> : "Login"}</button>
        </div>
        <p className='flex flex-col md:flex-row gap-3 justify-center items-center text-xl py-10 lg:text-2xl'>
          Don't have an account?{' '}
          <Link href="/signup" className="text-purple-700 font-medium hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </>
  )
}

export default page
