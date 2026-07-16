"use client"
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import React, { useState } from 'react'

const COLORS = [
    "#7C3AED", // Purple
    "#3B82F6", // Blue
    "#10B981", // Emerald
    "#F59E0B", // Amber
    "#EF4444", // Red
    "#EC4899", // Pink
];

const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const ExpensePieChart = ({ transactions }) => {
    const [selectedMonth, setSelectedMonth] = useState("All")
    const categoryData = {}
    const filteredTransactions = selectedMonth === "All" ? transactions : transactions.filter((transaction) => {
        const month = monthNames[new Date(transaction.date).getMonth()]
        return month === selectedMonth;
    })

    filteredTransactions.forEach((transaction) => {
        if (transaction.type !== "expense") return;
        if (!categoryData[transaction.category]) {
            categoryData[transaction.category] = 0;
        }
        categoryData[transaction.category] += transaction.amount;
    })
    const chartData = Object.entries(categoryData).map(
        ([name, value]) => ({
            name, value,
        })
    )
    const totalExpense = chartData.reduce(
        (sum, item) => sum + item.value, 0
    )
    console.log(chartData);
    const formatCurrency = (amount) => amount.toLocaleString("en-IN");
    if (chartData.length === 0) {
        return (
            <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
                <p className="text-gray-500">No expense data available</p>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-3xl shadow-xl p-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
                <h2 className="text-xl font-bold">Expense by Category</h2>
            <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="w-full sm:w-40 border-2 border-indigo-800 bg-blue-100 p-3 rounded-lg">
                <option value="All">All Time</option>
                {monthNames.map((month) => (
                    <option key={month} value={month}>{month}</option>
                ))}
            </select>
            </div>

                {chartData.length === 0 ? (<div className="flex items-center justify-center h-[300px] text-gray-500">No expense data for {selectedMonth}</div>) : (
                <div className="flex flex-col xl:mt-5 xl:flex-row items-center justify-between gap-8">
                    <div className="w-full lg:w-[55%] h-[320px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={chartData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={105}
                                    innerRadius={70}
                                    paddingAngle={3}
                                    stroke="white"
                                    strokeWidth={3}
                                    isAnimationActive={true}
                                    animationBegin={200}
                                    animationDuration={1000}
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell
                                            key={entry.name}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <text
                                    x="50%"
                                    y="47%"
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    fontSize="14"
                                    fontWeight="bold"
                                >
                                    {selectedMonth === "All" ? "Total Expense" : `${selectedMonth} Expense`}
                                </text>

                                <text
                                    x="50%"
                                    y="54%"
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    fontSize="18"
                                    fontWeight="bold"
                                >
                                    ₹{formatCurrency(totalExpense)}
                                </text>
                                <Tooltip contentStyle={{
                                    borderRadius: "12px",
                                    border: "1px solid #ddd",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                                }} formatter={(value) => {
                                    const percentage = ((value / totalExpense) * 100).toFixed(1);
                                    return `₹${value.toLocaleString("en-IN")} (${percentage}%)`;
                                }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="bg-white w-full lg:w-[45%] space-y-2">
                            {chartData.map((item, index) => (
                                <div key={item.name} className="flex items-center gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                                        <span className="text-gray-700">{item.name}</span>
                                    </div>
                                    <div className="ml-auto text-right">
                                        <p className="font-semibold">
                                            ₹{item.value.toLocaleString("en-IN")}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {((item.value / totalExpense) * 100).toFixed(1)}%
                                        </p>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            )}
            
            
        </div>
    )
}

export default ExpensePieChart
