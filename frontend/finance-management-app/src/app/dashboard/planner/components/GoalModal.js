"use client"
import React from 'react'
import { useState } from 'react'

const GoalModal = ({ setShowGoalModal, fetchGoals }) => {
    const [title, setTitle] = useState("")
    const [targetAmount, setTargetAmount] = useState("")
    const [savedAmount, setSavedAmount] = useState("")
    const [deadline, setDeadline] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = await localStorage.getItem("token")
            const res = await fetch("http://localhost:5000/api/goals", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },

                body: JSON.stringify({
                    title,
                    targetAmount: Number(targetAmount),
                    savedAmount: Number(savedAmount),
                    deadline,
                })
            })

            if (!res.ok) {
                throw new Error("Failed to create goal");
            }
            fetchGoals();
            setTitle("");
            setTargetAmount("");
            setSavedAmount("");
            setDeadline("");
            setShowGoalModal(false);
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='fixed inset-0 bg-black/40 flex justify-center items-center z-50'>
            <div className='bg-white rounded-2xl p-8 w-full max-w-md shadow-xl'>
                <h2 className='text-3xl font-bold text-purple-900 mb-2'>Add New Goal</h2>
                <p className='text-gray-500 font-semibold mb-6'>Create a savings goal and track your progress over time.</p>
                <form onSubmit={handleSubmit}>
                    <label className='font-medium'>Goal Name</label>
                    <input type="text" value={title} className="w-full mt-2 mb-5 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-600" onChange={(e) => setTitle(e.target.value)} required />

                    <label className='font-medium'>Target Amount</label>
                    <input type="number" value={targetAmount} className="w-full mt-2 mb-5 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-600" onChange={(e) => setTargetAmount(e.target.value)} required />

                    <label className='font-medium'>Initial Savings</label>
                    <input type="number" value={savedAmount} className="w-full mt-2 mb-5 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-600" onChange={(e) => setSavedAmount(e.target.value)} required />

                    <label className='font-medium'>Deadline</label>
                    <input type="date" value={deadline} className="w-full mt-2 mb-5 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-600" onChange={(e) => setDeadline(e.target.value)} required />

                    <div className='flex justify-end gap-3 mt-8'>
                        <button type='button' onClick={() => setShowGoalModal(false)} className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition">Cancel</button>
                        <button type='submit' className="px-5 py-2 rounded-lg bg-purple-700 text-white hover:bg-purple-800 transition">Create Goal</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default GoalModal
