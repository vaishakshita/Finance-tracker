"use client"
import React, { useState, useEffect } from 'react'
import ExpensePieChart from "@/app/dashboard/analytics/components/ExpensePieChart";
import IncomeExpenseChart from '@/app/dashboard/analytics/components/IncomeExpenseChart';
import ExpenseLineChart from '@/app/dashboard/analytics/components/ExpenseLineChart';
import FinancialInsights from '@/app/dashboard/analytics/components/FinancialInsights';

const page = () => {
  const [transactions, setTransactions] = useState([])
  const latestTransaction = transactions[0];

  const fetchTransaction = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/transactions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      setTransactions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchTransaction();
  }, [])

  //   useEffect(() => {
  //     console.log(transactions);
  // }, [transactions]);
  const formatCurrency = (amount) => `₹${amount.toLocaleString("en-IN")}`;

  const income = transactions.filter(t => t.type === "income").reduce((acc, t) => acc + t.amount, 0);
  const expense = transactions.filter(t => t.type === "expense").reduce((acc, t) => acc + t.amount, 0);

  return (
    <div className='p-6 pb-24'>
        <h1 className='text-2xl md:text-3xl font-bold font-sans text-purple-800'>Compare your monthly spending</h1>
        {/* income/expense cards */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6'>
          <div className='bg-white p-4 rounded-xl shadow-xl border-4 border-green-700 opacity-80 xl:w-1/2'>
            <h3 className='text-lg font-semibold font-sans text-slate-800'>Total Income</h3>
            <p className='text-2xl md:text-3xl text-green-700 font-bold font-sans'>{formatCurrency(income)}</p>
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

          <div className='bg-white p-4 rounded-xl shadow-xl border-4 border-red-700 opacity-80 xl:w-1/2'>
            <h3 className='text-lg font-semibold font-sans text-slate-800'>Total Expense</h3>
            <p className='text-2xl md:text-3xl text-red-700 font-bold font-sans'>{formatCurrency(expense)}</p>
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
        <div className='flex flex-col gap-4 mt-6'>
          <div className='mt-6'>
            <IncomeExpenseChart transactions={transactions} />
          </div>
          <div className='grid grid-cols-1 xl:grid-cols-11 gap-8 mt-6'>
            <div className="xl:col-span-5">
              <ExpenseLineChart transactions={transactions} />
            </div>

            <div className="xl:col-span-6">
              <ExpensePieChart transactions={transactions} />
            </div>
          </div>
          <div className='mt-6'>
            <FinancialInsights transactions={transactions} />
          </div>
          
        </div>
      </div>

  )
}

export default page
