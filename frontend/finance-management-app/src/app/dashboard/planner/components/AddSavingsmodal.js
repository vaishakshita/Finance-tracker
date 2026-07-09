"use client"
import React, { useState } from 'react'

const AddSavingsmodal = ({ setShowSavingModal, selectedGoalForSavings, fetchGoals }) => {
    const [amount, setAmount] = useState("")
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (Number(amount) <= 0) {
                return;
            }
            const token = localStorage.getItem("token")
            const res = await fetch(`http://localhost:5000/api/goals/${selectedGoalForSavings._id}/add-savings`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    amount: Number(amount)
                })
            })

            if (!res.ok) {
                throw new Error("Failed to add savings")
            }
            fetchGoals()
            setAmount("")
            setShowSavingModal(false)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl">
                <form onSubmit={handleSubmit}>
                    <h2 className="text-3xl font-bold text-purple-900">Add savings</h2>
                    <p className="text-gray-500 mt-2 mb-6">Deposit money into this goal</p>
                    <label className='font-medium'>Amount</label>
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full mt-2 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-300" />
                    <div className="flex justify-end gap-3 mt-8">
                        <button type='button' onClick={() => {setAmount(""); setShowSavingModal(false)}} className="px-5 py-2 border rounded-lg">Cancel</button>
                        <button type='submit' className="px-5 py-2 bg-purple-700 text-white rounded-lg">Add Savings</button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default AddSavingsmodal
