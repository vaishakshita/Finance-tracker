"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/app/components/Sidebar'
import ProfileMenu from '@/app/components/ProfileMenu'


const page = () => {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [filter, setFilter] = useState("all")
  const safeTransactions = Array.isArray(transactions) ? transactions : [];
  const latestTransaction = safeTransactions[0];

  //fetch user info
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
      return
    }

    const fetchUser = async () => {
      const res = await fetch("http://localhost:5000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      const data = await res.json()
      if (res.ok) {
        setUser(data.user)
      } else {
        router.push("/login")
      }
    }
    fetchUser()
  }, [])

  //fetch transcation
  useEffect(() => {
    const fetchTansaction = async () => {
      try {
        const token = localStorage.getItem("token")
        const res = await fetch("http://localhost:5000/api/transactions", {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })

        const data = await res.json()
        console.log("RAW DATA:", data);
      console.log("TYPE:", typeof data);
      console.log("IS ARRAY:", Array.isArray(data));
      console.log("TRANSACTIONS FIELD:", data?.transactions);
        setTransactions(Array.isArray(data)
          ? data
          : Array.isArray(data?.transactions)
            ? data.transactions
            : [])
      } catch (error) {
        console.log(error)
      }
    }

    fetchTansaction()
  }, [])

  //calculations
  const income = safeTransactions.filter(t => t.type === "income").reduce((acc, t) => acc + t.amount, 0);
  const expense = safeTransactions.filter(t => t.type === "expense").reduce((acc, t) => acc + t.amount, 0);

  //filter ny income and expense
  const filteredTransactions = safeTransactions.filter((t) => {
    if (filter === "all") return true;
    return t.type === filter
  })

  console.log("STATE transactions:", transactions);
console.log("IS ARRAY STATE:", Array.isArray(transactions));

  return (
    <>
      <Sidebar className="hidden md:block"/>

      <div className='ml-0 md:ml-64 p-4 md:p-6 max-w-6xl mx-auto'>
        {/* topsection */}
        <div className='flex justify-between items-center max-w-5xl mx-auto'>
          <h1 className='text-2xl md:text-3xl font-bold font-sans text-purple-800'>TRANSACTIONS</h1>
          <ProfileMenu user={user} />
        </div>

        {/* income/expense cards */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6'>
          <div className='bg-white p-4 rounded-xl shadow-xl border-4 border-green-700'>
            <h3 className='text-lg font-semibold font-sans text-slate-800'>Total Income</h3>
            <p className='text-2xl md:text-3xl text-green-700 font-bold font-sans'>₹{income}</p>
            <p className="text-sm text-gray-500">
              Updated: {latestTransaction?.date
                ? new Date(latestTransaction.date).toLocaleString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })
                : "No data"}
            </p>
          </div>

          <div className='bg-white p-4 rounded-xl shadow-xl border-4 border-red-700'>
            <h3 className='text-lg font-semibold font-sans text-slate-800'>Total Expense</h3>
            <p className='text-2xl md:text-3xl text-red-700 font-bold font-sans'>₹{expense}</p>
            <p className="text-sm text-gray-500">
              Updated: {latestTransaction?.date
                ? new Date(latestTransaction.date).toLocaleString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })
                : "No data"}
            </p>
          </div>
        </div>

        {/* filter tabs */}
        <div className='flex flex-wrap gap-3 mt-6 max-w-5xl mx-auto'>
          <button onClick={() => setFilter("all")} className='px-8 py-1 rounded-xl text-slate-800 text-sm font-bold font-mono border-blue-800 border-2 hover:bg-white hover:text-blue-800'>ALL</button>
          <button onClick={() => setFilter("income")} className='px-8 py-1 rounded-xl text-slate-800 text-sm font-bold font-mono border-blue-800 border-2 hover:bg-white hover:text-blue-800'>INCOME</button>
          <button onClick={() => setFilter("expense")} className='px-8 py-1 rounded-xl text-slate-800 text-sm font-bold font-mono border-blue-800 border-2 hover:bg-white hover:text-blue-800'>EXPENSE</button>
        </div>

        {/* transactions */}
        <div className='bg-white p-4 rounded-3xl mt-4 shadow-xl mx-auto max-h-[500px] overflow-y-auto'>
          {transactions.length === 0 ? (
            <p className='text-lg font-bold'>No transactions found</p>
          ) : (
            filteredTransactions.map((t) => (
              <div
                key={t._id}
                className="flex justify-between items-center bg-indigo-100 border-2 border-indigo-400 shadow-2xl rounded-2xl p-4 mb-4">
                <div>
                  <p className='text-lg font-sans font-semibold text-indigo-800'>{t.title}</p>
                  <p className='text-slate-700 text-sm font-medium font-sans'>{t.category}</p>
                  <p className="text-sm text-gray-600">{t.date
                    ? new Date(t.date).toLocaleString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                    : "No date"}</p>

                </div>
                <p className={
                  t.type === "expense"
                    ? "text-red-500 font-semibold text-lg"
                    : "text-green-500 font-semibold text-lg"
                }>{t.type === "expense" ? "-" : "+"} ₹{t.amount}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}

export default page
