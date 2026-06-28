"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FaFilter } from "react-icons/fa";
import Sidebar from '@/app/components/Sidebar'
import ProfileMenu from '@/app/components/ProfileMenu'
import AddTransactionModal from '@/app/components/AddTransactionModal'
import FilterModal from '@/app/components/FilterModal'


const page = () => {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [transactions, setTransactions] = useState([])
  const safeTransactions = Array.isArray(transactions) ? transactions : [];
  const latestTransaction = safeTransactions[0];

  // Modal state
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "",
    date: ""
  })

  //filter state
  const [showFilter, setShowFilter] = useState(false)
  const [cardFilters, setCardFilters] = useState({
    type: "all",
    category: "",
    dateType: "",
    date: "",
    month: "",
    year: "",
    sort: "",
  })
  const [displayTransaction, setDisplayTransaction] = useState([])

  

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
  const fetchTansaction = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch("http://localhost:5000/api/transactions", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })

      const data = await res.json()
      // console.log("RAW DATA:", data);
      // console.log("TYPE:", typeof data);
      // console.log("IS ARRAY:", Array.isArray(data));
      // console.log("TRANSACTIONS FIELD:", data?.transactions);
      const fetchedTransactions = Array.isArray(data)
        ? data
        : Array.isArray(data?.transactions)
          ? data.transactions
          : [];
      
      setTransactions(fetchedTransactions)
      setDisplayTransaction(fetchedTransactions)
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    fetchTansaction()
  }, [])

  // Add transaction
  const handleAddTransaction = async (e) => {
    try {
      const token = localStorage.getItem("token")
      console.log(formData)
      const res = await fetch("http://localhost:5000/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json();

      if (res.ok) {
        alert("Transaction added successfully")
        setShowModal(false)
        setFormData({
          title: "",
          amount: "",
          type: "expense",
          category: "",
          date: "",
        });

        fetchTansaction();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error)
    }
  }

  //apply filter to transcation
  const applyFilters = ()=>{
    let filtered = [...transactions]
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

    if (cardFilters.type !== "all") {
    filtered = filtered.filter(
        t => t.type === cardFilters.type
    );
}

    if(cardFilters.category){
      filtered = filtered.filter(
        t => t.category === cardFilters.category
      )
    }

    if(cardFilters.dateType === "date" && cardFilters.date){
      filtered = filtered.filter((t) => {
    const transactionDate = new Date(t.date).toISOString().split("T")[0];
    return transactionDate === cardFilters.date;
});
    }

    if(cardFilters.dateType === "month" && cardFilters.month){
      filtered = filtered.filter((t) => {
        console.log("Selected Month:", cardFilters.month);
        console.log(
        "Transaction:",
        t.date,
        "Converted:",
        new Date(t.date).toISOString().slice(0, 7)
    );
    const transactionMonth = new Date(t.date)
      .toISOString()
      .slice(0, 7);

    return transactionMonth === cardFilters.month;
});
    }

    if(cardFilters.dateType === "year" && cardFilters.year){
      filtered = filtered.filter((t) => {
    const transactionYear = new Date(t.date)
      .getFullYear()
      .toString();

    return transactionYear === cardFilters.year;
});
    }

    if(cardFilters.sort === "oldest"){
      filtered.sort(
        (a,b)=>new Date(a.date)-new Date(b.date)
      )
    }

    setDisplayTransaction(filtered);
    
  }

  //calculations
  const income = safeTransactions.filter(t => t.type === "income").reduce((acc, t) => acc + t.amount, 0);
  const expense = safeTransactions.filter(t => t.type === "expense").reduce((acc, t) => acc + t.amount, 0);

  // console.log("STATE transactions:", transactions);
  // console.log("IS ARRAY STATE:", Array.isArray(transactions));

  return (
    <>
      <Sidebar className="hidden md:block" />

      <div className='ml-0 md:ml-64 p-4 md:p-6 max-w-6xl mx-auto'>
        {/* topsection */}
        <div className='flex justify-between items-center max-w-5xl mx-auto'>
          <h1 className='text-2xl md:text-3xl font-bold font-sans text-purple-800'>TRANSACTIONS</h1>

          <div className='flex gap-4'>
            <button onClick={() => setShowModal(true)} className='bg-white text-purple-800 border-2 border-purple-700 text-sm p-1 rounded-xl font-sans font-semibold'>+ Add Transaction</button>
            <button className='rounded-lg px-4 py-2 bg-purple-800 text-white transition' onClick={()=>setShowFilter(true)}><FaFilter size={15}/></button>
            <ProfileMenu user={user} />
          </div>
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

        {/* transactions */}
        <div className='bg-white p-4 rounded-3xl mt-4 shadow-xl mx-auto max-h-[540px] overflow-y-auto'>
          {transactions.length === 0 ? (
            <p className='text-lg font-bold'>No transactions found</p>
          ) : (
            displayTransaction.map((t) => (
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
                      year: "2-digit",
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

      {/* Modal form */}
      <AddTransactionModal showModal={showModal} setShowModal={setShowModal} formData={formData} setFormData={setFormData} handleAddTransaction={handleAddTransaction} />
      <FilterModal showFilter={showFilter} setShowFilter={setShowFilter} cardFilters={cardFilters} setCardFilters={setCardFilters} applyFilters={applyFilters}/>
    </>
  )
}

export default page
