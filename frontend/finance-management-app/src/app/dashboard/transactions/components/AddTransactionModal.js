"use client"
import React from 'react'
import ButtonLoader from '@/app/components/loading/ButtonLoader'

const addTransactionModal = ({
    showModal,
    setShowModal,
    formData,
    setFormData,
    handleAddTransaction,
    loading,
    isEditing,
}) => {
    const modalDesign = "w-full border-2 border-blue-300 rounded-lg p-1 mb-4"
    if (!showModal) return null;
    return (
        <>
            {addTransactionModal.length !== 0 && showModal && (
                <div className='fixed inset-0 bg-black/40 flex items-center justify-center p-10 z-50'>
                    <div className='flex flex-col bg-white rounded-2xl p-8 w-[420px] shadow-2xl'>
                        <h2 className='flex justify-center text-xl font-bold font-sans text-blue-800'>{isEditing ? "Edit Transaction" : "Add Transaction"}</h2>

                        <label className='font-sans'>Title</label>
                        <input type="text" className={modalDesign} value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                        <label className='font-sans'>Amount</label>
                        <input type="number" className={modalDesign} value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value), })} />
                        <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className={modalDesign}>
                            <option value="expense">Expense</option>
                            <option value="income">income</option>
                        </select>
                        <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className={modalDesign}>
                            <option value="">Select Category</option>
                            <option value="Food and drinks">Food and drinks</option>
                            <option value="Bills">Bills</option>
                            <option value="Travel">Travel</option>
                            <option value="Shopping">Shopping</option>
                            <option value="Grocery">Grocery</option>
                            <option value="Salary">Salary</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Others">Others</option>
                        </select>
                        <input type="date" value={formData.date}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    date: e.target.value,
                                })
                            } className={modalDesign} />

                        <div className='flex justify-end gap-3'>
                            <button onClick={() => setShowModal(false)} disabled={loading} className={`px-4 py-2 rounded-lg border-2 border-blue-700 text-blue-900 ${loading
                                ? "cursor-not-allowed opacity-50"
                                : "hover:bg-gray-100"
                                }`}>Cancel</button>

                            <button onClick={handleAddTransaction} disabled={loading} className={`px-5 py-2 rounded-lg text-white transition flex items-center justify-center min-w-[120px] ${loading
                                ? "bg-indigo-400 cursor-not-allowed"
                                : "bg-indigo-600 hover:bg-indigo-700"
                                }`}>{loading ? (
                                    <ButtonLoader
                                        text={isEditing ? "Updating..." : "Adding..."}
                                    />
                                ) : (
                                    isEditing ? "Update" : "Add"
                                )}</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default addTransactionModal
