"use client"
import React from 'react'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import ButtonLoader from '@/app/components/loading/ButtonLoader'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { FiEye, FiEyeOff } from "react-icons/fi"

const page = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmpassword, setConfirmpassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try{
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    })

    const data = await res.json()
    if (password !== confirmpassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (!res.ok) {
      toast.error(data.message || "Signup failed");
    } 
    toast.success("Account Created Successfully");
    router.push("/login")
    } catch(error){
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
      <form onSubmit={handleSignup} className='bg-purple-100 shadow-2xl mx-auto justify-center max-w-[80vw] mt-15 mb-6 rounded-4xl sm:w-1/2'>
        <h1 className='text-4xl text-center font-semibold font-sans py-5'>Sign up</h1>
        <div className='text-2xl flex flex-col mx-auto gap-4 max-w-[60vw] sm:max-w-[30vw] py-4'>
          <label className="text-xl font-sans">Full Name</label>
          <input onChange={(e) => setName(e.target.value)} type="text" className={inputDesign} />

          <label className="text-xl font-sans">Email</label>
          <input onChange={(e) => setEmail(e.target.value)} type="email" className={inputDesign} />

          <label className="text-xl font-sans">Create Password</label>
          <div className='relative w-full'>
            <input onChange={(e) => setPassword(e.target.value)} type={showPassword ? "text" : "password"} className={`${inputDesign} w-full pr-12`} />
            <button type='button' onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 mt-1 md:mt-0 text-gray-500 hover:text-purple-700">{showPassword ? <FiEyeOff size={22} /> : <FiEye size={22} />}</button>
          </div>


          <label className="text-xl font-sans">Confirm Password</label>
          <div className='relative w-full'>
            <input onChange={(e) => setConfirmpassword(e.target.value)} type={showConfirmPassword ? "text" : "password"} className={`${inputDesign} w-full pr-12`} />
            <button type='button' onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 mt-1 md:mt-0 text-gray-500 hover:text-purple-700">{showConfirmPassword ? <FiEyeOff size={22} /> : <FiEye size={22} />}</button>
          </div>

        </div>
        <div className='flex justify-center items-center mt-7'>
          <button type='submit' disabled={loading} className={`text-xl h-14 w-40 rounded-4xl text-white transition flex items-center justify-center ${loading
              ? "bg-purple-500 cursor-not-allowed"
              : "bg-purple-800 hover:scale-105"
            }`}>{loading ? <ButtonLoader text="Signing up..." /> : "Signup"}</button>
        </div>
        <p className='flex flex-col md:flex-row gap-3 justify-center items-center text-xl py-10 lg:text-2xl'>
          Already have an account?{' '}
          <Link href="/login" className="text-purple-700 font-medium hover:underline">
            Login
          </Link>
        </p>
      </form>
    </>
  )
}

export default page
