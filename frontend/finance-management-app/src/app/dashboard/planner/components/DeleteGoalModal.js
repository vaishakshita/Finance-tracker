"use client"
import React from 'react'

const DeleteGoalModal = ({setShowDeleteModal, handleDelete, goalId, goalTitle, setSelectedGoal}) => {
  return (
    <div className='fixed inset-0 bg-black/40 flex justify-center items-center z-50'>
      <div className='bg-white rounded-2xl w-full max-w-md p-8 shadow-xl'>
        <h2 className='text-2xl font-bold text-red-600'>Delete Goal</h2>
        <p className="mt-4 text-gray-600">Are you sure you want to delete</p>
        <p className="font-semibold text-lg mt-1 text-purple-900">"{goalTitle}"</p>
        <p className="text-gray-500 mt-4">This action cannot be undone.</p>

        <div className="flex justify-end gap-3 mt-8">
            <button onClick={()=>{setShowDeleteModal(false); setSelectedGoal(null);}} className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition">Cancel</button>
            <button onClick={()=>handleDelete(goalId)} className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition">Delete</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteGoalModal
