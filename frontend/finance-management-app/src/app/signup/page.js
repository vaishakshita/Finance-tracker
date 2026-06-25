"use client"
import React from 'react'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const page = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmpassword, setConfirmpassword] = useState("")
  const router = useRouter()

  const handleSignup = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/auth/signup", {
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
      alert("Passwords do not match");
      return;
    }
    if (res.ok) {
      alert("Signup successfully")
      router.push("/login")
    } else {
      alert(data.message);
    }
  }

  const lableDesign = "border-2 border-gray-400 hover:border-purple-400 focus:border-purple-600 outline-none focus:ring-1 focus:ring-purple-300 rounded-xl -mt-5";

  return (
    <>
      <Navbar />
      <form onSubmit={handleSignup} className='bg-purple-100 shadow-2xl mx-auto justify-center min-w-[40vw] min-h-[80vh] mt-10 rounded-4xl'>
        <h1 className='text-4xl text-center font-semibold font-sans mt-4'>Sign up</h1>
        <div className='text-2xl flex flex-col mx-auto gap-7 max-w-[30vw] mt-8'>
          <label>Full Name</label>
          <input onChange={(e) => setName(e.target.value)} type="text" className={lableDesign} />
          <label>Email</label>
          <input onChange={(e) => setEmail(e.target.value)} type="email" className={lableDesign} />
          <label>Enter Password</label>
          <input onChange={(e) => setPassword(e.target.value)} type="password" className={lableDesign} />
          <label>Confirm Password</label>
          <input onChange={(e) => setConfirmpassword(e.target.value)} type="password" className={lableDesign} />
        </div>
        <div className='flex justify-center items-center mt-10'>
          <button type='submit' className='text-xl h-14 w-28 rounded-4xl bg-purple-800 text-white hover:scale-105 transition'>Sign up</button>
        </div>
        <p className='flex gap-4 justify-center items-center mt-9 text-xl'>
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
