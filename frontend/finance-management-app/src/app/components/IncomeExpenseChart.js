"use clint"
import React from 'react'
import { BarChart,Bar,XAxis,YAxis,Tooltip,Legend,ResponsiveContainer,CartesianGrid } from 'recharts'

const IncomeExpenseChart = ({transactions}) => {
    const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const monthlyData = {}
transactions.forEach((transaction)=>{
    const month = monthNames[new Date(transaction.date).getMonth()]
    if(!monthlyData[month]){
        monthlyData[month] = {
            month,
            income:0,
            expense:0,
        }
    }

    if(transaction.type === "income"){
        monthlyData[month].income += Number(transaction.amount);
    } else {
        monthlyData[month].expense += Number(transaction.amount);
    }
})

const chartData = Object.values(monthlyData)
console.log(chartData)
const formatCurrency = (amount) => `₹${amount.toLocaleString("en-IN")}`;

  return (
    <div className='bg-white rounded-3xl shadow-lg p-6'>
        <h2 className='text-2xl font-bold mb-6'>Income vs Expense</h2>
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="month"/>
                <YAxis/>
                <Tooltip formatter={formatCurrency}/>
                <Legend/>
                <Bar dataKey="expense" fill="#ef4444" radius={[6,6,0,0]}/>
                <Bar dataKey="income" fill="#4f46e5" radius={[6,6,0,0]}/>
            </BarChart>
        </ResponsiveContainer>
    </div>
  )
}

export default IncomeExpenseChart
